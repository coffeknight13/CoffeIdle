  const http = require('http');
  const fs = require('fs').promises;
  const path = require('path');
  const mysql = require('mysql2/promise');
  const bcrypt = require('bcrypt');

  const hostname = '127.0.0.1';
  const port = 3000;
  const saltRounds = 10;

  // Налаштування підключення до бази даних MySQL
  const dbConfigRoot = {
      host: 'localhost',
      user: 'root',
      password: 'pass',
  };

  const dbConfigApp = {
      host: 'localhost',
      user: 'root',
      password: 'pass',
      database: 'CoffeIdleDB'
  };

  const databaseName = 'CoffeIdleDB';

  // SQL-запит для створення таблиці 'players'
  const createPlayersTableSQL = `
  CREATE TABLE IF NOT EXISTS players (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nickname VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      coins BIGINT DEFAULT 10,
      prestige_points BIGINT DEFAULT 0,
      prestige_level INT DEFAULT 0,
      upgrades_purchased JSON,
      coffee_upgrades_count JSON,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  );
  `;

  // Функція для ініціалізації бази даних
  async function initializeDatabase() {
      let rootConnection;
      let appConnection;
      try {
          rootConnection = await mysql.createConnection(dbConfigRoot);

          await rootConnection.execute(`CREATE DATABASE IF NOT EXISTS ${databaseName} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
          await rootConnection.end();

          appConnection = await mysql.createConnection(dbConfigApp);

          await appConnection.execute(createPlayersTableSQL);

      } catch (err) {
          process.exit(1);
      } finally {
          if (rootConnection && rootConnection.connection) {
              await rootConnection.end();
          }
          if (appConnection && appConnection.connection) {
              await appConnection.end();
          }
      }
  }

  // Запуск ініціалізації бази даних перед тим, як сервер почне слухати запити
  initializeDatabase().then(() => {
      const server = http.createServer(async (req, res) => {

          // Глобальний обробник помилок на об'єкті відповіді
          res.on('error', (err) => {
              console.error('Помилка під час відправки відповіді клієнту (res.on(\'error\')):', err);
          });

          // Обробка POST та DELETE запитів (які можуть мати тіло)
          if (req.method === 'POST' || req.method === 'DELETE') {
              if (req.headers['content-type'] !== 'application/json') {
                  if (!res.headersSent) {
                      res.writeHead(415, { 'Content-Type': 'application/json' });
                      res.end(JSON.stringify({ success: false, message: 'Непідтримуваний тип вмісту. Очікується application/json.' }));
                  } else {
                      process.stderr.write('Заголовки вже були відправлені для 415 помилки. URL:' + req.url + '\n');
                  }
                  return;
              }

              const chunks = [];
              req.on('data', chunk => {
                  chunks.push(chunk);
              });

              req.on('end', async () => {
                  let parsedData;
                  let bodyContent = '';
                  let connection;

                  try {
                      bodyContent = Buffer.concat(chunks).toString('utf8').trim().replace(/[\u0000-\u001F\u007F-\u009F]/g, '');

                      if (typeof bodyContent !== 'string' || bodyContent.length === 0) {
                          throw new Error('Тіло запиту пусте або має некоректний тип для JSON-парсингу.');
                      }
                      parsedData = JSON.parse(bodyContent);

                  } catch (parseErr) {
                      process.stderr.write('Невірний bodyContent (початок):' + bodyContent.substring(0, 50) + '...\n');

                      if (!res.headersSent) {
                          res.writeHead(400, { 'Content-Type': 'application/json' });
                          res.end(JSON.stringify({ success: false, message: 'Невірний формат JSON у тілі запиту: ' + parseErr.message }));
                      } else {
                          process.stderr.write('Заголовки вже були відправлені для 400 помилки парсингу. URL:' + req.url + '\n');
                      }
                      return;
                  }

                  const { nickname, password, playerMoney, playerPrestige, playerTotalPrestige, coffeeTypes, allUpgradesData, nicknameToDelete, requestingUserNickname } = parsedData;

                  try {
                      connection = await mysql.createConnection(dbConfigApp);

                      // Реєстрація
                      if (req.url === '/register') {
                          if (!nickname || !password) {
                              if (!res.headersSent) {
                                  res.writeHead(400, { 'Content-Type': 'application/json' });
                                  res.end(JSON.stringify({ success: false, message: 'Нікнейм та пароль обов\'язкові для реєстрації.' }));
                              }
                              return;
                          }

                          const [users] = await connection.execute('SELECT COUNT(*) AS count FROM players WHERE nickname = ?', [nickname]);
                          if (users[0].count > 0) {
                              if (!res.headersSent) {
                                  res.writeHead(409, { 'Content-Type': 'application/json' });
                                  res.end(JSON.stringify({ success: false, message: 'Користувач з таким нікнеймом вже існує.' }));
                              }
                              return;
                          }

                          const hashedPassword = await bcrypt.hash(password, saltRounds);
                          const initialCoins = 10;
                          const initialPrestigePoints = 0;
                          const initialPrestigeLevel = 0;
                          const initialUpgradesPurchased = JSON.stringify({});
                          const initialCoffeeUpgradesCount = JSON.stringify({});

                          await connection.execute(
                              'INSERT INTO players (nickname, password, coins, prestige_points, prestige_level, upgrades_purchased, coffee_upgrades_count) VALUES (?, ?, ?, ?, ?, ?, ?)',
                              [nickname, hashedPassword, initialCoins, initialPrestigePoints, initialPrestigeLevel, initialUpgradesPurchased, initialCoffeeUpgradesCount]
                          );

                          if (!res.headersSent) {
                              res.writeHead(201, { 'Content-Type': 'application/json' });
                              res.end(JSON.stringify({ success: true, message: 'Реєстрація пройшла успішно!' }));
                          }
                          return;

                      // Вхід
                      } else if (req.url === '/login') {
                          if (!nickname || !password) {
                              if (!res.headersSent) {
                                  res.writeHead(400, { 'Content-Type': 'application/json' });
                                  res.end(JSON.stringify({ success: false, message: 'Нікнейм та пароль обов\'язкові для входу.' }));
                              }
                              return;
                          }

                          const [users] = await connection.execute('SELECT * FROM players WHERE nickname = ?', [nickname]);
                          if (users.length === 0) {
                              if (!res.headersSent) {
                                  res.writeHead(401, { 'Content-Type': 'application/json' });
                                  res.end(JSON.stringify({ success: false, message: 'Невірний нікнейм або пароль.' }));
                              }
                              return;
                          }

                          const user = users[0];
                          const passwordMatch = await bcrypt.compare(password, user.password);

                          if (passwordMatch) {
                              const upgradesPurchasedData = typeof user.upgrades_purchased === 'string' ? JSON.parse(user.upgrades_purchased || '{}') : (user.upgrades_purchased || {});
                              const coffeeUpgradesCountData = typeof user.coffee_upgrades_count === 'string' ? JSON.parse(user.coffee_upgrades_count || '{}') : (user.coffee_upgrades_count || {});

                              if (!res.headersSent) {
                                  res.writeHead(200, { 'Content-Type': 'application/json' });
                                  res.end(JSON.stringify({
                                      success: true,
                                      message: 'Вхід виконано успішно!',
                                      playerData: {
                                          id: user.id,
                                          nickname: user.nickname,
                                          coins: user.coins,
                                          prestigePoints: user.prestige_points,
                                          prestigeLevel: user.prestige_level,
                                          upgradesPurchased: upgradesPurchasedData,
                                          coffeeUpgradesCount: coffeeUpgradesCountData
                                      }
                                  }));
                              }
                              return;
                          } else {
                              if (!res.headersSent) {
                                  res.writeHead(401, { 'Content-Type': 'application/json' });
                                  res.end(JSON.stringify({ success: false, message: 'Невірний нікнейм або пароль.' }));
                              }
                              return;
                          }

                      // Збереження гри
                      } else if (req.url === '/api/save-game') {
                          if (!nickname) {
                              if (!res.headersSent) {
                                  res.writeHead(400, { 'Content-Type': 'application/json' });
                                  res.end(JSON.stringify({ success: false, message: 'Нікнейм користувача обов\'язковий для збереження.' }));
                              }
                              return;
                          }

                          const upgradesPurchasedJson = JSON.stringify(allUpgradesData || {});
                          const coffeeUpgradesCountJson = JSON.stringify(coffeeTypes || {});

                          try {
                              const [result] = await connection.execute(
                                  `UPDATE players
                                   SET coins = ?,
                                       prestige_points = ?,
                                       prestige_level = ?,
                                       upgrades_purchased = ?,
                                       coffee_upgrades_count = ?
                                   WHERE nickname = ?`,
                                  [playerMoney, playerPrestige, playerTotalPrestige, upgradesPurchasedJson, coffeeUpgradesCountJson, nickname]
                              );

                              if (result.affectedRows > 0) {
                                  if (!res.headersSent) {
                                      res.writeHead(200, { 'Content-Type': 'application/json' });
                                      res.end(JSON.stringify({ success: true, message: 'Дані гри успішно збережено!' }));
                                  }
                              } else {
                                  if (!res.headersSent) {
                                      res.writeHead(404, { 'Content-Type': 'application/json' });
                                      res.end(JSON.stringify({ success: false, message: 'Користувача не знайдено або дані не змінено.' }));
                                  }
                              }
                          } catch (updateErr) {
                              if (!res.headersSent) {
                                  res.writeHead(500, { 'Content-Type': 'application/json' });
                                  res.end(JSON.stringify({ success: false, message: 'Помилка сервера при збереженні даних.' }));
                              }
                          }
                          return;

                      // Видалення користувача
                      } else if (req.url === '/api/delete-user' && req.method === 'DELETE') {
                          if (!requestingUserNickname || requestingUserNickname !== 'coffeknight') {
                              if (!res.headersSent) {
                                  res.writeHead(403, { 'Content-Type': 'application/json' });
                                  res.end(JSON.stringify({ success: false, message: 'Доступ заборонено. Тільки адміністратор може видаляти користувачів.' }));
                              }
                              return;
                          }

                          if (!nicknameToDelete) {
                              if (!res.headersSent) {
                                  res.writeHead(400, { 'Content-Type': 'application/json' });
                                  res.end(JSON.stringify({ success: false, message: 'Нікнейм користувача для видалення не вказано.' }));
                              }
                              return;
                          }

                          if (nicknameToDelete === 'coffeknight') {
                              if (!res.headersSent) {
                                  res.writeHead(400, { 'Content-Type': 'application/json' });
                                  res.end(JSON.stringify({ success: false, message: 'Неможливо видалити адміністратора через цей інтерфейс.' }));
                              }
                              return;
                          }

                          try {
                              const query = 'DELETE FROM players WHERE nickname = ?';
                              const [result] = await connection.execute(query, [nicknameToDelete]);

                              if (result.affectedRows > 0) {
                                  if (!res.headersSent) {
                                      res.writeHead(200, { 'Content-Type': 'application/json' });
                                      res.end(JSON.stringify({ success: true, message: `Користувача ${nicknameToDelete} успішно видалено.` }));
                                  }
                              } else {
                                  if (!res.headersSent) {
                                      res.writeHead(404, { 'Content-Type': 'application/json' });
                                      res.end(JSON.stringify({ success: false, message: `Користувача ${nicknameToDelete} не знайдено.` }));
                                  }
                              }
                          } catch (deleteErr) {
                              if (!res.headersSent) {
                                  res.writeHead(500, { 'Content-Type': 'application/json' });
                                  res.end(JSON.stringify({ success: false, message: 'Помилка сервера під час видалення користувача.' }));
                              }
                          }
                          return;

                      } else {
                          if (!res.headersSent) {
                              res.writeHead(404, { 'Content-Type': 'application/json' });
                              res.end(JSON.stringify({ success: false, message: 'Кінцева точка API не знайдена' }));
                          }
                          return;
                      }

                  } catch (dbErr) {
                      if (!res.headersSent) {
                          res.writeHead(500, { 'Content-Type': 'application/json' });
                          res.end(JSON.stringify({ success: false, message: 'Помилка сервера.' }));
                      } else {
                          process.stderr.write('Заголовки вже були відправлені для 500 помилки бази даних. URL:' + req.url + '\n');
                      }
                      return;
                  } finally {
                      if (connection && connection.connection) {
                          await connection.end();
                      }
                  }
              });

          // Обробка GET запитів
          } else if (req.method === 'GET') {
              // Таблиця лідерів
              if (req.url === '/leaderboard') {
                  let connection;
                  try {
                      connection = await mysql.createConnection(dbConfigApp);
                      const [rows] = await connection.execute(
                          'SELECT nickname, prestige_level FROM players ORDER BY prestige_level DESC LIMIT 10'
                      );

                      if (!res.headersSent) {
                          res.writeHead(200, { 'Content-Type': 'application/json' });
                          res.end(JSON.stringify({ success: true, leaderboard: rows }));
                      }
                      return;

                  } catch (dbErr) {
                      if (!res.headersSent) {
                          res.writeHead(500, { 'Content-Type': 'application/json' });
                          res.end(JSON.stringify({ success: false, message: 'Помилка сервера під час отримання списку лідерів.' }));
                      }
                      return;
                  } finally {
                      if (connection && connection.connection) {
                          await connection.end();
                      }
                  }
              // Обслуговування статичних файлів
              } else {
                  try {
                      let filePath = '.' + req.url;
                      if (filePath === './') {
                          filePath = './index.html';
                      }

                      const extname = String(path.extname(filePath)).toLowerCase();
                      let contentType = 'application/octet-stream';

                      switch (extname) {
                          case '.html': contentType = 'text/html'; break;
                          case '.css': contentType = 'text/css'; break;
                          case '.js': contentType = 'text/javascript'; break;
                          case '.json': contentType = 'application/json'; break;
                          case '.png': contentType = 'image/png'; break;
                      }
                      await fs.access(filePath);
                      const data = await fs.readFile(filePath);

                      if (!res.headersSent) {
                          res.writeHead(200, { 'Content-Type': contentType });
                          res.end(data);
                      }
                  } catch (err) {
                      if (err.code === 'ENOENT') {
                          if (!res.headersSent) {
                              res.writeHead(404, { 'Content-Type': 'text/html' });
                              res.end('<h1>404 Not Found</h1>');
                          }
                      } else {
                          if (!res.headersSent) {
                              res.writeHead(500, { 'Content-Type': 'text/plain' });
                              res.end('Помилка сервера: ' + err.message);
                          }
                      }
                  }
              }
          } else {
              if (!res.headersSent) {
                  res.writeHead(405, { 'Content-Type': 'application/json', 'Allow': 'GET, POST, DELETE' });
                  res.end(JSON.stringify({ success: false, message: 'Метод не дозволено.' }));
              }
          }
      });

      server.listen(port, hostname, () => {
          process.stdout.write(`Сервер запущено за посиланням: http://${hostname}:${port}/\n`);
      });
  });

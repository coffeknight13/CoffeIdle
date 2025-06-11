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
    password: '2910010Ck',
};

const dbConfigApp = {
    host: 'localhost',
    user: 'root',
    password: '2910010Ck',
    database: 'CoffeIdleDB'
};

const databaseName = 'CoffeIdleDB';

// SQL-запит для створення таблиці 'players'
const createPlayersTableSQL = `
CREATE TABLE IF NOT EXISTS players (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nickname VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    coins BIGINT DEFAULT 0,
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

        // Створення бази даних, якщо вона не існує
        await rootConnection.execute(`CREATE DATABASE IF NOT EXISTS ${databaseName} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
        await rootConnection.end();

        // Підключення до бази даних
        appConnection = await mysql.createConnection(dbConfigApp);

        // Створення таблиці 'players', якщо її немає
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

// Запус ініціалізації бази даних перед тим, як сервер почне слухати запити
initializeDatabase().then(() => {
    const server = http.createServer(async (req, res) => {
        // Обробка POST-запитів для API
        if (req.method === 'POST') {
            if (req.headers['content-type'] !== 'application/json') {
                res.writeHead(415, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, message: 'Непідтримуваний тип вмісту. Очікується application/json.' }));
                return;
            }

            const chunks = [];
            req.on('data', chunk => {
                chunks.push(chunk);
            });

            req.on('end', async () => {
                let data;
                let bodyContent = '';

                try {
                    bodyContent = Buffer.concat(chunks).toString('utf8').trim().replace(/[\u0000-\u001F\u007F-\u009F]/g, '');

                    // Перевірка на пустий або некоректний body перед парсингом
                    if (typeof bodyContent !== 'string' || bodyContent.length === 0) {
                        const errorMsg = 'Тіло запиту пусте або має некоректний тип для JSON-парсингу.';
                        if (!res.headersSent) {
                            res.writeHead(400, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ success: false, message: errorMsg }));
                        } else {
                        }
                        return;
                    }

                    data = JSON.parse(bodyContent);
                } catch (parseErr) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: false, message: 'Невірний формат JSON у тілі запиту: ' + parseErr.message }));
                    return;
                }

                if (!data || (typeof data !== 'object' && typeof data !== 'string')) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: false, message: 'Отримані дані мають невірний формат після парсингу JSON.' }));
                    return;
                }

                const { nickname, password, playerMoney, playerPrestige, playerTotalPrestige, coffeeTypes, allUpgradesData } = data;

                let connection;
                try {
                    connection = await mysql.createConnection(dbConfigApp);

                    if (req.url === '/register') {
                        // Логіка реєстрації
                        if (!nickname || !password) {
                            res.writeHead(400, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ success: false, message: 'Нікнейм та пароль обов\'язкові для реєстрації.' }));
                            return;
                        }

                        const [rows] = await connection.execute('SELECT COUNT(*) AS count FROM players WHERE nickname = ?', [nickname]);
                        if (rows[0].count > 0) {
                            res.writeHead(409, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ success: false, message: 'Користувач з таким нікнеймом вже існує.' }));
                            return;
                        }

                        const hashedPassword = await bcrypt.hash(password, saltRounds);

                        // Початкові дані для нового гравця
                        const initialCoins = 10;
                        const initialPrestigePoints = 0;
                        const initialPrestigeLevel = 0;
                        const initialUpgradesPurchased = JSON.stringify({});
                        const initialCoffeeUpgradesCount = JSON.stringify({});

                        await connection.execute(
                            'INSERT INTO players (nickname, password, coins, prestige_points, prestige_level, upgrades_purchased, coffee_upgrades_count) VALUES (?, ?, ?, ?, ?, ?, ?)',
                            [nickname, hashedPassword, initialCoins, initialPrestigePoints, initialPrestigeLevel, initialUpgradesPurchased, initialCoffeeUpgradesCount]
                        );

                        res.writeHead(201, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ success: true, message: 'Реєстрація пройшла успішно!' }));
                        return;

                    } else if (req.url === '/login') {
                        // Логіка входу
                        if (!nickname || !password) {
                            res.writeHead(400, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ success: false, message: 'Нікнейм та пароль обов\'язкові для входу.' }));
                            return;
                        }

                        const [rows] = await connection.execute('SELECT * FROM players WHERE nickname = ?', [nickname]);

                        if (rows.length === 0) {
                            res.writeHead(401, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ success: false, message: 'Невірний нікнейм або пароль.' }));
                            return;
                        }

                        const user = rows[0];
                        const passwordMatch = await bcrypt.compare(password, user.password);

                        if (passwordMatch) {
                            // Успішний вхід, відправлення даних гравця
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
                                    upgradesPurchased: typeof user.upgrades_purchased === 'string' ? JSON.parse(user.upgrades_purchased || '{}') : (user.upgrades_purchased || {}),
                                    coffeeUpgradesCount: typeof user.coffee_upgrades_count === 'string' ? JSON.parse(user.coffee_upgrades_count || '{}') : (user.coffee_upgrades_count || {})
                                }
                            }));
                            return;
                        } else {
                            res.writeHead(401, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ success: false, message: 'Невірний нікнейм або пароль.' }));
                            return;
                        }

                    } else if (req.url === '/api/save-game') {
                        // Логіка збереження гри
                        if (!nickname) {
                            res.writeHead(400, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ success: false, message: 'Нікнейм користувача обов\'язковий для збереження.' }));
                            return;
                        }

                        // Перетворення об'єктів в JSON-рядки для зберігання в БД
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
                                [
                                    playerMoney,
                                    playerPrestige,
                                    playerTotalPrestige,
                                    upgradesPurchasedJson,
                                    coffeeUpgradesCountJson,
                                    nickname
                                ]
                            );

                            if (result.affectedRows > 0) {
                                res.writeHead(200, { 'Content-Type': 'application/json' });
                                res.end(JSON.stringify({ success: true, message: 'Дані гри успішно збережено!' }));
                            } else {
                                res.writeHead(404, { 'Content-Type': 'application/json' });
                                res.end(JSON.stringify({ success: false, message: 'Користувача не знайдено або дані не змінено.' }));
                            }
                        } catch (updateErr) {
                            res.writeHead(500, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ success: false, message: 'Помилка сервера при збереженні даних.' }));
                        }
                        return;

                    } else if (req.url === '/leaderboard') {
                        // Логіка отримання списку лідерів
                        let connectionLeaderboard;
                        try {
                            connectionLeaderboard = await mysql.createConnection(dbConfigApp);
                            const [rows] = await connectionLeaderboard.execute(
                                'SELECT nickname, coins, prestige_level FROM players ORDER BY prestige_level DESC, coins DESC LIMIT 10'
                            );
        
                            res.writeHead(200, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ success: true, leaderboard: rows }));
                            return;
        
                        } catch (leaderboardErr) {
                            res.writeHead(500, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ success: false, message: 'Помилка сервера під час отримання списку лідерів.' }));
                            return;
                        } finally {
                            if (connectionLeaderboard && connectionLeaderboard.connection) {
                                await connectionLeaderboard.end();
                            }
                        }

                    } else {
                        res.writeHead(404, { 'Content-Type': 'application/json' }); // Змінено на JSON для API
                        res.end(JSON.stringify({ success: false, message: 'Кінцева точка API не знайдена' }));
                        return;
                    }

                } catch (dbErr) {
                    if (!res.headersSent) {
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ success: false, message: 'Помилка сервера під час роботи з базою даних.' }));
                    }
                    return;
                } finally {
                    if (connection && connection.connection) {
                        await connection.end();
                    }
                }
            });
        } else if (req.method === 'GET') {
            if (req.url === '/leaderboard') {
                // Логіка отримання списку лідерів (для GET-запитів)
                let connection;
                try {
                    connection = await mysql.createConnection(dbConfigApp);
                    const [rows] = await connection.execute(
                        'SELECT nickname, prestige_level FROM players ORDER BY prestige_level DESC, coins DESC LIMIT 10'
                    );

                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: true, leaderboard: rows }));
                    return;

                } catch (dbErr) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: false, message: 'Помилка сервера під час отримання списку лідерів.' }));
                    return;
                } finally {
                    if (connection && connection.connection) {
                        await connection.end();
                    }
                }
            } else {
                // Логіка обслуговування статичних файлів (GET-запити)
                try {
                    let filePath = '.' + req.url;
                    if (filePath === './') {
                        filePath = './index.html';
                    }

                    const extname = String(path.extname(filePath)).toLowerCase();
                    let contentType = 'application/octet-stream';

                    switch (extname) {
                        case '.html':
                            contentType = 'text/html';
                            break;
                        case '.css':
                            contentType = 'text/css';
                            break;
                        case '.js':
                            contentType = 'text/javascript';
                            break;
                        case '.json':
                            contentType = 'application/json';
                            break;
                        case '.png':
                            contentType = 'image/png';
                            break;
                    }
                    const data = await fs.readFile(filePath);

                    res.writeHead(200, { 'Content-Type': contentType });
                    res.end(data);

                } catch (err) {
                    if (err.code === 'ENOENT') {
                        res.writeHead(404, { 'Content-Type': 'text/html' });
                        res.end('<h1>404 Not Found</h1>');
                    } else {
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('Помилка сервера: ' + err.message);
                    }
                }
            }
        }
    });

    server.listen(port, hostname, () => {
        console.log(`Сервер запущено за посиланням: http://${hostname}:${port}/`);
    });
});

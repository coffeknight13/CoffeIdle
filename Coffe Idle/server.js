const http = require('http');
const fs = require('fs').promises;
const path = require('path');
const mysql = require('mysql2/promise');

const hostname = '127.0.0.1';
const port = 3000;


const dbConfigRoot = {
    host: 'localhost',
    user: 'root',
    password: '2910010Ck'
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

// Функція для підключення до БД та створення таблиці
async function initializeDatabase() {
    let rootConnection;
    let appConnection;
    try {
        rootConnection = await mysql.createConnection(dbConfigRoot);

        await rootConnection.execute(`CREATE DATABASE IF NOT EXISTS ${databaseName} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
        await rootConnection.end();

        appConnection = await mysql.createConnection(dbConfigApp);
        console.log(`Підключено до бази даних "${databaseName}".`);

        await appConnection.execute(createPlayersTableSQL);

    } catch (err) {
        console.error('Помилка при ініціалізації бази даних:', err);
        process.exit(1);
    } finally {
        if (rootConnection) {
            await rootConnection.end();
        }
        if (appConnection) {
            await appConnection.end();
        }
    }
}

initializeDatabase().then(() => {
    const server = http.createServer(async (req, res) => {
        try {
            let filePath = '.' + req.url;
            if (filePath === './') {
                filePath = './index.html';
            }

            const extname = path.extname(filePath);
            let contentType = 'text/html';

            switch (extname) {
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
                case '.jpg':
                case '.jpeg':
                    contentType = 'image/jpeg';
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
                res.end('Server Error: ' + err.message);
            }
        }
    });

    server.listen(port, hostname, () => {
        console.log(`Cервер запущено за посиланням: http://${hostname}:${port}/`);
    });
});
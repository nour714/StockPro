require('dotenv').config();
const mysql = require('mysql2/promise');

async function testConnection() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'warehouse_db'
        });
        console.log("Connection successful!");
        const [rows] = await connection.execute('SELECT * FROM users LIMIT 1');
        console.log("Users:", rows);
        await connection.end();
    } catch (err) {
        console.error("Connection failed:", err.message);
    }
}
testConnection();

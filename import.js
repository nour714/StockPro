require('dotenv').config();
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function importDatabase() {
    console.log('Connecting to Aiven Database...');
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT || 3306,
        ssl: { rejectUnauthorized: false },
        multipleStatements: true // Allows running the entire SQL file at once
    });

    console.log('Connected! Reading database.sql...');
    const sqlFile = path.join(__dirname, 'database.sql');
    
    if (!fs.existsSync(sqlFile)) {
        console.error('Error: database.sql not found in the current directory!');
        process.exit(1);
    }

    const sqlContent = fs.readFileSync(sqlFile, 'utf8');

    console.log('Importing tables and data...');
    try {
        await connection.query(sqlContent);
        console.log('✅ Database imported successfully to Aiven!');
    } catch (err) {
        console.error('❌ Error importing database:', err.message);
    } finally {
        await connection.end();
        process.exit();
    }
}

if (!process.env.DB_HOST) {
    console.log('Please add your Aiven DB credentials to the .env file first!');
} else {
    importDatabase();
}

import { pool } from '../config/Database.js'

const users = `CREATE TABLE IF NOT EXISTS users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(50) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);`;

const plans = `CREATE TABLE IF NOT EXISTS plans(
    planId INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    price DECIMAL(10,2),
    duration_days INT,
    device_limit INT NOT NULL
);`;

const licenses = `CREATE TABLE IF NOT EXISTS licenses(
    licenseId INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    planId INT NOT NULL,
    license_key VARCHAR(36) UNIQUE NOT NULL,
    is_active BOOLEAN NOT NULL,
    activated_at DATETIME,
    expired_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id)
        ON DELETE CASCADE
);`;

const downloads = `CREATE TABLE IF NOT EXISTS downloads(
    downloadId INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    licenseId INT,
    version VARCHAR(20),
    downloaded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id)
        ON DELETE CASCADE
);`;

const createTable = async (tableName, query)=>{
    try {
        await pool.query(query);
        console.log(`${tableName} table created successfully`);
    } catch (error) {
        console.log(`${tableName} not created`, error);
    }
};

const createAllTables = async()=>{
    try {
        await createTable("Users", users);
        await createTable("Plans", plans);
        await createTable("Licenses", licenses);
        await createTable("Downloads", downloads);
    } catch (error) {
        console.log("Tables not created with error: ", error);
    }
};

export default createAllTables;
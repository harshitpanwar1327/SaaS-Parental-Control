import { pool } from '../config/Database.js'

const users = `CREATE TABLE IF NOT EXISTS users(
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100),
email VARCHAR(150) UNIQUE NOT NULL,
password_hash TEXT NOT NULL,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);`;

const plans = `CREATE TABLE IF NOT EXISTS plans(
planId INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100) NOT NULL,
price DECIMAL(10,2),
duration_days INT,
device_limit INT
);`;

const licenses = `CREATE TABLE IF NOT EXISTS licenses(
licenseId INT AUTO_INCREMENT PRIMARY KEY,
userId INT NOT NULL,
planId INT NOT NULL,
license_key VARCHAR(64) UNIQUE NOT NULL,
is_active BOOLEAN NOT NULL,
activated_at DATETIME,
expired_at DATETIME,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
FOREIGN KEY (planId) REFERENCES plans(planId) ON DELETE CASCADE
);`;

const downloads = `CREATE TABLE IF NOT EXISTS downloads(
downloadId INT AUTO_INCREMENT PRIMARY KEY,
userId INT,
licenseId INT,
version VARCHAR(20),
file_url TEXT,
downloaded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
FOREIGN KEY (licenseId) REFERENCES licenses(licenseId) ON DELETE CASCADE
);`;



const createTable = async (tableName, query)=>{
    try {
        await pool.query(query);
        console.log(`${tableName} table created successfully`);
    } catch (error) {
        console.log(`${tableName} not created`,error);
    }
};

const createAllTables = async()=>{
    try {
        await createTable("Users", users);
        await createTable("Plans",plans);
        await createTable("Licenses",licenses);
        await createTable("Downloads",downloads);
    } catch (error) {
        console.log(`All tables not created`,error);
    }
};

export default createAllTables;
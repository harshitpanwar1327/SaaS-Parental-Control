import dotenv from 'dotenv'
import { createPool } from 'mysql2/promise'

dotenv.config();

const pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionLimit: 10,
    queueLimit: 5,
    waitForConnections: true
});

const checkConnection = async ()=>{
    try {
        const connection = await pool.getConnection();
        console.log("Database connected successfully");
        connection.release();
    } catch (error) {
        console.log("Connection failed with error: ", error);
    }
};

export {pool, checkConnection};
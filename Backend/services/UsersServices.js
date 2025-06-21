import bcrypt from 'bcryptjs'
import { pool } from '../config/Database.js';

export const registerUserLogic = async (userData) => {
    try {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const query = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
        const values = [userData.name, userData.email, hashedPassword];
        await pool.query(query, values);

        return {success: true, message: "User registered successfully"};
    } catch (error) {
        return {success: false, message: "Registration failed!"};
    }
}
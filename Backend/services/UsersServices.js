import { pool } from '../config/Database.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

export const registerUserLogic = async (userData) => {
    try {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const query = `INSERT INTO users(name, email, password) VALUES(?, ?, ?)`;
        const values = [userData.name, userData.email, hashedPassword];
        await pool.query(query, values);

        return {success: true, message: "User registered successfully"};
    } catch (error) {
        console.log(error);
        return {success: false, message: "Registration failed!"};
    }
}

export const loginUserLogic = async(userData)=>{
    try {
        const [rows] = await pool.query(`SELECT * FROM users WHERE email = ?`, [userData.email]);
        if(rows.length===0){
            return {success:false,message:"Email not exist!"};
        }
        const user = rows[0];

        const passwordMatch = await bcrypt.compare(userData.password, user.password);
        if(!passwordMatch){
            return {success: false, message: "Invalid Credentials!"};
        }

        const token = jwt.sign(
            {id:user.id, email:user.email},
            process.env.JWT_SECRET,
            {expiresIn:'3h'}
        );

        return {success: true, message: "Login Successfull" , token};
    } catch (error) {
        console.log(error);
        return {success: false, message: "Login failed!"};
    }
}
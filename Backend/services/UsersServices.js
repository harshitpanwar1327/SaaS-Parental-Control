import bcryptjs from 'bcryptjs'
import { pool } from '../config/Database.js';

export const registerUser = async(user)=>{
    console.log(user);

    try {
        const hashedPassword = await bcrypt.hash(user.password,10);
        const query = `INSERT INTO users (email,password) VALUES (?,?)`;
        const values = [user.email, hashedPassword];

        await pool.query(query,values);
        return {success:true,message:"User registered"};
    } catch (error) {
        return {success:false,message:"Registration failed"};
    }
}
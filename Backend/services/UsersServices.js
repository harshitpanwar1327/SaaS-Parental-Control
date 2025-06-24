import bcrypt from 'bcryptjs'
import { pool } from '../config/Database.js';
import jwt from 'jsonwebtoken'

const JWT_SECRET = "sduhviodnvdf4v545484zd4545ds413d5sdsd3ssacnl";

export const registerUserLogic = async (userData) => {
    try {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const query = `INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)`;
        const values = [userData.name, userData.email, hashedPassword];
        await pool.query(query, values);

        return {success: true, message: "User registered successfully"};
    } catch (error) {
        console.log(error);
        
        return {success: false, message: "Registration failed!"};
    }
}

export const loginUserLogic = async(email, password)=>{
    try {
        const [rows] = await pool.query(`SELECT * FROM users WHERE email=?`,[email]);
        if(rows.length===0){
            return {success:false,message:"Email not found"};
        }
        const user = rows[0];
        const passwordMatch = await bcrypt.compare(password,user.password_hash);
        if(!passwordMatch){
            return {success:false,message:"Invalid password"};
        }

        const token = jwt.sign(
            {
                id:user.id,
                email:user.email
            },
            JWT_SECRET,
            {expiresIn:'1h'}
        );

        return {success:true,message:"Login Successfull",token:token};

    } catch (error) {
        console.log(error);
        return {success:false,message:"Login failed",}
    }
}
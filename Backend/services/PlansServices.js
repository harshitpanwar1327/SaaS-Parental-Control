import { pool } from '../config/Database.js'

export const getPlansLogic = async()=>{
    try {
        let [rows] = await pool.query(`SELECT * FROM plans;`);

        return {success: true, message: "Plans fetched successfully", data: rows};
    } catch (error) {
        console.log(error);
        return {success: false, message: "Plans not fetched!"};
    }
}

export const getPlanByIdLogic = async(id)=>{
    try {
        let [rows] = await pool.query(`SELECT * FROM plans WHERE planId = ?;`, [id]);

        return {success: true, message:"Plan details fetched successfully", data: rows};
    } catch (error) {
        console.log(error);
        return {success: false, message: "Plan not found!"};
    }
};
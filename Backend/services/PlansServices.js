import { pool } from '../config/Database.js'

export const getPlansLogic = async()=>{
    try {
        let [rows] = await pool.query(`SELECT * FROM plans;`);

        return {success:true,message:"plans fetched successfully", data:rows};
    } catch (error) {
        console.log(error);
        return {success:false,message:"plans not fetched"};
    }
}

export const getPlansByIdLogic = async(id)=>{
    try {
        let [rows] = await pool.query(`SELECT * FROM plans WHERE planId=?;`,[id]);

        return {success:true,message:"plans id fetched successfully", data:rows};
    } catch (error) {
        console.log(error);
        return {success:false,message:"plans not fetched"};
    }
};
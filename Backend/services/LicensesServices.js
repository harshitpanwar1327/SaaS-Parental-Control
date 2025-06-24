import { pool } from "../config/Database.js";

export const getLicenseLogic = async()=>{
    try {
        let [rows] = await pool.query(`SELECT * FROM licenses;`);

        return {success:true,message:"licenses fetched successfully",data:rows};
    } catch (error) {
        console.log(error);
        return {success:false,message:"licenses not fetched"};
    }
}

export const generateLicenseLogic = async(licenseData)=>{
    try {
        const query = `INSERT INTO licenses (userId, planId, license_key, is_active, activated_at, expired_at) VALUES (?, ?, ?, ?, ?, ?);`;
        const values = [licenseData.userId, licenseData.planId, licenseData.license_key, licenseData.is_active, licenseData.activated_at, licenseData.expired_at];
        await pool.query(query,values);

        return {success:true,message:"Data fetched"};
    } catch (error) {
        console.log(error);
        return {success:false,message:"Data not fetched"};
    }
}
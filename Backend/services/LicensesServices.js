import { pool } from "../config/Database.js";

export const getLicenseLogic = async (id) => {
    try {
        let [rows] = await pool.query(`SELECT * FROM licenses WHERE userId = ?;`, [id]);

        return {success: true, message: "License fetched successfully", data: rows};
    } catch (error) {
        console.log(error);
        return {success: false, message: "Licenses not found!"};
    }
}

export const generateLicenseLogic = async (licenseData) => {
    try {
        const query = `INSERT INTO licenses (userId, planId, license_key, is_active, activated_at, expired_at) VALUES (?, ?, ?, ?, ?, ?);`;
        const values = [licenseData.userId, licenseData.planId, licenseData.license_key, licenseData.is_active, licenseData.activated_at, licenseData.expired_at];
        await pool.query(query,values);

        return {success: true, message:"License saved successfully"};
    } catch (error) {
        console.log(error);
        return {success: false, message: "Unable to save license!"};
    }
}
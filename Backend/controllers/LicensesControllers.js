import { LicensesModels } from "../models/LicensesModels.js";
import { getLicenseLogic, generateLicenseLogic } from "../services/LicensesServices.js";

export const getLicense = async (req,res )=> {
    let {id} = req.params;

    if(!id) {
        return res.status(400).json({success: false, message: "User ID not found!"});
    }

    try {
        let response = await getLicenseLogic(id);
        if(response.success){
            return res.status(200).json(response);
        }else{
            return res.status(400).json(response);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: "Internal Server Error!"});
    }
}

export const generateLicense = async (req,res) => {
    const {userId , planId, license_key, activated_at, expired_at} = req.body;
    
    if(!userId || !planId || !license_key){
        return res.status(400).json({success: false, message: "Fill all the required fields!"})
    }

    const is_active = (expired_at < new Date()) ? true : false;

    const licenseData = new LicensesModels({userId, planId, license_key, activated_at, expired_at, is_active});
    
    try {
        const response = await generateLicenseLogic(licenseData);
        if(response.success){
            return res.status(200).json(response);
        }else{
            return res.status(400).json(response);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: "Internal server error!"});
    }
}
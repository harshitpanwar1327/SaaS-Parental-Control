import { UsersModels } from "../models/UsersModels.js";
import { registerUser } from "../services/UsersServices.js";

export const register = async (req,res)=>{
    const {email, password} = req.body;
    if(!email||!password){
        return res.status(400).json({success:false,message:"All fiels required"});
    }

    const user = new UsersModels({email,password});

    try {
        const response = await registerUser(user);
        if(response.success){
            return res.status(200).json(response);
        }else{
            return res.status(400).json(response);
        }
    } catch (error) {
        return {success:false,message:"Registration failed"};
    }
}
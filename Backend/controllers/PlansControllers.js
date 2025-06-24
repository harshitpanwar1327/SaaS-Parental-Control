import { getPlansLogic, getPlansByIdLogic } from '../services/PlansServices.js'

export const getPlans = async(req, res)=>{
    try {
        let response = await getPlansLogic();
        if(response.success){
            return res.status(200).json(response);
        }else{
            return res.status(400).json(response);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({status:false,message:"Internal server error!"});
    }
}

export const getPlansById = async(req,res)=>{
    let {id} = req.params;
    if(!id){
        return res.status(400).json({success:false,message:"Plan id not found"});
    }
    try {
        let response = await getPlansByIdLogic(id);
        if(response.success){
            return res.status(200).json(response);
        }else{
            return res.status(400).json(response);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({status:false,message:"Internal server error!"});
    }
}
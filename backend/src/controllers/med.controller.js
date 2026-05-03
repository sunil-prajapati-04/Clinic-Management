import redisClient from '../lib/redis.js';
import Medicine  from '../models/medicine.model.js';

export const searchMedicine = async(req,res)=>{
    try {
        const searchMed = req.query.med.toLowerCase();
        if(!searchMed){
            return res.status(404).json({message:"Search query required"})
        }
        const redisData = await redisClient.get(searchMed);

        if(redisData){
            return res.status(200).json(JSON.parse(redisData));
        }
        const medicineData = await Medicine.find({
            searchName:{$regex:"^"+searchMed,$options:"i"}
        }).limit(10);
        console.log("medicine:",medicineData);
        await redisClient.set(searchMed, JSON.stringify(medicineData), "EX", 3600);
        
        return res.status(200).json(medicineData);
    } catch (error) {
        console.log("error in searchMedicine controller:",error);
        return res.status(500).json({message:"Internal server error"});
    }
}

export const addMedicine = async(req,res)=>{
    try {
        const{name,salt,brand,uses}  = req.body;
        if(!name || !salt || !brand || !uses){
            return res.status(404).json({message:"All fields required"});
        }
        const newMedicine = new Medicine({
            name,
            salt,
            brand,
            uses
        })
        await newMedicine.save();
        return res.status(200).json({message:"Medicine added sucessfully"})
    } catch (error) {
        console.log("error in addMedicine controller:",error);
        return res.status(500).json({message:"Internal server error"})
    }
}
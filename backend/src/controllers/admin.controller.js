import Empolyee from '../models/empolyee.model.js';


export const addEmpolyee = async(req,res)=>{
    try {
        const {name,email,password,destination,degree,phone} = req.body;
        const user = await Empolyee.findOne({email});
        if(user){
            return res.status(401).json({message:"email already exists"});
        }
        if(!name || !email || !password || !destination || !phone){
            return res.status(401).json({message:"All fields are required"});
        }
        if(password.length<8){
            return res.status(401).json({message:"password must pe atleast length of 8"});
        }
        const newEmpolyee  = new Empolyee({
            name,
            email,
            password,
            destination,
            degree,
            phoneNumber:phone
        })
        await newEmpolyee.save();
        return res.status(200).json({message:"Empolyee registered successfully"});
    } catch (error) {
        console.log("error in signup controller:",error);
        return res.status(500).json({message:"Internal server error"})
    }
}



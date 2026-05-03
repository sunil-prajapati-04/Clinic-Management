import Empolyee from '../models/empolyee.model.js';
import genToken from '../lib/jwt.js';

export const login = async(req,res)=>{
    try {
        const {email,password} = req.body;
        const user  = await Empolyee.findOne({email});
        if(!user || !(user.comparePassword(password))){
            return res.status(404).json({message:"email or password is invalid"});
        }
        const payload = {
            id:user.id,
            username:user.name
        }
        const token = await genToken(payload);
        res.cookie("sbcToken",token,{
            maxAge: 2*24*60*60*1000,
            httpOnly: true,
            secure: true,
            sameSite: "None"
        })
        console.log("token:",token);
        return res.status(200).json(token)
    } catch (error) {
        console.log("error in login contorller:",error);
        res.status(500).json({message:"Internal server error"});
    }
} 

export const myProfile = async(req,res)=>{
    try {
        const userId = req.user.id;
        const user = await Empolyee.findById(userId).select("-password");
        if(!user){
            return res.status(404).json({message:"Empolyee not found"});
        }
        return res.status(200).json(user);
    } catch (error) {
        console.log("error in myProfile controller:",error);
        return res.status(500).json({message:"Internal serve error"})
    }
}

export const logout = async(req,res)=>{
    try {
        const userId = req.user.id;
        const user = await Empolyee.findById(userId);
        if(!user){
            return res.status(404).json({message:"Empolyee not found"});
        }
        res.clearCookie("sbcToken",{
            httpOnly: true,
            secure: true,
            sameSite: "None"
        });
        return res.status(200).json({message:"Logout successfully"});
    } catch (error) {
        console.log("error in logout controller:",error);
        return res.status(500).json({message:"Internal server error"})
    }
}

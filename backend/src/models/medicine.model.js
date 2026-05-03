import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema({
    name:String,
    salt:String,
    brand:String,
    uses:String,
    searchName:String
},{timestamps:true})

const medicineDB  = mongoose.model("medicineDB",medicineSchema);
export default medicineDB;
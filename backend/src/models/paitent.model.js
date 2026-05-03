import mongoose from "mongoose";

const paitentSchema = new mongoose.Schema({
    paitentName:{
        type:String
    },
    paitentPhone:{
        type:String
    },
    cases:[
        {
            disease:{
                type:String
            },
            prescription:[
                {
                    name:String,
                    salt:String,
                    frequency:String,
                    days:String,
                    instruction:String
                }
            ]
        }
    ],
    doctorName:{
        type:String
    }
},{timestamps:true});

const paitentDB = mongoose.model("patientDB",paitentSchema);
export default paitentDB;
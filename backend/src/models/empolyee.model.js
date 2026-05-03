import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const doctorSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        min:6,
        required:true
    },
    destination:{
        type:String,
        enum:["doctor","nurse","compounder","reciptionist"]
    },
    degree:{
        type:String
    },
    phoneNumber:{
        type:String,
    },
    status:{
        type:String,
        default:"Empolyee"
    }
},{timestamps:true})

doctorSchema.pre('save',async function(){
    try {
        const user = this;
        if(!user.isModified('password')){
            return;
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(user.password,salt);
        user.password = hashPassword;
    } catch (error) {
        throw error;
    }
})

doctorSchema.methods.comparePassword = async function (userPassword) {
    try {
        const isMatch  = await bcrypt.compare(userPassword,this.password);
        return isMatch;
    } catch (error) {
        throw error;
    }
}

const doctorDB = mongoose.model("doctorDB",doctorSchema);
export default doctorDB;
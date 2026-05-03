import jwtToken from 'jsonwebtoken';
import { config } from 'dotenv';
config();

const secrectKey = process.env.SCERECTKEY;
const genToken  = async(payload)=>{
    try {
        const token = await jwtToken.sign(payload,secrectKey);
        return token;
    } catch (error) {
        console.log("error in genToken function:",error);
        throw error;
    }
}

export default genToken;
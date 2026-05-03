import express from 'express';
import {config} from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser'
import connectDB from './middleware/db.js';
import authRoutes from './routes/auth.route.js';
import patientRoutes from './routes/patient.route.js';
import medRoutes from './routes/med.route.js';
import adminRoutes from './routes/admin.route.js';
import './lib/redis.js';
config();



const app = express();
const port = process.env.PORT;

app.use(helmet());

app.use(cors({
  origin:'http://localhost:5173',
  credentials:true
}));

app.use(bodyParser.json());
app.use(cookieParser());

app.use('/sbc/auth',authRoutes);
app.use('/sbc/patient',patientRoutes);
app.use('/sbc/medicine',medRoutes);
app.use('/sbc/admin',adminRoutes);




const startServer = async () => {
  await connectDB(); 
  
  app.listen(port, () => {
    console.log(`server is listening on Port ${port}`);
  });
 
};

startServer();
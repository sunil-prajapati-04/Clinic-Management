import {Worker} from 'bullmq';
import { sendPrescription } from '../lib/perscrption.js';
import redisClient from '../lib/redis.js';
import {config} from 'dotenv';
config();

console.log("worker started");

const worker = new Worker('sendingPresciption', async job =>{
    console.log("JOB RECEIVED:", job.data);
    const {phone, name, caseData, doctorName} = job.data;
    await sendPrescription(phone,name,caseData,doctorName);
},{connection:redisClient});

worker.on('completed', job => {
  console.log(`Job ${job.id} completed`);
});

worker.on('failed', (job, err) => {
  console.log(`Job ${job.id} failed:`, err);
});

worker.on('error', err => {
  console.log("Worker error:", err);
});


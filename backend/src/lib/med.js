import csv from 'csv-parser';
import fs from 'fs';
import Medicine from '../models/medicine.model.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const medDataset = path.join(__dirname, '../uploads/med.csv');


const results=[];

fs.createReadStream(medDataset)
    .pipe(csv())
    .on('data',(data)=>{
        results.push({
            name:data.MedicineName,
            salt:data.Composition,
            brand:data.Manufacturer,
            uses:data.Uses,
            searchName:data.MedicineName.toLowerCase()
        });
    })
    .on('end',async()=>{
        await Medicine.insertMany(results);
        console.log("Data inserted");
    })
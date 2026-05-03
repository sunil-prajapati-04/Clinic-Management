import puppeteer from 'puppeteer';
import twilio from 'twilio';
import cloudinary from '../middleware/cloud.js';
import { config } from 'dotenv';
import fs from 'fs';
config();

const accountSid = process.env.TWILIO_ACCSID;
const authToken = process.env.TWILIO_TOKEN;

const client = twilio(accountSid, authToken);

export const sendPrescription = async (phone, name, caseData, doctorName)=>{
    try {
        const html =
            `<h1>SALASAR BALAJI CLINIC</h1>
            <h3>Dr.${doctorName}</h3>
         <h2>Prescription</h2>
      <p>Patient: ${name}</p>
      <p>Disease: ${caseData.disease}</p>
      <ul>
        ${caseData.prescription.map(med => `
          <li>
          <b>${med.name}</b><br/>
          Salt: ${med.salt}<br/>
          Frequency: ${med.frequency}<br/>
          Days: ${med.days}<br/>
          Instruction: ${med.instruction}</li>
        `).join("")}
      </ul>
        `
        const browser = await puppeteer.launch({
            headless:"new",
            args: ["--no-sandbox", "--disable-setuid-sandbox"]
        });
        const page = await browser.newPage();
        await page.setContent(html);

        const safeName = name.replace(/\s+/g, "_");
        const filePath = `./prescription-${safeName}-${Date.now()}.pdf`;
        await page.pdf({path:filePath, format:'A4'});

        console.log("PDF exists:", fs.existsSync(filePath));
        await browser.close();

        const result = await cloudinary.uploader.upload(filePath,{
            resource_type:'auto',
            type:"upload",
            access_mode:'public'
        });
        console.log("result:",result.secure_url);
        fs.unlinkSync(filePath);
        
        const msg = await client.messages.create({
            from:"whatsapp:+14155238886",
            to:`whatsapp:+91${phone}`,
            body:`Dear ${name}, Here is your Prescription`,
            mediaUrl:[result.secure_url]
        })

        console.log("twilio msg:",msg);
        
        console.log("prescription sent sucessfully");

    } catch (error) {
        console.log("error in sending prescription:",error);
    }
}


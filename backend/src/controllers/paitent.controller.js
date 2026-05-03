import { queue } from '../background/queue.js';
import Doctor from '../models/empolyee.model.js';
import Patient from '../models/paitent.model.js';

export const addPatient = async (req,res)=>{
    try {
        const {name, phone, disease, prescription} = req.body;
        const existingPatient = await Patient.findOne({paitentPhone:phone});

        if(!name || !phone){
            return res.status(400).json({message:"Name and Phone number are required to add Patient"})
        }

        if(existingPatient){
            const obj = {disease,prescription}
            existingPatient.cases.push(obj);
            await existingPatient.save();
            console.log("queue job started");
            const job = await queue.add('sendingPresciption',{
                phone,
                name,
                caseData:obj,
                doctorName:req.user.username
            });
            console.log("job id:",job.id);
        
            console.log("queue job ended");
            console.log(obj);
            return res.status(200).json({
                message:"Case added to Existing Patient",
                patient: existingPatient
            })
        }

        const arr = [{disease,prescription}];
        const newPatient = new Patient({
            paitentName:name,
            paitentPhone:phone,
            cases:arr,
            doctorName:req.user.username
        })

        await newPatient.save();
        console.log("Patient:",newPatient);
        console.log("queue job started");
        
        const job = await queue.add('sendingPresciption',{
            phone,
            name,
            caseData:{disease,prescription},
            doctorName:req.user.username
        });
        console.log("job id:",job.id);
        
        console.log("queue job ended");
        
        return res.status(200).json({
            message:"Patient added sucessfully",
            patient: newPatient
        });

    } catch (error) {
        console.log("error in addPatient controller:",error);
        return res.status(500).json({message:"Internal server error"});
    }
}

export const patientsProfile = async(req,res)=>{
    try {
        const patient = await Patient.find();
        if(!patient){
            return res.status(404).json({message:"No patient found"});
        }
        return res.status(200).json(patient);
    } catch (error) {
        console.log("error in patientsProfile controller:",error);
        return res.status(500).json({message:"Internal server error"});
    }
}

export const updatePatientCase = async(req,res)=>{
    try {
        const {patientId,caseId} = req.params;
        const {updatedDisease, updatedPrescription, disease, prescription} = req.body;
        const patient = await Patient.findById(patientId);
        if(!patient){
            return res.status(404).json({message:"Patient not found"})
        }
        const updatedCase = await Patient.findOneAndUpdate(
            {_id:patientId,"cases._id":caseId},
            {
                $set:{
                    "cases.$.disease":updatedDisease || disease,
                    "cases.$.prescription":updatedPrescription || prescription
                }
            },
            {new:true}
        );
        if(!updatedCase){
            return res.status(404).json({message:"Case not found"});
        }
        return res.status(200).json(updatedCase);
    } catch (error) {
        console.log("error in updatePatientCase controller:",error);
        return res.status(500).json({message:"Internal server error"});
    }
}

export const updatePatient = async(req,res)=>{
    try {
        const patientId = req.params.id;
        const {name, phone, paitentName, paitentPhone} = req.body;
        const updatedData = {
            paitentName: paitentName || name,
            paitentPhone: paitentPhone || phone
        };
        const patient = await Patient.findByIdAndUpdate(patientId,updatedData,{new:true});
        if(!patient){
            return res.status(404).json({message:"Patient not found"})
        }
        return res.status(200).json(patient)
    } catch (error) {
        console.log("error in updatePatient",error);
        return res.status(500).json({message:"Internal server error"});
    }
}

export const deletePatientCase = async(req,res)=>{
    try {
        const {patientId,caseId} = req.params;
        const patient = await Patient.findByIdAndUpdate(
            patientId,
            {$pull:{cases:{_id:caseId}}},
            {new:true}
        );
        if(!patient){
            return res.status(404).json({message:"Patient not found"});
        }
        return res.status(200).json(patient);
    } catch (error) {
        console.log("error in deletePatientCase controller:",error);
        return res.status(500).json({message:"Internal server error"});
    }
}

export const searchPatient = async(req,res)=>{
    try {
        const phoneNumber = req.query.phone;
        const patient = await Patient.findOne({paitentPhone:phoneNumber});
        if(!patient){
            return res.status(404).json({messgae:"Paitent not found"});
        }
        return res.status(200).json(patient);
    } catch (error) {
        console.log("error in searchPatient controller:",error);
        return res.status(500).json({message:"Internal server error"});
    }
}

export const deletePatient = async(req,res)=>{
    try {
        const patientId = req.params.id;
        const patient = await Patient.findByIdAndDelete(patientId);
        if(!patient){
            return res.status(404).json({message:"Patient not found"})
        }
        return res.status(200).json({message:"Patient deleted successfully"});
    } catch (error) {
        console.log("error in deletePatient controller:",error);
        return res.status(500).json({message:"Internal server error"});
    }
}

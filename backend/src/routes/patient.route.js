import express from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import { addPatient, deletePatient, deletePatientCase, patientsProfile, searchPatient, updatePatient, updatePatientCase } from '../controllers/paitent.controller.js';

const router = express.Router();

router.post('/add',authMiddleware,addPatient);
router.get('/get',authMiddleware,patientsProfile);
router.get('/search',authMiddleware,searchPatient);
router.put('/updateCase/:patientId/:caseId',authMiddleware,updatePatientCase);
router.post('/deleteCase/:patientId/:caseId',authMiddleware,deletePatientCase);
router.put('/updatePatient/:id',authMiddleware,updatePatient);
router.post('/delete/:id',authMiddleware,deletePatient);

export default router;

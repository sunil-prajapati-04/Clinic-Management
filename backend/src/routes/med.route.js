import express from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import { addMedicine, searchMedicine } from '../controllers/med.controller.js';

const router = express.Router();

router.post('/add',authMiddleware,addMedicine);
router.get('/search',authMiddleware,searchMedicine);

export default router
import express from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import { addEmpolyee } from '../controllers/admin.controller.js';

const router = express.Router();

router.post('/add',authMiddleware,addEmpolyee);

export default router;

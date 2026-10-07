import express from 'express';
import { getAllCertifications, getCertificationById } from '../controllers/certificationController.js';

const router = express.Router();

router.get('/', getAllCertifications);
router.get('/search', getAllCertifications);
router.get('/:id', getCertificationById);

export default router;

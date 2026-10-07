import express from 'express';
import { getAdminStats, createEducation, createJobRole } from '../controllers/adminController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect, adminOnly);

router.get('/stats', getAdminStats);
router.post('/education', createEducation);
router.post('/jobs', createJobRole);

export default router;

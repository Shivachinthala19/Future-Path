import express from 'express';
import { getMyTwin, updateTwin, getPublicPassport } from '../controllers/twinController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/me', protect, getMyTwin);
router.put('/me', protect, updateTwin);
router.get('/passport/:slug', getPublicPassport);

export default router;

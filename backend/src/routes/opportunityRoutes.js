import express from 'express';
import { getOpportunities } from '../controllers/opportunityController.js';

const router = express.Router();

router.get('/', getOpportunities);

export default router;

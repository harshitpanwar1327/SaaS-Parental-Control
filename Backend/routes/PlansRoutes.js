import express from 'express'
import { getPlans, getPlanById } from '../controllers/PlansControllers.js';

const router = express.Router();

router.get('/get-plans',getPlans);
router.get('/get-plans/:id',getPlanById);

export default router;
import express from 'express'
import { getPlans, getPlansById } from '../controllers/PlansControllers.js';

const router = express.Router();

router.get('/get-plans',getPlans);
router.get('/get-plans/:id',getPlansById);

export default router;
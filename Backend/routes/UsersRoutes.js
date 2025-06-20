import express from 'express'
import { register } from '../controllers/UsersControllers.js';

const router = express.Router();

router.post('/register-user',register);

export default router;
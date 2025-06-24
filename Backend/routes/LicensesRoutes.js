import { getLicense , generateLicense} from "../controllers/LicensesControllers.js";
import express from 'express'

let router = express.Router();

router.get('/get-licenses/:id', getLicense);
router.post('/generate-license', generateLicense);

export default router;
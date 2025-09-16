import express from 'express';
import {submitSurvey} from '../controllers/SurveyController.js';
const router=express.Router();
router.post('/',submitSurvey);

export default router;

import { response } from 'express';
import mongoose from 'mongoose';

const surveyResponseSchema=new mongoose.Schema({
responses:{type:Object,required:true},
submittedAt:{type:Date,default:Date.now}

})

export default mongoose.model('SurveyResponse',surveyResponseSchema);
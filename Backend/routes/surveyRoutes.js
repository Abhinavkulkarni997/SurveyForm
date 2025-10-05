const express = require('express');
const survey =require('../models/Survey');
const {analyzeDescription}=require('../utils/analyzeDescription');

const router=express.Router();
router.post('/',async(req,res)=>{
    try{
        const payload=req.body;
        console.log(payload)
        const {keywords}=payload.Description ? analyzeDescription(payload.Description) :{ keywords:[]};
        payload.AnalyzedData=keywords;
        const surveyData=new survey(payload);
        await surveyData.save();
        console.log('Data saved Successfully',surveyData);
    res.json({message:'Survey response submitted successfully',analysis:keywords});

    }catch(error){
        console.log('error in saving to DB',error);
        res.status(500).json({error:"Failed to save the Data",details:error.message})
    }
   
});

router.get('/',async(req,res)=>{
    try{
        const studentsData=await survey.find();
        res.json(studentsData);
    }
    catch(error){
        console.log('error in fetching data',error);
        res.status(500).json({error:"Failed to fetch the Data",details:error.message})

    }
})

module.exports= router;

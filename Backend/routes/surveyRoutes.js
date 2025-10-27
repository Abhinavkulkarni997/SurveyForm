const express = require('express');
const survey =require('../models/Survey');
const {analyzeDescription}=require('../utils/analyzeDescription');
const {rakeAnalyzer}=require('../utils/rakeAnalyzer');

const router=express.Router();
router.post('/',async(req,res)=>{
    try{
        const payload=req.body;
        console.log(payload)
        const {keywords:winkKeywords}=payload.Description ? analyzeDescription(payload.Description) :{ keywords:[]};
        const {keywords:rakeKeywords}=payload.Description?rakeAnalyzer(payload.Description):{ keywords:[]};

        payload.WinkAnalyzedData=winkKeywords;
        payload.RakeAnalyzedData=rakeKeywords;
        const surveyData=new survey(payload);
        await surveyData.save();
        console.log('Data saved Successfully',surveyData);
    res.json({message:'Survey response submitted successfully',analysis:{wink:winkKeywords,rake:rakeKeywords}});

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

router.get('/phonenumber',async(req,res)=>{
    try{
        res.json
    }catch(error){
        console.log('Phone Number already exists',error);
        res.status(400).json({error:"Duplicate Phone Number this number already exits",details:error.message})
    }
})

module.exports= router;

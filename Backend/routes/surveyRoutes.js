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

router.get('/check-number/:mobile',async(req,res)=>{
    try{
        const {mobile}=req.params;
        if(!/^\d{10}$/.test(mobile)){
            res.status(400).json({exists:false,valid:false,error:'Invalid Phone Format'})
        }
        const mobexists=await survey.exists({MobileNumber:mobile});
        return res.json({exists:!!mobexists,valid:true,message:mobexists? "This Phone Number is already registered":"Phone number is available"})
    }catch(error){
        console.log('Phone Number  error',error);
        res.status(500).json({exists:false,valid:false,message:'server error'})
    }
})

module.exports= router;

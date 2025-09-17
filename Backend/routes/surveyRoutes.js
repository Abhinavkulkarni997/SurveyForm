const express = require('express');
const survey =require('../models/Survey');
const router=express.Router();
router.post('/',async(req,res)=>{
    try{
        console.log(req.body)
        const surveyData=new survey(req.body);
        await surveyData.save();
        console.log('Data saved Successfully',surveyData);

//  console.log(req.body);
    res.json({message:'Survey response submitted successfully'});

    }catch(error){
        console.log('error in saving to DB',error);
        res.status(500).json({error:'Error in saving  the survey data'})
    }
   
});

module.exports= router;

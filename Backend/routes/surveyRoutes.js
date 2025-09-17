const express = require('express');
const survey =require('../models/Survey');
const router=express.Router();
router.post('/',(req,res)=>{
    try{
        const surveyData=async 
 console.log(req.body);
    res.json({message:'Survey response submitted successfully'});

    }catch(error){
        console.log('error in saving to DB',error);
        res.status(500).json({error:'Error in saving  the survey data'})
    }
   
});

module.exports= router;

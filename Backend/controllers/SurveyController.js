import SurveyResponse from '../models/SurveyResponse.js';

const submitSurvey=async (req,res)=>{
    try{
        const newResponse=new SurveyResponse({
            responses:req.body
        });
        await newResponse.save();
        res.status(201).json({message:'Survey response submitted successfully'});
    }catch(error){
        res.status(500).json({message:'Server Error',error:error.message});
    }
}

export {submitSurvey};
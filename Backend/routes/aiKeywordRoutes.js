const express=require('express');
const {HfInference}=require('@huggingface/inference');
const axios=require('axios');
const router=express.Router();


const hf=new HfInference(process.env.HF_TOKEN);
console.log("HF Token:",process.env.HF_TOKEN?'Loaded':'Missing')
const KEYWORD_MODEL='Qwen/Qwen2.5-0.5B-Instruct';
router.post('/keywords',async(req,res)=>{
try{
    const {Description}=req.body;
    // const HF_API_URL='https://api-inference.huggingface.co/models/facebook/bart-large-cnn';
    // const HF_TOKEN=process.env.HF_TOKEN;
    
    const text=`Extract only the most  relevant AI and Machine Learning related keywords from the following text
    Return them as a simple comma-separated list of keywords, no explanation. Text:${Description}`
    // const response=await axios.post(HF_API_URL,{inputs:text},{headers:{Authorization:`Bearer ${HF_TOKEN}`}})
    const response=await hf.textGeneration({
        model:KEYWORD_MODEL,
        input:text
    });
    let generatedKeywords=response.generated_text;
    let keywords=[];
    if(generatedKeywords){
        keywords=generatedKeywords.trim().replace(/^Keywords:\s*/i, '').split(',').map(k=>k.trim()).filter(k=>k.length>0);
    }
    res.json({
        message:'AI/ML keywords extracted successfully',
        keywords
    });
}catch(err){
    console.log("Error:",err);
    res.status(500).json({error:'Failed to extract keywords',details:err.message})
}
})

module.exports=router;
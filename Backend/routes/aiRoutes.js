const express=require('express');
const {HfInference}=require('@huggingface/inference');
const router=express.Router();

const hf=new HfInference(process.env.HF_TOKEN)
console.log("HF Token:", process.env.HF_TOKEN ? "Loaded ✅" : "Missing ❌");

router.post('/summarizer',async(req,res)=>{
    try{
        const {description}=req.body;
        const result=await hf.summarization({
            model:'facebook/bart-large-cnn',
            inputs:description
        });
        res.json({summary:result.summary_text})

    }catch(err){
        console.log('Error',err);
        res.status(500).json({'err':err.message});

    }
})

module.exports=router;
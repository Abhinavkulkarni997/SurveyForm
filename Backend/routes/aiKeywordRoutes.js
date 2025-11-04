const express=require('express');
const axios=require('axios');
const router=express.Router();


router.post('/keywords',async(req,res)=>{
try{
    const {Description}=req.body;
    const HF_API_URL='https://api-inference.huggingface.co/models/facebook/bart-large-cnn';
    const HF_TOKEN=process.env.HF_TOKEN;
    const response=await axios.post('')

}catch(err){
    console.log("Error:",err);
}
})

module.exports=router;
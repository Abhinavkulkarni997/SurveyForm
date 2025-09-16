const express = require('express');
const router=express.Router();
router.post('/',(req,res)=>{
    console.log(req.body);
    res.json({message:'Survey response submitted successfully'});
});

module.exports= router;

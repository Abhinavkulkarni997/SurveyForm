const mongoose=require('mongoose');
const {schema}=mongoose;
const surveySchema=new schema({
    Name:{type:String ,required:true},
    CollegeName:{type:String,required:true},
    Email:{type:String,required:true},
    MobileNumber:{type:String,required:true},
    Course:{type:String,required:true},
    AreaOfInterest:{type:String,required:true},
    Description:{type:String,required:true},
})
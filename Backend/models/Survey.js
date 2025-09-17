const mongoose=require('mongoose');
const {schema}=mongoose;
const surveySchema=new schema({
    id:{type:Number,required:true,unique:true},
    Name:{type:String ,required:true},
    CollegeName:{type:String,required:true},
    Email:{type:String,required:true,lowercase:true,unique:true},
    MobileNumber:{type:String,required:true,unique:true},
    Course:{type:String,required:true},
    BranchName:{type:String,required:true},
    AreaOfInterest:{type:String,required:true},
    Description:{type:String,required:true},
    CreatedAt:{type:Date,required:true}
  
},{timestamp:true});
module.exports=mongoose.model('surveySchema',surveySchema);
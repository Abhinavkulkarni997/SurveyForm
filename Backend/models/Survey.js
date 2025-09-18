const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const surveySchema=new Schema({
    Name:{type:String ,required:true},
    CollegeName:{type:String,required:true},
    Email:{type:String,required:true,lowercase:true,unique:true},
    MobileNumber:{type:String,required:true,unique:true},
    Course:{type:String,required:true},
    DepartmentName:{type:String,required:true},
    AreaOfInterest:{type:String,required:true},
    Description:{type:String,required:true},
    AnalyzedData:{type:String,required:false}
  
},{timestamps:true});

module.exports=mongoose.model('surveySchema',surveySchema);
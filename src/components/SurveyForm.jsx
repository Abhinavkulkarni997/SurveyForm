import React,{useEffect, useState} from 'react'
import Send from '../assets/images/SubmitButton/send-symbol-svgrepo-com.svg';
import Survey from '../assets/images/Heading/survey-rating-feedback-svgrepo-com.svg';
import Robot from '../assets/images/Body/robot-svgrepo-com.svg';
import User from '../assets/images/Body/user-svgrepo-com.svg';
import axios from 'axios';

const SurveyData=[
  {
    id:1,
    question:"Hi there! I am your AI Assistant. I am here to help you in filling the survey form.",
  },
  {
    id:2,
    field:'Name',
    question:"What is your name?",
    type:"text",
    placeholder:"Enter your name",
    required:true
  },
  {
    id:3,
    field:'CollegeName',
    question:"What is Your College Name?",
    type:"text",
    placeholder:"Enter your college name",
    required:true
  },
    {
    id:4,
    field:'Email',
    question:"What is your email?",
    type:"email",
    placeholder:"Enter your email",
    required:true
  },
  {
    id:5,
    field:'MobileNumber',
    question:"What is your phone number?",
    type:"tel",
    placeholder:"Enter your phone number",
    required:true
  },{
    id:6,
    field:'Course',
    question:"Please Select Your Course",
    type:"select",
    options:["B.Tech","M.Tech","BCA","MCA"],
    required:true
  },{
    id:7,
    field:'DepartmentName',
    question:'Please Select Your Branch Name/ Department Name',
    type:"select",
    options:["CSE","ECE","EEE","IT","CSE-AI/ML","CSE-DataScience","CSE-IoT","CSBS","CSIT","CSM","CSH","CS-Graphics","CS-DevOps","CS-CyberSecurity",
      "CS-CloudComputing","CS-BlockChain","ME","Mechanical Engineering (Mechatronics)","Digital Electronics and Communication Engineering",
      "Power Electronics and Electrical Drives","Computer Aided Structural Engineering","Metallurgical and Materials Engineering",
     "Civil Engineering","Bio-Technology","Chemical Engineering","BPharmacy","Biomedical Engineering","Material Engineering","Aerospace Engineering"],
    required:true
  },{
    id:8,
    field:'AreaOfInterest',
    question:'What is your Area of Interest?',
    type:"select",
    options:["Natural Language Processing","Generative AI","Data Science","Computational Learning Theory","Machine Learning",
      "Artificial Intelligence","Cloud Computing","AI/ML-Cyber Security","Internet of Things (IoT)"],
    required:true
  },{
    id:9,
    field:'Description',
    question:"Can You Provide a Brief Description About Artificial Intelligence and Machine Learning in your own words?",
    type:"textarea",
    placeholder:"Enter your description",
    required:true
  }
]
const SurveyForm = () => {
  const [currentQuestionIndex,setCurrentQuestionIndex]=useState(0);
  const [formData,setFormData]=useState({});
  const [messageHistory,setMessagesHistory]=useState([]);
const emailValidation=(email)=>{
    const emailRegex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

const mobileNumberValidation=(MobileNumber)=>{
    const mobileRegex=/^\d{10}$/;
   return  mobileRegex.test(MobileNumber);
}
const handleSubmit=(e)=>{
  e.preventDefault();
  const value=e.target.userInput.value.trim();
  if(!value) return;
  e.target.userInput.value="";
  const currentField=SurveyData[currentQuestionIndex].field;
  if(currentField==="Email" && !emailValidation(value)){
    alert("email is Invalid Please enter a valid Email")
    return; 
  }
  if(currentField==="MobileNumber" && !mobileNumberValidation(value)){
    alert("Mobile Number is Invalid and Please enter a valid Mobile Number");
    return;
  }

  const newFormData={...formData, AnalyzedData:'Pending Analysis',
   [SurveyData[currentQuestionIndex].field]:value
  };
  setFormData(newFormData);
 setMessagesHistory([...messageHistory,{question:SurveyData[currentQuestionIndex].question,
  options:SurveyData[currentQuestionIndex].options, answer:value}]);

 e.target.reset();

if(currentQuestionIndex<SurveyData.length-1){
  setCurrentQuestionIndex(currentQuestionIndex+1);
}else{
  console.log("Form Submitted",newFormData);
  alert("Form Submitted Successfully!");

// api logic to send form data to backend
axios.post('http://localhost:5000/api/surveys',newFormData)
.then(response=>{
  console.log("Response from server:",response.data);
  console.log(response.headers);
  console.log(response.status);
 
})
.catch(error=>{
  console.error("Error submitting form:",error);
});
  setCurrentQuestionIndex(0);
  setFormData({});
  setMessagesHistory([]);
  
}

}
useEffect(()=>{
  if(currentQuestionIndex===0){
    setMessagesHistory([{question:SurveyData[0].question, answer:""}]);
    setCurrentQuestionIndex(1)
  }
},[currentQuestionIndex])


  return (
    <section className='min-h-screen py-12 px-4 sm:px-6 lg:px-8 '>
     <div className='max-w-7xl mx-auto '>
      <div className='w-1/2 mx-auto border p-5 rounded-lg shadow-lg'>
       {/* <h1 className='text-3xl font-bold text-center '>Student Form</h1> */}
       {/* <p className="text-lg text-indigo-600 mb-2">Student Form</p> */}
        <div className='flex flex-wrap items-center justify-center bg-indigo-500 rounded-lg mx-auto '>
      <img src={Survey} alt="Survey" className='w-8 h-8 bg-white  rounded-md ' />
      <h1 className='p-4  text-white font-bold text-3xl'> Student Survey Form </h1>
      </div>

      <div className='flex flex-wrap items-center justify-center space-y-4 mb-4'>
        {messageHistory.map((chat,index)=>(
          <div key={index} className='my-2 p-2 border-b'>
            <div className='font-bold p-2 bg-indigo-200 rounded '><img src={Robot} alt="Robot" className='inline-flex w-8 h-8 mr-2' />{chat.question}
            </div>
          
            {chat.answer && (
              <div className='font-bold p-2 bg-indigo-200 rounded text-left mt-2'><img src={User} alt="User" className='inline-flex w-8 h-8 mr-2 bg-blue-500 rounded-full' />{chat.answer}</div>
            )}
          </div>
        ))}
      </div>

      {currentQuestionIndex<SurveyData.length && (
        <div  className='my-4 bg-indigo-100 p-4 rounded-lg'>
       <h1 className='font-bold p-2 '><img src={Robot} alt="Robot" className='inline-flex w-8 h-8 mr-2' />{SurveyData[currentQuestionIndex].question}</h1>
       {SurveyData[currentQuestionIndex].options && (
        <div className='flex flex-wrap gap-2 mt-2 items-center justify-center '>
       {SurveyData[currentQuestionIndex].options.map((option,i) =>(
         
          <button key={i} onClick={()=>{
            const newFormData={...formData, AnalyzedData:'Pending Analysis',
   [SurveyData[currentQuestionIndex].field]:option
  };
  setFormData(newFormData);
 setMessagesHistory([...messageHistory,{question:SurveyData[currentQuestionIndex].question,
  options:SurveyData[currentQuestionIndex].options, answer:option}]); 
  setCurrentQuestionIndex(prev=>prev+1)
          }} type="button" className='rounded-full bg-indigo-600 hover:bg-indigo-800 font-sans text-white px-4 py-2'>  {option}</button>
        
          
          
        ))}
        </div>
        )}
        
        </div>
      )}

      {/* <h1 className='p-4 bg-indigo-500 w-full text-white'>Welcome I am Your Ai Agent </h1> */}
      {/* <div className='p-4 bg-gray-200 w-full text-black my-3 rounded-lg'>Hello! I'm here to assist you with your survey. Please fill out the form below with your details and any questions or comments you may have. Your feedback is important to us!</div> */}
    
     <form onSubmit={handleSubmit}>
      <div className='flex flex-row gap-2 md:flex'>
      <input id="userInput" type="text" placeholder='Type Your Message....' className='w-full  p-4 rounded-lg my-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 '></input>
      <button className='bg-indigo-500 text-white p-4 my-3 rounded-lg mt-2 hover:bg-indigo-600 inline-flex items-center gap-1'>Submit <img src={Send} alt="Send" className='inline-flex  w-4 h-4 ' /></button>
      </div>
      </form>
      </div>
     </div>
     
     
     </section>
  )
}

export default SurveyForm
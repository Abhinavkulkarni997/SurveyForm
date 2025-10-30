import React,{useEffect, useState} from 'react'
import Send from '../assets/images/SubmitButton/send-symbol-svgrepo-com.svg';
import Survey from '../assets/images/Heading/survey-rating-feedback-svgrepo-com.svg';
import Robot from '../assets/images/Body/robot-svgrepo-com.svg';
import User from '../assets/images/Body/user-svgrepo-com.svg';
import axios from 'axios';

const SurveyData=[
  {
    id:1,
    question:"Hello! I'm your Survey Assistant, ready to guide you through the form.",
  },
  {
    id:2,
    field:'Name',
    question:"Great! Let's begin. What's your name?",
    type:"text",
    placeholder:"Enter your name...",
    required:true
  },
  {
    id:3,
    field:'CollegeName',
    question:"Nice to meet you! What's is College Name?",
    type:"text",
    placeholder:"Enter your college name...",
    required:true
  },
    {
    id:4,
    field:'Email',
    question:"What is your email address?",
    type:"email",
    placeholder:"Enter your email...",
    required:true
  },
  {
    id:5,
    field:'MobileNumber',
    question:"could  you share your phone number?",
    type:"tel",
    placeholder:"Enter your phone number...",
    required:true
  },{
    id:6,
    field:'Course',
    question:"Which course are you currently pursuing?",
    type:"select",
    options:["B.Tech","M.Tech","BCA","MCA"],
    required:true
  },{
    id:7,
    field:'DepartmentName',
    question:'Please Select Your Branch or Department Name?',
    type:"select",
    options:["CSE","ECE","EEE","IT","CSE-AI/ML","CSE-DataScience","CSE-IoT","CSBS","CSIT","CSM","CSH","CS-Graphics","CS-DevOps","CS-CyberSecurity",
      "CS-CloudComputing","CS-BlockChain","ME","Mechanical Engineering (Mechatronics)","Digital Electronics and Communication Engineering",
      "Power Electronics and Electrical Drives","Computer Aided Structural Engineering","Metallurgical and Materials Engineering",
     "Civil Engineering","Bio-Technology","Chemical Engineering","BPharmacy","Biomedical Engineering","Material Engineering","Aerospace Engineering"],
    required:true
  },{
    id:8,
    field:'AreaOfInterest',
    question:'What areas interest you the most?(You can select multiple)',
    type:"multiselect",
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
  },
  // {
  //   id:10,
  //   question:"Perfect! Thank you for completing the survey. Your responses have been recorded!",
  //   isComplete:true
  // }
]
const SurveyForm = () => {
  const [currentQuestionIndex,setCurrentQuestionIndex]=useState(0);
  const [formData,setFormData]=useState({});
  const [messageHistory,setMessagesHistory]=useState([]);
  const [errorMessage,setErrorMessage]=useState('');
  const [isTyping,setIsTyping]=useState(false);
  // const[mobile,setMobile]=useState('');
const emailValidation=(email)=>{
    const emailRegex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

const mobileNumberValidation=(MobileNumber)=>{
    const mobileRegex=/^\d{10}$/;
   return  mobileRegex.test(MobileNumber);
}

// useEffect(()=>{
//   if(mobile.length===10){
//   axios.get(`http://localhost:5000/api/surveys/check-number/${mobile}`).then((response=>{
//     console.log(response.data);
// })
//   ).catch(err=>{ 
//     console.log(err);
//   })
// }
// },[mobile])



const handleSubmit=async (e)=>{
  e.preventDefault();
  
  const value=e.target.userInput.value.trim();
  if(!value) return;
  e.target.userInput.value="";
  const currentField=SurveyData[currentQuestionIndex].field;


  if(currentField==="Email" ){
    if( !emailValidation(value)){
    // alert("email is Invalid Please enter a valid Email")
    setMessagesHistory([...messageHistory,
    //   {
    //   question:SurveyData[currentQuestionIndex].question,
    //   answer:value,
    // },
    {
      question:"That Doesn't look like a valid Email.Please enter a valid Email",
      answer:"",
      isError:true,
    }]);
    return; 
  }
  try{
    const response=await axios.get(`http://localhost:5000/api/surveys/check-email/${value}`);
    if(response.data.exists){
      setMessagesHistory([...messageHistory,
        {
          question:"This Email is already registered. Please use a different one",
          answer:'',
          isError:true
        }
      ])
      return;
    }
  }catch(err){
    console.log("Error in checking email",err);
    setMessagesHistory([...messageHistory,{
      question:'Server Error while checking email',
      answer:'',
      isError:true
    }])
    return;
  }
}
  if(currentField==="MobileNumber"){
     if( !mobileNumberValidation(value)){
    // alert("Mobile Number is Invalid and Please enter a valid Mobile Number");
    // setMobile(value);
    setMessagesHistory([...messageHistory,
    //   {
    //   question:SurveyData[currentQuestionIndex].question,
    //   answer:value,
    // },
    {
      question:"That Doesn't look like a valid Mobile Number.Please enter a valid Mobile Number",
      answer:"",
      isError:true,
    }])
    // setErrorMessage("That Doesn't look like a valid Mobile Number.Please enter a valid Mobile Number");
    return;
  }
  try{
     const response=await axios.get(`http://localhost:5000/api/surveys/check-number/${value}`);
     if(response.data.exists){
       setMessagesHistory([
        ...messageHistory,
    {
      question:"The mobile number is already Registered.Please use a different one",
      answer:"",
      isError:true,
    }])
    return;

     }
  }catch(err){
    console.log("Error in checking Phone Number",err);
    setMessagesHistory([...messageHistory,
      {
        question:"Server error while checking the mobile number. Please try again",
        answer:'',
        isError:true
      }
    ]);
    return;
  }

}
 

  const newFormData={...formData,
    //  AnalyzedData:'Pending Analysis',
   [SurveyData[currentQuestionIndex].field]:value
  };
  setFormData(newFormData);
 setMessagesHistory([...messageHistory,{question:SurveyData[currentQuestionIndex].question,
  options:SurveyData[currentQuestionIndex].options, answer:value}]);
  setIsTyping(true);
   setTimeout(()=>{
    setIsTyping(false);
  
    setCurrentQuestionIndex(currentQuestionIndex+1);
    
  },2000);

 e.target.reset();

if(currentQuestionIndex<SurveyData.length-1){
  setCurrentQuestionIndex(currentQuestionIndex+1);
}
else{
  console.log("Form Submitted",newFormData);
  // alert("Form Submitted Successfully!");



  setMessagesHistory([...messageHistory,
    {question:"Perfect! Thank you for completing the survey. Your responses have been recorded!",
  answer:null,
isComplete:true}]);

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
setTimeout(()=>{
  setCurrentQuestionIndex(0);
  setFormData({});
  setMessagesHistory([]);
},30000);

  
}

}
useEffect(()=>{
  if(currentQuestionIndex===0){
    setIsTyping(true);
    setTimeout(()=>{
    setMessagesHistory([{question:SurveyData[0].question, answer:""}]);
    setIsTyping(false);
    setIsTyping(true);
    setTimeout(()=>{
      setIsTyping(false);
      setCurrentQuestionIndex(currentQuestionIndex+1);
      
    },2000)
    

  },2000);
  }
},[currentQuestionIndex]);




  return (
    <section className='min-h-screen py-6 sm:py-8 md:py-12 px-4 sm:px-6 lg:px-8 '>
     <div className='max-w-7xl mx-auto '>
      <div className='w-full max-w-2xl  mx-auto bg-white border border-gray-200  rounded-xl shadow-lg overflow-hidden p-4 sm:p-5'>
   <div className='flex flex-col sm:flex-row items-center justify-center bg-indigo-500 rounded-lg mx-auto   p-3 sm:p-6'>
      <img src={Survey} alt="Survey" className='w-6 h-6 sm:w-8 sm:h-8 bg-white  rounded-md mb-2 sm:mb-0 sm:mr-2' />
      <h1 className='p-2 sm:p-2 text-white text-center font-bold text-lg sm:text-2xl md:text-3xl'> Student Survey Form </h1>
      </div>

{/* message history after user typing input*/}
      <div className='space-y-4 mb-4 mt-4'>
        {messageHistory.map((chat,index)=>(
          <div key={index} className=' flex flex-row flex-wrap items-center justify-start space-y-1 my-2 p-2 '>
          {chat.isComplete?(
            <div className='w-full flex justify-left items-center '>
            <img src={Robot} alt="Robot" className='inline-flex w-6 h-6 sm:w-8 sm:h-8 mr-2 ' />
            <div className='bg-green-100  text-left p-2 rounded-lg border-l-4 border-green-500 max-w-md'>{chat.question}</div>
            </div>
          ):(

          <>
           <img src={Robot} alt="Robot" className='inline-flex w-6 h-6 sm:w-8 sm:h-8 mr-2 ' />
            <div className={` p-2 sm:p-2 text-sm sm:text-base rounded-lg border-l-4  text-left ${
              chat.isError ? 'border-red-500 bg-red-100 text-red-700': 'bg-indigo-200 border-indigo-500 text-gray-900'}`}>
            {chat.question}
            </div>

          <div className='w-full flex flex-row items-end justify-end'>
            {chat.answer && (
              <div className='bg-blue-100 p-2 sm:p-2  rounded-lg  border-r-4 border-blue-500 text-right mt-2 text-sm sm:text-base'>
              {chat.answer} 
              </div>
            )}
            {chat.answer && (
              <>
                {<img src={User} alt="User" className='inline-flex w-6 h-6 sm:w-8 sm:h-8 mr-2 bg-blue-500 rounded-full p-1 ml-1' />}
              </>
            )}
            </div>
            </>
          )}
          </div>
        ))}
      </div>

      

      {/* show question that has options and for select options for area of interest  */}
      {currentQuestionIndex < SurveyData.length &&  !messageHistory.some(m=>(m.isComplete)) && (
      <div className='flex flex-row items-center justify-start'>
         <img src={Robot} alt="Robot" className='inline-flex w-6 h-6 sm:w-8 sm:h-8 mr-2' />
      {currentQuestionIndex<SurveyData.length  && (
        <div  className='my-4 bg-indigo-100 p-2 sm:p-2  rounded-lg text-start border-l-4 border-indigo-500 '>
       {isTyping ? (
        <div className='inline-flex  justify-start my-2'>
         <div className='px-4 py-2 rounded-lg  text-gray-700 max-w-sm text-sm sm:text-base'>
         <span className='flex space-x-1'>
          <span  className='w-2 h-2 bg-gray-900 rounded-full animate-bounce [animation-delay:-0.45s]'></span>
          <span className='w-2 h-2 bg-gray-900 rounded-full animate-bounce delay-300 [animation-delay:-045s]'></span>
          <span className='w-2 h-2 bg-gray-900 rounded-full animate-bounce delay-500 [animation-delay:-0.45s]'></span>
          </span>
         </div>
         </div>
       ):(<>
         <h1 className='p-2 text-sm  sm:text-base md:text-lg '>{SurveyData[currentQuestionIndex].question}
         
         
         </h1>
 {SurveyData[currentQuestionIndex].options && (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-2 sm:gap-3 mt-3 '>
       {SurveyData[currentQuestionIndex].options.map((option,i) =>{
         if(SurveyData[currentQuestionIndex].field==="AreaOfInterest"){
          const selectedOptions=formData.AreaOfInterest ||[];
          const isSelected=selectedOptions.includes(option);
       
          return(
            <div key={i} type="button" 
            className={` px-3 sm:px-4 py-2 sm:py-3 rounded-lg  text-sm sm:text-base font-medium  transition-all duration-200 min-h-12 flex items-center justify-center
             ${isSelected?"bg-indigo-700 text-white shadow-md":"bg-indigo-500 text-white hover:bg-indigo-600 hover:shadow-md"}`}
            onClick={()=>{let newSelected;
            if(isSelected){
              newSelected=selectedOptions.filter(op=>op!==option);
            }else{
              newSelected=[...selectedOptions,option];
            }
            setFormData({
              ...formData,
              AreaOfInterest:newSelected,
              // AnalyzedData:'Pending Analysis',
            });
            setErrorMessage("");
            }}
            >{option}</div>
          )
         }return(
          <button key={i} onClick={()=>{const newFormData={
            ...formData,
            //  AnalyzedData:'Pending Analysis',
             [SurveyData[currentQuestionIndex].field]:option};
          setFormData(newFormData);
          setMessagesHistory([...messageHistory,
          {
            question:SurveyData[currentQuestionIndex].question,
          options:SurveyData[currentQuestionIndex].options, 
          answer:option}]); 
          setIsTyping(true);
          setTimeout(()=>{
            setIsTyping(false);
            setCurrentQuestionIndex(prev=>prev+1);
          },2000);
          }}
           type="button" className=' px-3 sm:px-4 py-2 sm:py-3  rounded-lg bg-indigo-600 hover:bg-indigo-700  text-white text-sm sm:text-base font-medium transition-all duration-200 min-h-12  hover:shadow-md'
          > 
           {option}
           </button>
         )
       })}
        </div>
      )}

{/* {(SurveyData[currentQuestionIndex].field==="Email" || SurveyData[currentQuestionIndex].field==="MobileNumber") &&  (
 <> 
      {errorMessage && (
        <div className='text-red-500 text-sm sm:text-base mb-2'>
          {errorMessage}
        </div>
      )}
  </>
)}
         */}


      {/* Show Done button for multiselect */}
        {SurveyData[currentQuestionIndex].field==="AreaOfInterest" &&(
          <div className='flex flex-col items-center  mt-4 cursor-pointer'>
          {(!formData.AreaOfInterest || formData.AreaOfInterest.length===0)&&(
            <span className='text-red-500 mb-2 text-sm sm:text-base'>Please Select at least one Area</span>
          )}
          <button type='button' disabled={!formData.AreaOfInterest || formData.AreaOfInterest.length===0}
          className={`px-4 sm:px-6  py-2 sm:py-3 rounded-lg  font-semibold bg-indigo-600 text-white text-sm sm:text-base  cursor-pointer transition-all duration-200 min-h-12
           ${formData.AreaOfInterest && formData.AreaOfInterest.length > 0
           ? 'hover:bg-indigo-700  hover:shadow-md hover:text-white'  : ' opacity-50 cursor-not-allowed' }`}
          onClick={()=>{
            setMessagesHistory([...messageHistory,{
              question:SurveyData[currentQuestionIndex].question,
              options:SurveyData[currentQuestionIndex].options,
              answer:formData.AreaOfInterest.join(","),
            },
            ]);
         
          setIsTyping(true);
          setTimeout(()=>{
            setIsTyping(false);
             setCurrentQuestionIndex(currentQuestionIndex+1);
          },2000);
             
       
          }}
          >
            Done
          </button>
          </div>
        )}</>
        )}
        </div>
      )}
      </div>
)}
    
    
    {/* Show options for text input and textarea(description) */}
      {currentQuestionIndex<SurveyData.length && !SurveyData[currentQuestionIndex].options && !isTyping && (
     <form onSubmit={handleSubmit}>
      <div className='flex flex-col gap-2 sm:gap-3 sm:flex-row'>
      {SurveyData[currentQuestionIndex].type === 'textarea' ? (
              <textarea id="userInput" 
               name="userInput"
               placeholder={SurveyData[currentQuestionIndex].placeholder || 'Type Your Message....' }
               rows="4"
               className='w-full p-3 sm:p-4 my-2 sm:my-3 rounded-lg  border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-vertical  text-sm sm:text-base '/>

      ):(
      <input id="userInput" 
      name="userInput"
      type={SurveyData[currentQuestionIndex].type || "text"} 
      placeholder={SurveyData[currentQuestionIndex].placeholder || 'Type Your Message....'} 
       className='w-full p-3 sm:p-4 my-2 sm:my-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-vertical min-h-12 text-sm sm:text-base'/>
      )}
      <button type="submit" 
      className='bg-indigo-500 text-white p-3 sm:p-4 my-2 sm:my-3  rounded-lg  hover:bg-indigo-600 inline-flex items-center justify-center transition-all duration-200  gap-2 font-medium text-sm sm:text-base min-h-12 sm:min-h-12 hover:shadow-md'>
      Submit
      <img src={Send} alt="Send" className='inline-flex w-4 h-4' />
      </button>
      </div>
      </form>
      
      )}
      </div>
      
     </div>
     </section>
  )
}

export default SurveyForm
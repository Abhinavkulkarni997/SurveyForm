import React,{useState} from 'react'
import Send from '../assets/images/SubmitButton/send-symbol-svgrepo-com.svg';
import Survey from '../assets/images/Heading/survey-rating-feedback-svgrepo-com.svg';


const SurveyData=[
  {
    id:1,
    question:"Hi there! I am your AI assistant. I am here to help you in filling the survey form.",
  },
  {
    id:2,
    question:"What is your name?",
    type:"text",
    placeholder:"Enter your name",
    required:true
  },
  {
    id:3,
    question:"What is Your College Name?",
    type:"text",
    placeholder:"Enter your college name",
    required:true
  },
    {
    id:4,
    question:"What is your email?",
    type:"email",
    placeholder:"Enter your email",
    required:true
  },
  {
    id:5,
    question:"What is your phone number?",
    type:"tel",
    placeholder:"Enter your phone number",
    required:true
  },{
    id:6,
    question:"Please Select Your Course",
    type:"select",
    options:["B.Tech","M.Tech","BCA","MCA"],
    required:true
  },{
    id:7,
    question:'Please Select Your Branch Name/ Department Name',
    type:"select",
    options:["CSE","ECE","EEE","IT","CSE-AI/ML","CSE-DataScience","CSE-IoT","CSBS","CSIT","CSM","CSH","CS-Graphics","CS-DevOps","CS-CyberSecurity",
      "CS-CloudComputing","CS-BlockChain","ME","Mechanical Engineering (Mechatronics)","Digital Electronics and Communication Engineering",
      "Power Electronics and Electrical Drives","Computer Aided Structural Engineering","Metallurgical and Materials Engineering",
     "Civil Engineering","Bio-Technology","Chemical Engineering","BPharmacy","Biomedical Engineering","Material Engineering","Aerospace Engineering"],
    required:true
  },{
    id:8,
    question:'What is your Area of Interest?',
    type:"select",
    options:["Natural Language Processing","Generative AI","Data Science","Computational Learning Theory","Machine Learning",
      "Artificial Intelligence","Cloud Computing","AI/ML-Cyber Security","Internet of Things (IoT)"],
    required:true
  },{
    id:9,
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

const handleSubmit=(e)=>{
  e.preventDefault();
  

  setFormData({...formData,
    [SurveyData[currentQuestionIndex].id]:e.target.value
  })

}




  return (
    <section className='min-h-screen  py-12 px-4 sm:px-6 lg:px-8 '>
     <div className='max-w-7xl mx-auto'>
     
      <div className='w-1/2 mx-auto border p-5 rounded-lg shadow-lg'>
       {/* <h1 className='text-3xl font-bold text-center '>Student Form</h1> */}
       {/* <p className="text-lg text-indigo-600 mb-2">Student Form</p> */}

        <div className='flex flex-row items-center justify-center bg-indigo-500 rounded-lg mx-auto'>
      <img src={Survey} alt="Survey" className='w-8 h-8 bg-white  rounded-md ' />
      <h1 className='p-4  text-white font-bold text-3xl'> Student Survey Form </h1>
      
      </div>

      {/* <h1 className='p-4 bg-indigo-500 w-full text-white'>Welcome I am Your Ai Agent </h1> */}
      {/* <div className='p-4 bg-gray-200 w-full text-black my-3 rounded-lg'>Hello! I'm here to assist you with your survey. Please fill out the form below with your details and any questions or comments you may have. Your feedback is important to us!</div> */}
      <div className='flex flex-row gap-2 md:flex'>
      <input type="text" placeholder='Type Your Message....' className='w-full border p-4 rounded-lg my-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 '></input>
      <button className='bg-indigo-500 text-white p-4 my-3 rounded-lg mt-2 hover:bg-indigo-600 inline-flex items-center gap-1'>Submit <img src={Send} alt="Send" className='inline-flex  w-4 h-4 ' /></button>
      </div>
      </div>
     </div>
     
     
     </section>
  )
}

export default SurveyForm
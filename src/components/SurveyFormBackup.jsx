import React, { useState, useEffect } from 'react';

const SurveyFormBackup = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    satisfaction: '',
    comments: ''
  });
  const [isWaving, setIsWaving] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Robot animation on load and step changes
  useEffect(() => {
    setIsWaving(true);
    const timer = setTimeout(() => setIsWaving(false), 1500);
    return () => clearTimeout(timer);
  }, [step]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(4); // Success step
  };

  const nextStep = () => {
    setIsVisible(false);
    setTimeout(() => {
      setStep(step + 1);
      setIsVisible(true);
    }, 300);
  };

  const prevStep = () => {
    setIsVisible(false);
    setTimeout(() => {
      setStep(step - 1);
      setIsVisible(true);
    }, 300);
  };

  // Robot message based on current step
  const getRobotMessage = () => {
    switch(step) {
      case 1: return "Hi there! I'm Robo, your survey assistant. Let's start with your basic info!";
      case 2: return "Great! Now, how was your experience with our service?";
      case 3: return "Almost done! Any final comments or suggestions?";
      case 4: return "Thank you for completing the survey! Your feedback is valuable to us!";
      default: return "Hello! Ready to start the survey?";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-800 mb-2">Customer Feedback Survey</h1>
          <p className="text-lg text-indigo-600">We value your opinion</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="md:flex">
            {/* Robot Assistant Section */}
            <div className="md:w-2/5 bg-gradient-to-b from-indigo-600 to-indigo-800 p-6 text-white flex flex-col items-center justify-center">
              <div className="relative mb-6">
                {/* Robot Head */}
                <div className="w-32 h-32 bg-indigo-300 rounded-full border-4 border-white flex items-center justify-center">
                  {/* Robot Eyes */}
                  <div className="flex space-x-4">
                    <div className="w-6 h-8 bg-white rounded-full relative">
                      <div className="w-3 h-3 bg-indigo-800 rounded-full absolute top-2 left-1"></div>
                    </div>
                    <div className="w-6 h-8 bg-white rounded-full relative">
                      <div className="w-3 h-3 bg-indigo-800 rounded-full absolute top-2 left-1"></div>
                    </div>
                  </div>
                  {/* Robot Mouth */}
                  <div className="w-12 h-2 bg-indigo-800 rounded-full absolute bottom-6"></div>
                </div>
                
                {/* Robot Antenna */}
                <div className="w-2 h-6 bg-indigo-300 absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full">
                  <div className="w-4 h-4 bg-red-400 rounded-full absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                </div>
                
                {/* Robot Arm - Waving Animation */}
                <div className={`absolute -left-6 top-12 transform origin-top-right ${isWaving ? 'animate-wave' : ''}`}>
                  <div className="w-6 h-12 bg-indigo-300 rounded-tl-full rounded-tr-full rounded-br-full rounded-bl-full"></div>
                </div>
              </div>
              
              <div className="bg-indigo-800 rounded-lg p-4 relative mt-4">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 rotate-45 w-6 h-6 bg-indigo-800"></div>
                <p className="text-sm text-center relative z-10">{getRobotMessage()}</p>
              </div>
            </div>
            
            {/* Survey Form Section */}
            <div className="md:w-3/5 p-8">
              <form onSubmit={handleSubmit}>
                <div className={`transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                  {step === 1 && (
                    <div className="space-y-4">
                      <h2 className="text-xl font-semibold text-gray-800 mb-6">Personal Information</h2>
                      
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                          Age
                        </label>
                        <input
                          type="number"
                          id="age"
                          name="age"
                          value={formData.age}
                          onChange={handleChange}
                          min="1"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                          required
                        />
                      </div>
                    </div>
                  )}
                  
                  {step === 2 && (
                    <div className="space-y-4">
                      <h2 className="text-xl font-semibold text-gray-800 mb-6">Experience Feedback</h2>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          How satisfied are you with our service?
                        </label>
                        <div className="space-y-2">
                          {['Very Satisfied', 'Satisfied', 'Neutral', 'Unsatisfied', 'Very Unsatisfied'].map((option) => (
                            <div key={option} className="flex items-center">
                              <input
                                type="radio"
                                id={option}
                                name="satisfaction"
                                value={option}
                                checked={formData.satisfaction === option}
                                onChange={handleChange}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                                required
                              />
                              <label htmlFor={option} className="ml-2 block text-sm text-gray-700">
                                {option}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {step === 3 && (
                    <div className="space-y-4">
                      <h2 className="text-xl font-semibold text-gray-800 mb-6">Additional Comments</h2>
                      
                      <div>
                        <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-1">
                          Do you have any suggestions or comments?
                        </label>
                        <textarea
                          id="comments"
                          name="comments"
                          rows={4}
                          value={formData.comments}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        ></textarea>
                      </div>
                    </div>
                  )}
                  
                  {step === 4 && (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h2>
                      <p className="text-gray-600">Your feedback has been submitted successfully.</p>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between mt-8">
                  {step > 1 && step < 4 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                    >
                      Previous
                    </button>
                  )}
                  
                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="ml-auto px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                    >
                      Next
                    </button>
                  ) : step === 3 ? (
                    <button
                      type="submit"
                      className="ml-auto px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                    >
                      Submit
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setStep(1);
                        setFormData({
                          name: '',
                          email: '',
                          age: '',
                          satisfaction: '',
                          comments: ''
                        });
                      }}
                      className="ml-auto px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                    >
                      Start New Survey
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-6 text-sm text-gray-500">
          Step {step} of 4
        </div>
      </div>
      
      <style jsx>{`
        @keyframes wave {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(20deg); }
          50% { transform: rotate(0deg); }
          75% { transform: rotate(-20deg); }
          100% { transform: rotate(0deg); }
        }
        .animate-wave {
          animation: wave 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default SurveyFormBackup;
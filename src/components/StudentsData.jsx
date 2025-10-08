import React, { useState,useEffect } from 'react'
import axios from 'axios'
const StudentsData = () => {
    const [studentsSubmittedData,setStudentsSubmittedData]=useState([]); 
    useEffect(()=>{
            axios.get('http://localhost:5000/api/surveys')
            .then(response=>{
                console.log("Fetched Students Data:",response.data);
                setStudentsSubmittedData(response.data);
            })           
            .catch(error=>{
                console.error("Error fetching students data:",error);
            })
        },[])





  return (
    <section className='min-h-screen py-4 sm:py-6 lg:py-8 '>
        <div className='max-w-7xl mx-auto text-center mb-6 sm:mb-8 px-4 sm:px-6 lg:px-8 '>
        <h1 className='text-xl sm:text-2xl lg:text-3xl font-serif'>Students Submitted  Data</h1>
        </div>
<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 '>
        <div className='w-full overflow-x-auto  p-2 sm:p-2 lg:p-4 border rounded-lg shadow-lg bg-white'>

                <table className='w-full min-w-max  table-auto rounded-lg  border-separate border border-slate-400 '>
                <caption className='caption-top text-sm sm:text-base lg:text-lg font-semibold py-4 md:caption-top'>
                Information of the Students Submitted Using  the Form</caption>
            <thead className='bg-indigo-800  text-white  font-bold line-height:1.5  p-2 border-b'>
            <tr >
                {/* <th className='px-4 py-2 '>Sr.No</th> */}
                <th className='border border-gray-400 px-2 sm:px-3 md:px-4 py-2 text-xs sm:text-sm md:text-base whitespace-nowrap'>Student Name</th>
                <th className='border border-gray-400 px-2 sm:px-3 md:px-4 py-2 text-xs sm:text-sm md:text-base whitespace-nowrap'>Student College Name</th>
                <th className='border border-gray-400 px-2 sm:px-3 md:px-4 py-2 text-xs sm:text-sm md:text-base whitespace-nowrap'>Student Email</th>
                <th className='border border-gray-400 px-2 sm:px-3 md:px-4 py-2 text-xs sm:text-sm md:text-base whitespace-nowrap'>Student Mobile Number</th>
                <th className='border border-gray-400 px-2 sm:px-3 md:px-4 py-2 text-xs sm:text-sm md:text-base whitespace-nowrap'>Student Course</th>
                <th className='border border-gray-400 px-2 sm:px-3 md:px-4 py-2 text-xs sm:text-sm md:text-base whitespace-nowrap'>Student Department Name</th>
                <th className='border border-gray-400 px-2 sm:px-3 md:px-4 py-2 text-xs sm:text-sm md:text-base whitespace-nowrap'>Student Area Of Interest</th>
                <th className='border border-gray-400 px-2 sm:px-3 md:px-4 py-2 text-xs sm:text-sm md:text-base whitespace-nowrap'>Student Description</th>
                <th className='border border-gray-400 px-2 sm:px-3 md:px-4 py-2 text-xs sm:text-sm md:text-base whitespace-nowrap'>Student Data Analyzed with winkNLP</th>
                <th className='border border-gray-400 px-2 sm:px-3 md:px-4 py-2 text-xs sm:text-sm md:text-base whitespace-nowrap'>Student Data Analyzed with RAKE</th>
            </tr>
              
            </thead>
            <tbody className='text-center divide-y divide-gray-200 '>
             {studentsSubmittedData.map((student,index)=>(

                <tr key={index} className='border-b hover:bg-indigo-100'>

                    <td className='border border-gray-400 px-2 sm:px-3 md:px-4  py-2  text-xs sm:text-sm md:text-base'>{student.Name}</td>
                    <td className='border border-gray-400 px-2  sm:px-3 md:px-4 py-2 text-xs sm:text-sm md:text-base'>{student.CollegeName}</td>
                    <td className='border border-gray-400 px-2  sm:px-3 md:px-4 py-2 text-xs sm:text-sm md:text-base'>{student.Email}</td>
                    <td className='border border-gray-400 px-2  sm:px-3 md:px-4 py-2 text-xs sm:text-sm md:text-base'>{student.MobileNumber}</td>
                    <td className='border border-gray-400 px-2  sm:px-3 md:px-4 py-2 text-xs sm:text-sm md:text-base'>{student.Course}</td>
                    <td className='border border-gray-400 px-2  sm:px-3 md:px-4 py-2 text-xs sm:text-sm md:text-base'>{student.DepartmentName}</td>
                    <td className='border border-gray-400 px-2  sm:px-3 md:px-4 py-2 text-xs sm:text-sm md:text-base max-w-xs lg:max-w-sm break-words'>{student.AreaOfInterest.join(', ')}</td>
                    <td className='border border-gray-400 px-2  sm:px-3 md:px-4  py-2 text-xs sm:text-sm md:text-base max-w-xs lg:max-w-sm break-words'>{student.Description}</td>
                    <td className='border border-gray-400 px-2  sm:px-3 md:px-4 py-2 text-xs sm:text-sm md:text-base max-w-xs lg:max-w-sm break-words'>{student.WinkAnalyzedData.join(', ')}</td>
                    <td className='border border-gray-400 px-2  sm:px-3 md:px-4 py-2 text-xs sm:text-sm md:text-base max-w-xs lg:max-w-sm break-words'>{student.RakeAnalyzedData.join(', ')}</td>
                    </tr>
                ))}
            </tbody>
            
        </table>
   </div>
    
        </div>


    </section>
  )
}

export default StudentsData
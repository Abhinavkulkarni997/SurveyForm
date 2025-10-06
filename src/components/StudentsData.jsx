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
    <section className='min-h-screen'>
        <div className='max-w-7xl text-center my-8 px-8 sm:px-4'>
        <h1 className='text-2xl font-serif'>Students Submitted  Data</h1>
      
        </div>
        <div className=' overflow-x-auto   mx-auto p-4 sm:p-8 border rounded-lg shadow-lg'>

                <table className='min-h-screen table-auto rounded-lg  border-separate  border border-slate-400 md:table-fixed'>
                <caption className='caption-top text-lg font-semibold mb-4 md:caption-top'>Information of the Students Submitted Using  the Form</caption>
            <thead className='bg-indigo-800 text-white  font-bold line-height:1.5  p-2 border-b'>
            <tr >
                {/* <th className='px-4 py-2 '>Sr.No</th> */}
                <th className='border border-gray-400 px-4 py-2'>Student Name</th>
                <th className='border border-gray-400 px-4 py-2'>Student College Name</th>
                <th className='border border-gray-400 px-4 py-2'>Student Email</th>
                <th className='border border-gray-400 px-4 py-2'>Student Mobile Number</th>
                <th className='border border-gray-400 px-4 py-2'>Student Course</th>
                <th className='border border-gray-400 px-4 py-2'>Student Department Name</th>
                <th className='border border-gray-400 px-4 py-2'>Student Area Of Interest</th>
                <th className='border border-gray-400 px-4 py-2'>Student Description</th>
                <th className='border border-gray-400 px-4 py-2'>Student Analyzed Data with winkNLP</th>
                <th className='border border-gray-400 px-4 py-2'>Student Analyzed Data with RAKE</th>
            </tr>
              
            </thead>
            <tbody className='text-center '>
             {studentsSubmittedData.map((student,index)=>(

                <tr key={index} className='border-b hover:bg-indigo-100'>

                    <td className='border border-gray-400 px-2 py-2 '>{student.Name}</td>
                    <td className='border border-gray-400 px-2 py-2 '>{student.CollegeName}</td>
                    <td className='border border-gray-400 px-2 py-2 '>{student.Email}</td>
                    <td className='border border-gray-400 px-2 py-2 '>{student.MobileNumber}</td>
                    <td className='border border-gray-400 px-2 py-2 '>{student.Course}</td>
                    <td className='border border-gray-400 px-2 py-2 '>{student.DepartmentName}</td>
                    <td className='border border-gray-400 px-2 py-2 '>{student.AreaOfInterest.join(', ')}</td>
                    <td className='border border-gray-400 px-8 py-2 '>{student.Description}</td>
                    <td className='border border-gray-400 px-2 py-2 '>{student.WinkAnalyzedData.join(', ')}</td>
                    <td className='border border-gray-400 px-2 py-2 '>{student.RakeAnalyzedData.join(', ')}</td>
                    </tr>
                ))}
            </tbody>
            
        </table>
       
    
        </div>


    </section>
  )
}

export default StudentsData
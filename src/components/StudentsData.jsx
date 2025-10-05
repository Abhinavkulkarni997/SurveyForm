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
    <section>
        <div className='max-w-7xl text-center my-8 px-8 sm:px-4'>
        <h1 className='text-2xl font-serif'>Students Submitted  Data</h1>
      
        </div>
        <div className=' overflow-x-auto mx-auto p-4 sm:p-8 border rounded-lg shadow-lg'>
       
                <table className='min-h-screen table-auto rounded-lg  border border-slate-400'>
            <thead className='bg-indigo-800 text-white  font-bold line-height:1.5  p-2 border-b'>
            <tr >
                {/* <th className='px-4 py-2 '>Sr.No</th> */}
                <th className='px-4 py-2'>Student Name</th>
                <th className='px-4 py-2'>Student College Name</th>
                <th className='px-4 py-2'>Student Email</th>
                <th className='px-4 py-2'>Student Mobile Number</th>
                <th className='px-4 py-2'>Student Course</th>
                <th className='px-4 py-2'>Student Department Name</th>
                <th className='px-4 py-2'>Student Area Of Interest</th>
                <th className='px-4 py-2'>Student Description</th>
                <th className='px-4 py-2'>Student Analyzed Data</th>
            </tr>
              
            </thead>
            <tbody className='text-center'>
             {studentsSubmittedData.map((student,index)=>(
                <tr key={index} className='border-b'>
                    <td className='px-2 py-2 '>{student.Name}</td>
                 
                    <td className='px-2 py-2 '>{student.CollegeName}</td>
                    <td className='px-2 py-2 '>{student.Email}</td>
                    <td className='px-2 py-2 '>{student.MobileNumber}</td>
                    <td className='px-2 py-2 '>{student.Course}</td>
                    <td className='px-2 py-2 '>{student.DepartmentName}</td>
                    <td className='px-2 py-2 '>{student.AreaOfInterest.join(', ')}</td>
                    <td className='px-2 py-2 '>{student.Description}</td>
                    <td className='px-2 py-2 '>{student.AnalyzedData.join(', ')}</td>
                    </tr>
                ))}
            </tbody>
            
        </table>
       
    
        </div>


    </section>
  )
}

export default StudentsData
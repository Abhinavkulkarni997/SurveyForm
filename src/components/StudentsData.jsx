import React from 'react'
import axios from 'axios'
const StudentsData = () => {

    const studentsSubmittedData =()=> {
        
            axios.get('http://localhost:5000/api/surveys')
            .then(response=>{
                console.log("Fetched Students Data:",response.data);
                return response.data;
            })           
            .catch(error=>{
                console.error("Error fetching students data:",error);
            })
    }





  return (
    <section>
        <div className='text-center my-8 px-8 sm:px-4'>
        <h1>Students Data</h1>
        <p>Here you can find the data of all students who have submitted the survey.</p>
        </div>
        <div className='max-w-4xl mx-auto p-4 sm:p-8 border rounded-lg shadow-lg'>
        <table className='w-full border-collapse'>
            <thead>
                <tr></tr>
            </thead>
        </table>
        </div>


    </section>
  )
}

export default StudentsData
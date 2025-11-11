import './App.css'
import StudentsData from './components/StudentsData'
import SurveyForm from './components/SurveyForm'
// import SurveyFormBackup from './components/SurveyFormBackup'
import { Route,Routes } from 'react-router-dom';
import SurveyFormv1 from './components/SurveyFormv1';
function App() {
 

  return (
    <>
     
      {/* <SurveyFormBackup/> */}
      <Routes>
          <Route path='/' element={ <SurveyForm/>}/>
        {/* <Route path='/' element={ <SurveyFormv1/>}/> */}

      <Route path='/admin/studentsData' element={<StudentsData/>}/>
      </Routes>
    
       
    </>
  )
}

export default App

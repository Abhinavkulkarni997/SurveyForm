import './App.css'
import StudentsData from './components/StudentsData'
import SurveyForm from './components/SurveyForm'
import SurveyFormBackup from './components/SurveyFormBackup'
import { Route,Routes } from 'react-router-dom';
function App() {
 

  return (
    <>
     
      {/* <SurveyFormBackup/> */}
      <Routes>
        <Route path='/' element={ <SurveyForm/>}/>
      <Route path='/admin/studentsData' element={<StudentsData/>}/>
      </Routes>
    
       
    </>
  )
}

export default App

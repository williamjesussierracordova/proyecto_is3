import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/login/login';
import RecoverPassword from './pages/recoverPassword/recoverPassword';
import Home from './pages/home/home';
import MedicalHistory from './pages/medicalHistory/medicalHistory';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/recover_password" element={<RecoverPassword/>}/>
        <Route path="/home" element={<Home />}/>
        <Route path='/search' element={<MedicalHistory/>}/>
      </Routes>
    </>
  )
}

export default App;
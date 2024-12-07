// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

import { BrowserRouter} from "react-router-dom";
import { useEffect, useState } from "react";
import AdminNavbar from "./admin/AdminNavbar";
import StudentNavbar from "./student/StudentNavbar";
import RecruiterNavbar from './recruiter/RecruiterNavbar';
import PlacementOfficerNavbar from './placementofficer/PlacementOfficerNavbar';

import MainNavbar from "./main/MainNavbar";


function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isStudentLoggedIn, setIsStudentLoggedIn] = useState(false);
  const [isRecruiterLoggedIn, setIsRecruiterLoggedIn] = useState(false);
  const [isOfficerLoggedIn, setIsOfficerLoggedIn] = useState(false);

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
    const studentLoggedIn = localStorage.getItem('isStudentLoggedIn') === 'true';
    const recruiterLoggedIn = localStorage.getItem('isRecruiterLoggedIn') === 'true';
    const officerLoggedIn = localStorage.getItem('isOfficerLoggedIn') === 'true';
    
    setIsAdminLoggedIn(adminLoggedIn);
    setIsStudentLoggedIn(studentLoggedIn);
    setIsRecruiterLoggedIn(recruiterLoggedIn);
    setIsOfficerLoggedIn(officerLoggedIn);
  }, []);

  const onAdminLogin = () => {
    localStorage.setItem('isAdminLoggedIn', 'true');
    setIsAdminLoggedIn(true);
  };

  const onStudentLogin = () => {
    localStorage.setItem('isStudentLoggedIn', 'true');
    console.log('student logged in');
    setIsStudentLoggedIn(true);
  };

  const onOfficerLogin = () => {
    localStorage.setItem('isOfficerLoggedIn', 'true');
    setIsOfficerLoggedIn(true);
  };

  const onRecruiterLogin = () => {
    localStorage.setItem('isRecruiterLoggedIn', 'true');
    setIsRecruiterLoggedIn(true);
  };

  return (
    <div>
      <BrowserRouter basename="/">
        {isAdminLoggedIn ? (
          <AdminNavbar />
        ) : isStudentLoggedIn ? (
          <StudentNavbar />
        ) : isOfficerLoggedIn ? (
          <PlacementOfficerNavbar />
        ) : isRecruiterLoggedIn ? (
          <RecruiterNavbar />
        ) : (
          <MainNavbar
            onAdminLogin={onAdminLogin}
            onStudentLogin={onStudentLogin}
            onOfficerLogin={onOfficerLogin}
            onRecruiterLogin={onRecruiterLogin}
          />
        )}

       
      </BrowserRouter>
    </div>
  );
}

export default App;

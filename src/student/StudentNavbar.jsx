import { Route, Routes, useNavigate } from 'react-router-dom';
import './Student.css';
import StudentHome from './StudentHome';
import ViewJobs from './ViewJob';
import Profile from './Profile';
import UpdateProfile from './UpdateProfile';
import MyApplications from './MyApplications';
import NotFound from '../main/NotFound';
import UpdatePassword from './UpdatePassword';
import AddResume from './AddResume';
import ViewResume from './ViewResume';
import Faq from './Faq'

export default function StudentNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isStudentLoggedIn');
    navigate('/login');
    window.location.reload();
  };

  return (
    <div>
      <nav className="student-navbar">
        <h2 className="student-navbar-logo">Career Connects</h2>
        <ul className="student-navbar-links">
          <li className="student-navbar-item">
            <a href="studenthome" className="student-navbar-link">
              <span className="student-navbar-icon material-symbols-outlined">home</span> Home
            </a>
          </li>
          <li className="student-navbar-item">
            <a href="viewjob" className="student-navbar-link">
              <span className="student-navbar-icon material-symbols-outlined">work</span> Job Listings
            </a>
          </li>
          <li className="student-navbar-item">
            <a href="myapplications" className="student-navbar-link">
              <span className="student-navbar-icon material-symbols-outlined">assignment</span> My Applications
            </a>
          </li>
          <li className="student-navbar-item">
          <a href="faq" className="student-navbar-notifications">
              <span className="material-symbols-outlined">help</span> FAQ
          </a>
          </li>
        </ul>
        <div className="student-navbar-icons">
          <div className="student-navbar-dropdown">
            <a href="#" className="student-navbar-profile">
              <span className="student-navbar-icon material-symbols-outlined">account_circle</span>
              <span className="student-navbar-icon material-symbols-outlined">arrow_drop_down</span>
            </a>
            <ul className="student-navbar-dropdown-content">
              
                <a href="profile" className="student-navbar-dropdown-link">
                  <span className="student-navbar-icon material-symbols-outlined">account_circle</span> Profile
                </a>
              
             
                <a href="resume" className="student-navbar-dropdown-link">
                  <span className="student-navbar-icon material-symbols-outlined">description</span> Resume
                </a>
             
                <a href="#" className="student-navbar-dropdown-link">
                  <span className="student-navbar-icon material-symbols-outlined">settings</span> Settings
                </a>
                <button onClick={handleLogout} className="student-navbar-dropdown-link student-navbar-logout-btn">
                  <span className="student-navbar-icon material-symbols-outlined">logout</span> Logout
                </button>
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/studenthome" element={<StudentHome />} />
        <Route path="/viewjob" element={<ViewJobs />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/updateprofile" element={<UpdateProfile />} />
        <Route path="/studentchangepassword" element={<UpdatePassword />} />
        <Route path="/myapplications" element={<MyApplications />} />
        <Route path="/resume" element={<ViewResume />} />
        <Route path="/addresume" element={<AddResume />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </div>
  );
}

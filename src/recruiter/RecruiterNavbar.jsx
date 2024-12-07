import { Route, Routes, useNavigate } from 'react-router-dom';
import RecruiterHome from './RecruiterHome';
import './recruiter.css';
import AddJob from './AddJob';
import ViewJobs from './ViewJobs';
import UpdateJob from './UpdateJob';
import Profile from './Profile'
import UpdateRecruiterProfile from './UpdateProfile';
import ViewApplicants from './ViewApplicants';
import ViewCandidates from './ViewCandidates';
import NotFound from '../main/NotFound';

export default function RecruiterNavbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('isRecruiterLoggedIn');
    navigate('/login');
    window.location.reload();
  };

  return (
    <div>
      <nav className="recruiter-nav">
        <h2 className="recruiter-logo">Career Connects</h2>
        <ul className="recruiter-nav-links">
          <li className="recruiter-nav-item">
            <a href="recruiterhome">
              <span className="material-symbols-outlined">home</span> Home
            </a>
          </li>
          <li className="recruiter-nav-item">
            <a href="addjob">
              <span className="material-symbols-outlined">work</span> Jobs
            </a>
          </li>
          <li className="recruiter-nav-item recruiter-dropdown">
            <a href="#" className="recruiter-dropdown-toggle">
              <span className="material-symbols-outlined">assignment</span> Applications
              <span className="material-symbols-outlined">arrow_drop_down</span>
            </a>
            <ul className="recruiter-dropdown-content">
                
                <a href="viewapplicants">
                  <span className="material-symbols-outlined">checklist</span> Review Applications
                </a>
                <a href="viewcandidates">
                  <span className="material-symbols-outlined">groups</span> View Candidates
                </a>
            </ul>
          </li>
          <li className="recruiter-nav-item">
            <a href="#">
              <span className="material-symbols-outlined">help</span> FAQ
            </a>
          </li>
          <li className="recruiter-nav-item">
          <a href="#" className="notification-link">
            <span className="material-symbols-outlined">notifications_active</span> Notifications
          </a>
          </li>
        </ul>
        <div className="recruiter-icons">
         
          <div className="recruiter-dropdown">
            <a href="#" className="recruiter-profile-link">
              <span className="material-symbols-outlined">account_circle</span>
              <span className="material-symbols-outlined">arrow_drop_down</span>
            </a>
            <ul className="recruiter-dropdown-content">
              
                <a href="#">
                  <span className="material-symbols-outlined">business</span> Company Profile
                </a>
                <a href="myprofile">
                  <span className="material-symbols-outlined">account_circle</span> My Profile
                </a>
                <button onClick={handleLogout} className='recruiter-logout'>
                  <span className="material-symbols-outlined">logout</span> Logout
                </button>
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/recruiterhome" element={<RecruiterHome />} />
        <Route path="/addjob" element={<AddJob />} />
        <Route path="/viewjobs" element={<ViewJobs />} />
        <Route path="/updatejob" element={<UpdateJob />} />
        <Route path="/myprofile" element={<Profile />} />
        <Route path="/updateprofile" element={<UpdateRecruiterProfile />} />
        <Route path="/viewapplicants" element={<ViewApplicants />} />
        <Route path="/viewcandidates" element={<ViewCandidates />} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </div>
  );
}

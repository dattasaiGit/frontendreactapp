import { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './PlacementOfficer.css';
import PlacementOfficerHome from './PlacementOfficerHome';
import AddStudent from './AddStudent';
import logo from '.././main/images/logo.png'
import ViewAllStudents from './ViewAllStudents';
import Profile from './Profile';
import UpdatePlacementOfficerProfile from './UpdateProfile';
import Faq from './Faq'

export default function PlacementOfficerNavbar() {
  
  const [activeDropdown, setActiveDropdown] = useState(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isOfficerLoggedIn');
    navigate('/login');
    window.location.reload();
  };

  
  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  return (
    <div className={`main-container  `}>
      {/* Sidebar */}
      <aside className={`sidebar  `}>
        <div className="sidebar-header">
          <img src={logo} alt="logo" />
           
        </div>

        <ul className="sidebar-links">
          <h4>
            <span>Main Menu</span>
            <div className="menu-separator"></div>
          </h4>
          <li>
            <a href="placementofficerhome">
              <span className="material-symbols-outlined">dashboard</span>Dashboard
            </a>
          </li>
          <li>
            <a href="#">
              <span className="material-symbols-outlined">assessment</span>Progress Overview
            </a>
          </li>
          <li>
            <a href="#">
              <span className="material-symbols-outlined">monitoring</span>Reports
            </a>
          </li>

          <h4>
            <span>Student Management</span>
            <div className="menu-separator"></div>
          </h4>
          {[
            {
              title: 'Students',
              links: [
                { href: '/addstudent', icon: 'person_add', label: 'Add Student' },
                { href: '/viewstudents', icon: 'visibility', label: 'View Students' },
                { href: '#', icon: 'progress_activity', label: 'Track Progress' },
              ],
            },
            {
              title: 'Workshops',
              links: [
                { href: '#', icon: 'add', label: 'Add Workshop' },
                { href: '#', icon: 'visibility', label: 'View Workshops' },
              ],
            },
          ].map((item, index) => (
            <li className="dropdown" key={index}>
              <a href="#" className="dropdown-btn" onClick={() => toggleDropdown(index)}>
                <span className="material-symbols-outlined">group</span>{item.title}
                <span className="material-symbols-outlined dropdown-icon">
                  {activeDropdown === index ? 'expand_less' : 'expand_more'}
                </span>
              </a>
              <ul className={`dropdown-menu ${activeDropdown === index ? 'active' : ''}`}>
                {item.links.map((link, i) => (
                  <li key={i}>
                    <a href={link.href}>
                      <span className="material-symbols-outlined">{link.icon}</span>{link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </aside>

      <div className={`main-content  `}>
        <div className="admin-user-account">
          <ul>
           <li className="student-navbar-item">
            <a href="faq">
                <span className="material-symbols-outlined">help</span>FAQ
            </a>
            </li>
            <li>
              <a href="profile">
                <span className="material-symbols-outlined">account_circle</span>Profile
              </a>
            </li>
            <li>
              <a style={{cursor:'pointer'}} onClick={handleLogout}>
                <span className="material-symbols-outlined">logout</span> Logout
              </a>
            </li>
          </ul>
        </div>

        <Routes>
          <Route path="/placementofficerhome" element={<PlacementOfficerHome />} />
          <Route path="/addstudent" element={<AddStudent />} />
          <Route path="/viewstudents" element={<ViewAllStudents />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/updateprofile" element={<UpdatePlacementOfficerProfile />} />
          <Route path="/faq" element={<Faq />} />
        </Routes>
      </div>
    </div>
  );
}

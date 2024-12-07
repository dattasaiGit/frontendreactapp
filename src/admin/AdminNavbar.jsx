import { useState } from 'react';
import './admin.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AdminHome from './AdminHome';
import logo from '.././main/images/logo.png';
import VerifyUsers from './VerifyUsers';
import ViewAllStudents from './ViewAllStudents';
import DeleteStudent from './DeleteStudent';
import ViewAllOfficers from './ViewAllOfficers';
import DeleteOfficer from './DeleteOfficer'
import ViewAllrecruiters from './ViewallRecruiter';
import Deleterecruiters from './DeleteRecruiter';
import AdminReports from './AdminReports';
import ViewDeletedUsers from './ViewDeletedUsers';
import NotFound from '../main/NotFound';

export default function AdminNavbar() {
  
  const [activeDropdown, setActiveDropdown] = useState(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    navigate('/login');
    window.location.reload();
  };

  
  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  return (
    <div className={`main-container `}>
      {/* Sidebar */}
      <aside className={`admin-sidebar `}>
        <div className="sidebar-header">
          <img src={logo} alt="logo" />
          <h2>Career Connects</h2>
        </div>
        <br/>
        <ul className="sidebar-links">
          <h4>
            <span>Main Menu</span>
            <div className="menu-separator"></div>
          </h4>
          <li>
            <a href="adminhome">
              <span className="material-symbols-outlined">dashboard</span>Dashboard
            </a>
          </li>
          <li>
            <a href="adminreports">
              <span className="material-symbols-outlined">monitoring</span>Reports
            </a>
          </li>
          <li>
            <a href="verifyusers">
              <span className="material-symbols-outlined">verified</span>Verify Users
            </a>
          </li>

          <h4>
            <span>Users</span>
            <div className="menu-separator"></div>
          </h4>
          {[
            {
              title: 'Student',
              links: [
                { href: 'viewallstudents', icon: 'visibility', label: 'View Students' },
                { href: 'deletestudent', icon: 'delete', label: 'Delete Students' },
              ],
            },
            {
              title: 'Placement Officer',
              links: [
                { href: 'viewallofficers', icon: 'visibility', label: 'View Placement Officers' },
                { href: 'deleteofficer', icon: 'delete', label: 'Delete Placement Officers' },
              ],
            },
            {
              title: 'Recruiter',
              links: [
                { href: 'viewrecruiters', icon: 'visibility', label: 'View Recruiters' },
                { href: 'deleterecruiters', icon: 'delete', label: 'Delete Recruiters' },
              ],
            },
          ].map((item, index) => (
            <li className="dropdown" key={index}>
              <a href="#" className="dropdown-btn" onClick={() => toggleDropdown(index)}>
                <span className="material-symbols-outlined">person</span>
                {item.title}
                <span className="material-symbols-outlined dropdown-icon">
                  {activeDropdown === index ? 'expand_less' : 'expand_more'}
                </span>
              </a>
              <ul className={`dropdown-menu ${activeDropdown === index ? 'active' : ''}`}>
                {item.links.map((link, i) => (
                  <li key={i}>
                    <a href={link.href}>
                      <span className="material-symbols-outlined">{link.icon}</span>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </aside>

      <div className={`main-content `}>
      <div className="admin-user-account">
        <ul>
          <li>
            <a href="archived">
              <span className="material-symbols-outlined">inventory_2</span>Archive
            </a>
          </li>
          <li>
            <a href="#">
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
          <Route path="/adminhome" element={<AdminHome />} />
          <Route path="/adminreports" element={<AdminReports />} />
          <Route path="/verifyusers" element={<VerifyUsers />} />
          <Route path="/viewallstudents" element={<ViewAllStudents />} />
          <Route path="/deletestudent" element={<DeleteStudent />} />
          <Route path="/viewallofficers" element={<ViewAllOfficers />} />
          <Route path="/deleteofficer" element={<DeleteOfficer />} />
          <Route path="/viewrecruiters" element={<ViewAllrecruiters />} />
          <Route path="/deleterecruiters" element={<Deleterecruiters />} />
          <Route path="/archived" element={<ViewDeletedUsers />} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </div>
    </div>
  );
}

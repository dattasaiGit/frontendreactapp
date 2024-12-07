import { useState } from 'react';
import PropTypes from 'prop-types';
import Studentlogin from './Studentlogin';
import Recruiterlogin from './Recruiterlogin';
import PlacementOfficerLogin from './Officerlogin';
import './login.css';
import reg from './images/reg.jpeg';
import student from './images/student.png';
import placementofficer from './images/placement_officer.png';
import recruiter from './images/recruiter.png';

export default function Login({
  onStudentLogin,
  onOfficerLogin,
  onRecruiterLogin,
}) {
  const [activeRole, setActiveRole] = useState('student'); // Default to student

  const handleRoleSelection = (role) => {
    setActiveRole(role);
  };

  return (
    <div className="card">
      <div className="photo-section">
        <img src={reg} alt="Login Illustration" />
      </div>
      <div className="form-section">
        <center>
          <h2>Login</h2>
        </center>
        <div className="role-selection">
          <button
            onClick={() => handleRoleSelection('student')}
            className={activeRole === 'student' ? 'active' : ''}
          >
            <img src={student} alt="Student" />
          </button>
          <button
            onClick={() => handleRoleSelection('placementOfficer')}
            className={
              activeRole === 'placementOfficer' ? 'active' : ''
            }
          >
            <img src={placementofficer} alt="Placement Officer" />
          </button>
          <button
            onClick={() => handleRoleSelection('recruiter')}
            className={activeRole === 'recruiter' ? 'active' : ''}
          >
            <img src={recruiter} alt="Recruiter" />
          </button>
        </div>

        <div className="form-container">
          {activeRole === 'student' && (
            <Studentlogin onStudentLogin={onStudentLogin} />
          )}
          {activeRole === 'placementOfficer' && (
            <PlacementOfficerLogin onOfficerLogin={onOfficerLogin} />
          )}
          {activeRole === 'recruiter' && (
            <Recruiterlogin onRecruiterLogin={onRecruiterLogin} />
          )}
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {
  onStudentLogin: PropTypes.func.isRequired,
  onOfficerLogin: PropTypes.func.isRequired,
  onRecruiterLogin: PropTypes.func.isRequired,
};

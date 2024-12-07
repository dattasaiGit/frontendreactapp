import { useState } from 'react';
import OfficerRegistration from './OfficerRegistration';
import RecruiterRegistration from './RecruiterRegristration';
import reg from './images/reg.jpg';
import placementofficer from './images/placement_officer.png';
import recruiter from './images/recruiter.png';
import './login.css';


export default function Registration() {
  const [activeRole, setActiveRole] = useState('recruiter'); // Default to recruiter

  const handleRoleSelection = (role) => {
    setActiveRole(role);
  };

  return (
    <div className="card" style={{ width: '1000px', height: '1150px' }}>
        <div className="photo-section">
          <img src={reg} alt="Login Illustration" />
        </div>
        <div className="form-section">
        <center><h2>Registration</h2></center>
          <div className="registration-role-selection">
            
            <button
              onClick={() => handleRoleSelection('recruiter')}
              className={activeRole === 'recruiter' ? 'active' : ''}
            >
              <img src={recruiter} alt="Recruiter" />
            </button>
            <button
              onClick={() => handleRoleSelection('placementOfficer')}
              className={activeRole === 'placementOfficer' ? 'active' : ''}
            >
              <img src={placementofficer} alt="Placement Officer" />
            </button>
          </div>

          <div className="registration-form-container">
            {activeRole === 'placementOfficer' && (
              <div className="registration-placementOfficer-form">
                <OfficerRegistration />
              </div>
            )}
            {activeRole === 'recruiter' && (
              <div className="registration-recruiter-form">
                <RecruiterRegistration />
              </div>
            )}

        </div>
</div>
    </div>
  );
}

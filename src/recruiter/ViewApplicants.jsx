import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import config from '../config';

export default function ViewApplicants() {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState('');
  const [recruiterData, setRecruiterData] = useState(null);

  // Fetch recruiter data from localStorage
  useEffect(() => {
    const storedRecruiterData = localStorage.getItem('recruiter');
    if (storedRecruiterData) {
      const parsedRecruiterData = JSON.parse(storedRecruiterData);
      setRecruiterData(parsedRecruiterData);
    }
  }, []);

  const fetchApplications = useCallback(async () => {
    try {
      if (recruiterData) {
        const response = await axios.get(`${config.url}/recruiter/viewapplicants?id=${recruiterData.id}`);
        setApplications(response.data);
      }
    } catch (error) {
      setError(error.message);
    }
  }, [recruiterData]); // Dependency on recruiterData

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]); // Safe to include fetchApplications here

  const accept = async (id) => {
    try {
      await axios.put(`${config.url}/recruiter/reviewcandidates?id=${id}&status=Accepted`);
      fetchApplications();
    } catch (error) {
      setError(error.message);
    }
  };

  const rejectOfficer = async (id) => {
    try {
      await axios.put(`${config.url}/recruiter/reviewcandidates?id=${id}&status=Rejected`);
      fetchApplications(); // Refresh the list after rejecting
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="myapplication-container">
      <h3 className="myapplication-title">My Applications</h3>
      {applications.length > 0 ? (
        <div className="myapplication-table-container">
          <table className="myapplication-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Job ID</th>
                <th>Job Title</th>
                <th>Student ID</th>
                <th>Student Name</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application) => (
                <tr key={application.id}>
                  <td style={{ fontSize: '18px' }}>{application.id}</td>
                  <td style={{ fontSize: '18px' }}>{application.jid}</td>
                  <td style={{ fontSize: '18px' }}>{application.jtitle}</td>
                  <td style={{ fontSize: '18px' }}>{application.sid}</td>
                  <td style={{ fontSize: '18px' }}>{application.sname}</td>
                  <td>
                    <span
                      className={`myapplication-status myapplication-status-${application.status.toLowerCase()}`}
                    >
                      {application.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        onClick={() => accept(application.id)}
                        className="admin-button-tick"
                      >
                        <span className="material-symbols-outlined">check</span>
                      </button>
                      <button
                        onClick={() => rejectOfficer(application.id)}
                        className="admin-button-cross"
                      >
                        <span className="material-symbols-outlined">close</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : error ? (
        <div className="myapplication-error">{error}</div>
      ) : (
        <div className="myapplication-empty">No applications found</div>
      )}
    </div>
  );
}

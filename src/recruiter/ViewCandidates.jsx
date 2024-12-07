import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import config from './../config';

export default function ViewCandidates() {
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
        const response = await axios.get(`${config.url}/recruiter/getCandidates?id=${recruiterData.id}`);
        setApplications(response.data);
      }
    } catch (error) {
      setError(error.message);
    }
  }, [recruiterData]); // Added recruiterData as a dependency

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]); // Safe to include fetchApplications here

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
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application) => (
                <tr key={application.id}>
                  <td>{application.id}</td>
                  <td>{application.jid}</td>
                  <td>{application.jtitle}</td>
                  <td>{application.sid}</td>
                  <td>{application.sname}</td>
                  <td>{application.date}</td>
                  <td>
                    <span
                      className={`myapplication-status myapplication-status-${application.status.toLowerCase()}`}
                    >
                      {application.status}
                    </span>
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

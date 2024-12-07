import axios from 'axios';
import { useEffect, useState } from 'react';
import config from './../config';

export default function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState('');
  const [studentdata, setStudentData] = useState(null);

  useEffect(() => {
    const storedStudentData = localStorage.getItem('student');
    if (storedStudentData) {
      const parsedStudentData = JSON.parse(storedStudentData);
      setStudentData(parsedStudentData);
    }
  }, []);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        if (studentdata) {
          const response = await axios.get(`${config.url}/student/myapplications?id=${studentdata.id}`);
          setApplications(response.data);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchApplications();
  }, [studentdata]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
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
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {applications.map(application => (
                <tr key={application.id}>
                  <td>{application.id}</td>
                  <td>{application.jid}</td>
                  <td>{application.jtitle}</td>
                  <td>{application.sid}</td>
                  <td>{application.sname}</td>
                  <td>{formatDate(application.date)}</td>
                  <td>
                    <span className={`myapplication-status myapplication-status-${application.status.toLowerCase()}`}>
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

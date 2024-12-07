import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import config from './../config';

export default function ViewResume() {
  const [student, setStudent] = useState(null);
  const [resumeUrl, setResumeUrl] = useState('');
  const [error, setError] = useState('');

  const fetchResume = useCallback(async (studentId) => {
    try {
      const response = await axios.get(`${config.url}/student/displayresume?id=${studentId}`, {
        responseType: 'blob', 
      });
      console.log(student)
      const url = URL.createObjectURL(response.data); 
      setResumeUrl(url); 
    } catch (error) {
      console.error('Error fetching resume:', error);
      setError('Failed to load resume.');
    }
  }, []); 

  
  useEffect(() => {
    const storedStudentData = localStorage.getItem('student');
    if (storedStudentData) {
      const parsedStudentData = JSON.parse(storedStudentData);
      setStudent(parsedStudentData);
      fetchResume(parsedStudentData.id); 
    }
  }, [fetchResume]); 

  return (
    <div>
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button 
          onClick={() => window.location.href = '/addresume'} // Replace with your routing logic
          className='resume-button'
        >
          Add Resume
        </button>
      </div>
      <br />
      <h3 style={{ alignContent: 'center' }}><u>View Resume</u></h3>
      {error && <h4 style={{ color: 'red', alignContent: 'center' }}>{error}</h4>}

      {resumeUrl ? (
        <div style={{ marginTop: '20px' }}>
          <h4>Resume:</h4>
          <iframe 
            src={resumeUrl} 
            width="100%" 
            height="600px" 
            title="Resume"
          ></iframe>
        </div>
      ) : (
        <h4 style={{ alignContent: 'center' }}>No resume available to display.</h4>
      )}
    </div>
  );
}

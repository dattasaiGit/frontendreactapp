import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import config from './../config';

export default function AddResume() {
  const [formData, setFormData] = useState({
    sid: '',
    resume: null,
  });

  const [student, setStudent] = useState(null);
  const fileInputRef = useRef(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [resumeUrl, setResumeUrl] = useState('');  // New state to store resume URL

  useEffect(() => {
    const storedStudentData = localStorage.getItem('student');
    if (storedStudentData) {
      const parsedStudentData = JSON.parse(storedStudentData);
      setStudent(parsedStudentData);
    }
  }, []);

  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('sid', student.id);  // Append student ID as @RequestParam
      formDataToSend.append('resume', formData.resume); // Append the resume file as @RequestParam

      const response = await axios.post(
        `${config.url}/student/addResume`, 
        formDataToSend, 
        {
          headers: {
            'Content-Type': 'multipart/form-data',  // Set the correct content type
          },
        }
      );

      if (response.status === 200) {
        setFormData({
          sid: '',
          resume: null,
        });
        fileInputRef.current.value = '';  // Clear the file input field
        setMessage(response.data);
        setError('');
        fetchResume(student.id);  // After upload, fetch the resume
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data);
      } else {
        setError('An unexpected error occurred.');
      }
      setMessage('');
    }
  };

  const fetchResume = async (studentId) => {
    try {
      const response = await axios.get(`${config.url}/student/displayresume?id=${studentId}`, {
        responseType: 'blob',  // Make sure to handle the response as a binary blob
      });

      const url = URL.createObjectURL(response.data);  // Create a URL for the PDF blob
      setResumeUrl(url);  // Set the URL in the state
    } catch (error) {
      console.error('Error fetching resume:', error);
      setError('Failed to load resume.');
    }
  };

  return (
    <div>
      <h3 style={{alignContent:'center'}}><u>Add Resume</u></h3>
      {message && <h4 style={{alignContent:'center'}}>{message}</h4>}
      {error && <h4 style={{ color: 'red', alignContent:'center' }}>{error}</h4>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className='add-student-form'>
          <label>Resume</label>
          <input 
            type="file" 
            name="resume" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            required 
          />
        <button type="submit">Add Resume</button>
        </div>
      </form>

      {/* Show the resume in an iframe if it exists */}
      {resumeUrl && (
        <div style={{ marginTop: '20px' }}>
          <h4>View Resume:</h4>
          <iframe 
            src={resumeUrl} 
            width="100%" 
            height="600px" 
            title="Resume" 
          ></iframe>
        </div>
      )}
    </div>
  );
}


import axios from 'axios';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import config from '../config';

export default function ViewJob() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');
  const [studentdata, setStudentData] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    const storedStudentData = localStorage.getItem('student');
    if (storedStudentData) {
      const parsedStudentData = JSON.parse(storedStudentData);
      setStudentData(parsedStudentData);
    }
  }, []);

  const applyJob = async (job) => {

    if (appliedJobs.includes(job.id)) {
      toast.info(`You have already applied for ${job.title}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    try {
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().split('T')[0];

      const response = await axios.post(`${config.url}/student/applyjob`, {
        jid: job.id,
        jtitle: job.title,
        sid: studentdata.id,
        sname: studentdata.name,
        rid: job.rid,
        date: formattedDate,
        skills: job.skills,
        status: 'Applied'
      });

      setAppliedJobs(prev => [...prev, job.id]);

      toast.success(`Successfully applied for ${job.title}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      toast.error(`Failed to apply: ${error.response?.data?.message || error.message}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  // Fetch jobs when student data is available
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        if (studentdata) {
          const response = await axios.get(`${config.url}/student/viewalljobs`);
          setJobs(response.data);
        }
      } catch (error) {
        toast.error(`Failed to fetch jobs: ${error.message}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setError(error.message);
      }
    };

    fetchJobs();
  }, [studentdata]);

  return (
    <div className="jobs-container">
      <h1 className="page-title">Job Listings</h1>
      <ToastContainer /> 
      {jobs.length > 0 ? (
        <div className="jobs-grid">
          {jobs.map((job) => (
            <div key={job.id} className="job-card1">
              <h2 className="job-title">{job.title}</h2>
              <div className="job-company">{job.company}</div>
              <span className={`job-status ${(job.status ? job.status.toLowerCase() : 'unknown')}`}>
                {job.status || 'Unknown'}
              </span>
              <div className="job-info">
                <div className="info-item">
                  <span className="info-label">Role:</span> {job.role}
                </div>
                <div className="info-item">
                  <span className="info-label">Location:</span> {job.location}
                </div>
                <div className="info-item">
                  <span className="info-label">Type:</span> {job.employmentType}
                </div>
                <div className="info-item">
                  <span className="info-label">Deadline:</span> {job.deadline}
                </div>
              </div>
              <div className="job-requirements">
                <div>
                  <span className="section-label">Requirements</span>
                  <p className="requirements-content">
                    {job.requirements.split('\n').map((requirement, index) => (
                      <span key={index}>
                        • {requirement.trim()}
                        <br />
                      </span>
                    ))}
                  </p>
                </div>
                <div className="skills-section">
                  <span className="section-label">Required Skills</span>
                  <div className="skills-container">
                    {Array.isArray(job.skills) ? (
                      job.skills.map((skill, index) => (
                        <span key={index} className="skill-tag">
                          {skill}
                        </span>
                      ))
                    ) : typeof job.skills === 'string' ? (
                      job.skills.split(',').map((skill, index) => (
                        <span key={index} className="skill-tag">
                          {skill.trim()}
                        </span>
                      ))
                    ) : null}
                  </div>
                </div>
              </div>
              <button
            className={`apply-button ${appliedJobs.includes(job.id) ? 'already-applied' : ''}`}
            onClick={() => applyJob(job)}
            disabled={appliedJobs.includes(job.id)}
            style={
              appliedJobs.includes(job.id)
                ? { cursor: 'not-allowed' }
                : {}
            }
          >
            {appliedJobs.includes(job.id) ? 'Already Applied' : 'Apply Now'}
          </button>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="loading">No Jobs found</div>
      )}
    </div>
  );
}

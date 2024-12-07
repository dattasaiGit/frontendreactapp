import axios from 'axios';
import { useEffect, useState } from 'react';
import config from '../config';

export default function ViewJob() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');
  const [studentdata, setStudentData] = useState(null);
  const [application, setApplication] = useState({
    jid: '',
    jtitle: '',
    sid: '',
    sname: '',
    rid: '',
    date: '',
    skills: '',
    status: ''
  });

  useEffect(() => {
    const storedStudentData = localStorage.getItem('student');
    if (storedStudentData) {
      const parsedStudentData = JSON.parse(storedStudentData);
      setStudentData(parsedStudentData);
    }
  }, []);

  const applyJob = async (id) => {
    try {
      const job = await axios.get(`${config.url}/student/getjob?id=${id}`);
      const jobData = job.data;

      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().split('T')[0];  
      console.log(setApplication)

      await axios.post(`${config.url}/student/applyjob`, {
        ...application,
        jid: id,
        jtitle: jobData.title,
        sid: studentdata.id,
        sname: studentdata.name,
        rid: jobData.rid,
        date: formattedDate,  // Use formatted date
        skills: jobData.skills,
        status: 'Applied'
      });
      
    } catch (error) {
      setError(error.message);
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
        setError(error.message);
      }
    };

    fetchJobs();
  }, [studentdata]);

  return (
    <div className="jobs-container">
      <h1 className="page-title">Job Listings</h1>
      {jobs.length > 0 ? (
        <div className="jobs-grid">
          {jobs.map((job) => (
            <div key={job.id} className="job-card">
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
                {/* Requirements Section */}
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
className="apply-button"
onClick={() => applyJob(job.id)}
>
Apply Now
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
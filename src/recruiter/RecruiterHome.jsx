import { useState, useEffect } from 'react';
import './recruiter.css'; 
export default function RecruiterHome() {
  const [recruiterName, setRecruiterName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const recruiterData = localStorage.getItem('recruiter'); 

    if (recruiterData) {
      const { name, company } = JSON.parse(recruiterData);
      setRecruiterName(name);
      setCompanyName(company);
      setLoading(false); 
    } else {
      setError('No recruiter data found in localStorage.');
      setLoading(false); 
    }
  }, []); 

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>; 
  }

  return (
    <div className="recruiter-home">
      
      <section className="welcome-section">
        <h1>
          Welcome, <span id="recruiter-name">{recruiterName}</span>
        </h1>
      </section>

   
      <section className="dashboard-section">
        <h2>Quick Overview</h2>
        <div className="dashboard-cards">
          <div className="dashboard-card">
            <h3>Total Applications</h3>
            <span className="material-symbols-outlined">assignment_ind</span>
            <p>152 Applications</p>
          </div>
          <div className="dashboard-card">
            <h3>Jobs Posted</h3>
            <span className="material-symbols-outlined">work</span>
            <p>5 Active Jobs</p>
          </div>
          <div className="dashboard-card">
            <h3>Reviewed Applications</h3>
            <span className="material-symbols-outlined">task_alt</span>
            <p>89 Reviewed</p>
          </div>
          <div className="dashboard-card">
            <h3>Shortlisted Candidates</h3>
            <span className="material-symbols-outlined">groups</span>
            <p>45 Candidates</p>
          </div>
        </div>
      </section>

     
      <section className="featured-jobs-section">
        <h2>Manage Your Job Postings</h2>
        <div className="job-cards">
          <div className="job-card">
            <h3>Software Engineer - {companyName}</h3>
            <p>Location: Bangalore, India</p>
            <p>Applications: 75</p>
            <a href="#" className="btn-manage">View Applications</a>
          </div>
          <div className="job-card">
            <h3>UX Designer - {companyName}</h3>
            <p>Location: Hyderabad, India</p>
            <p>Applications: 42</p>
            <a href="#" className="btn-manage">View Applications</a>
          </div>
          <div className="job-card">
            <h3>Data Analyst - {companyName}</h3>
            <p>Location: Noida, India</p>
            <p>Applications: 35</p>
            <a href="#" className="btn-manage">View Applications</a>
          </div>
        </div>
      </section>
    </div>
  );
}

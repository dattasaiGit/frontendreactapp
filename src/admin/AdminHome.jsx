import { useEffect, useState } from 'react';

export default function AdminHome() {
  const [studentCount, setStudentCount] = useState(0);
  const [companyCount, setCompanyCount] = useState(0);
  const [jobCount, setJobCount] = useState(0);
  const [applicationCount, setApplicationCount] = useState(0);
  const [placedCount, setPlacedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const studentResponse = await fetch('http://localhost:2030/admin/studentcount');
        const studentData = await studentResponse.json();
        setStudentCount(studentData);

        const companyResponse = await fetch('http://localhost:2030/admin/recruitercount');
        const companyData = await companyResponse.json();
        setCompanyCount(companyData);

        const jobResponse = await fetch('http://localhost:2030/admin/jobcount');
        const jobData = await jobResponse.json();
        setJobCount(jobData);

        const applicationResponse = await fetch('http://localhost:2030/admin/applicationscount');
        const applicationData = await applicationResponse.json();
        setApplicationCount(applicationData);

        const placedResponse = await fetch('http://localhost:2030/admin/placedcount');
        const placedData = await placedResponse.json();
        setPlacedCount(placedData);

        const pendingResponse = await fetch('http://localhost:2030/admin/pendingcount');
        const pendingData = await pendingResponse.json();
        setPendingCount(pendingData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="admin-dashboard-container">
      <div className="admin-dashboard-card">
        <span className="material-symbols-outlined admin-card-icon">school</span>
        <div className="admin-card-title">Total Students Registered</div>
        <div className="admin-card-number">{studentCount}</div>
      </div>

      <div className="admin-dashboard-card">
        <span className="material-symbols-outlined admin-card-icon">business</span>
        <div className="admin-card-title">Total Companies Registered</div>
        <div className="admin-card-number">{companyCount}</div>
      </div>

      <div className="admin-dashboard-card">
        <span className="material-symbols-outlined admin-card-icon">work</span>
        <div className="admin-card-title">Active Placements</div>
        <div className="admin-card-number">{jobCount}</div>
      </div>

      <div className="admin-dashboard-card">
        <span className="material-symbols-outlined admin-card-icon">event</span>
        <div className="admin-card-title">Total Applications</div>
        <div className="admin-card-number">{applicationCount}</div>
      </div>

      <div className="admin-dashboard-card">
        <span className="material-symbols-outlined admin-card-icon">emoji_events</span>
        <div className="admin-card-title">Placed Students</div>
        <div className="admin-card-number">{placedCount}</div>
      </div>

      <div className="admin-dashboard-card">
        <span className="material-symbols-outlined admin-card-icon">pending</span>
        <div className="admin-card-title">Pending Applications</div>
        <div className="admin-card-number">{pendingCount}</div>
      </div>
    </div>
  );
}

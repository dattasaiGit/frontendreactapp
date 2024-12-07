import  { useState } from 'react';
import { 
  Bell, 
  Users, 
  Building2, 
  Calendar, 
  Briefcase,
} from 'lucide-react';

function PlacementHome() {
  const [stats] = useState({
    totalStudents: 450,
    companiesVisited: 28,
    upcomingDrives: 5,
    placedStudents: 320,
    averagePackage: "8.5 LPA",
    highestPackage: "24 LPA"
  });

  const [recentNotifications] = useState([
    { id: 1, title: "Google Drive Update", time: "2 hours ago" },
    { id: 2, title: "Microsoft Shortlist Released", time: "5 hours ago" },
    { id: 3, title: "Amazon Drive Registration Open", time: "1 day ago" },
  ]);

  const [upcomingDrives] = useState([
    { id: 1, company: "Adobe", date: "25th Nov", role: "SDE", package: "18 LPA" },
    { id: 2, company: "Morgan Stanley", date: "28th Nov", role: "Analyst", package: "15 LPA" },
    { id: 3, company: "Deloitte", date: "1st Dec", role: "Consultant", package: "12 LPA" },
  ]);

  return (
    <div className="po-dashboard">
      <div className="po-dashboard__header">
        <h1 className="po-dashboard__title">Welcome, Placement Officer</h1>
      </div>

      <div className="po-stats-grid">
        <div className="po-stats-card">
          <div className="po-stats-card__content">
            <Users className="po-stats-card__icon po-stats-card__icon--blue" />
            <div className="po-stats-card__info">
              <p className="po-stats-card__label">Total Students</p>
              <h3 className="po-stats-card__value">{stats.totalStudents}</h3>
            </div>
          </div>
        </div>

        <div className="po-stats-card">
          <div className="po-stats-card__content">
            <Building2 className="po-stats-card__icon po-stats-card__icon--green" />
            <div className="po-stats-card__info">
              <p className="po-stats-card__label">Companies Visited</p>
              <h3 className="po-stats-card__value">{stats.companiesVisited}</h3>
            </div>
          </div>
        </div>

        <div className="po-stats-card">
          <div className="po-stats-card__content">
            <Briefcase className="po-stats-card__icon po-stats-card__icon--purple" />
            <div className="po-stats-card__info">
              <p className="po-stats-card__label">Students Placed</p>
              <h3 className="po-stats-card__value">{stats.placedStudents}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="po-main-content">
        {/* Notifications Section */}
        <div className="po-notifications">
          <div className="po-section-header">
            <h2 className="po-section-header__title">Recent Notifications</h2>
            <Bell className="po-section-header__icon" />
          </div>
          <div className="po-notifications__list">
            {recentNotifications.map(notification => (
              <div key={notification.id} className="po-notification-item">
                <p className="po-notification-item__title">{notification.title}</p>
                <p className="po-notification-item__time">{notification.time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Drives Section */}
        <div className="po-drives">
          <div className="po-section-header">
            <h2 className="po-section-header__title">Upcoming Drives</h2>
            <Calendar className="po-section-header__icon" />
          </div>
          <div className="po-drives__table-container">
            <table className="po-drives__table">
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Date</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {upcomingDrives.map(drive => (
                  <tr key={drive.id}>
                    <td>{drive.company}</td>
                    <td>{drive.date}</td>
                    <td>{drive.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlacementHome;
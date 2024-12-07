
export default function AdminHome() {
  return (
    <div className="admin-dashboard-container">
      <div className="admin-dashboard-card ">
        <span className="material-symbols-outlined admin-card-icon">school</span>
        <div className="admin-card-title">Total Students Registered</div>
        <div className="admin-card-number">2,450</div>
      </div>

      <div className="admin-dashboard-card">
        <span className="material-symbols-outlined admin-card-icon">business</span>
        <div className="admin-card-title">Total Companies Registered</div>
        <div className="admin-card-number">180</div>
      </div>

      <div className="admin-dashboard-card ">
        <span className="material-symbols-outlined admin-card-icon">work</span>
        <div className="admin-card-title">Active Placements</div>
        <div className="admin-card-number">12</div>
      </div>

      <div className="admin-dashboard-card ">
        <span className="material-symbols-outlined admin-card-icon">event</span>
        <div className="admin-card-title">Upcoming Placement Drives</div>
        <div className="admin-card-number">5</div>
      </div>

      <div className="admin-dashboard-card ">
        <span className="material-symbols-outlined admin-card-icon">emoji_events</span>
        <div className="admin-card-title">Placed Students</div>
        <div className="admin-card-number">1,320</div>
      </div>

      <div className="admin-dashboard-card ">
        <span className="material-symbols-outlined admin-card-icon">pending</span>
        <div className="admin-card-title">Pending Applications</div>
        <div className="admin-card-number">340</div>
      </div>
    </div>
  );
}

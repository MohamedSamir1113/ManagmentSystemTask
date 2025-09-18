import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import UsersChart from '../UsersChart/UsersChart';
import styles from './Home.module.css';

export default function Home() {
  const { users } = useUser();
  const navigate = useNavigate();

  // Calculate dashboard statistics
  const totalUsers = users.length;
  const recentUsers = users.filter(user => {
    // Assuming users added in last 7 days (mock logic)
    const userDate = new Date(user.birthDate || Date.now());
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return userDate > weekAgo;
  }).length;

  // Calculate age statistics
  const averageAge = users.length > 0 
    ? Math.round(users.reduce((sum, user) => sum + (user.age || 0), 0) / users.length)
    : 0;

  // Get most common domain from emails
  const emailDomains = users.reduce((domains, user) => {
    if (user.email) {
      const domain = user.email.split('@')[1];
      domains[domain] = (domains[domain] || 0) + 1;
    }
    return domains;
  }, {});

  const topDomain = Object.keys(emailDomains).reduce((a, b) => 
    emailDomains[a] > emailDomains[b] ? a : b, 'gmail.com'
  );

  // Quick action handlers
  const handleQuickAdd = () => {
    navigate('/dashboard/user-data');
  };

  const handleViewUsers = () => {
    navigate('/dashboard/users');
  };

  return (
    <div className="container py-4">
      {/* Dashboard Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">📊 Dashboard</h2>
          <p className="text-muted mb-0">Welcome to your User Management System</p>
        </div>
        <div className="d-flex gap-2">
          <button 
            className="btn btn-outline-primary"
            onClick={handleViewUsers}
          >
            <i className="fa-solid fa-users me-2"></i>
            View All Users
          </button>
          <button 
            className="btn btn-warning text-white"
            onClick={handleQuickAdd}
          >
            <i className="fa-solid fa-plus me-2"></i>
            Add New User
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="row mb-4">
        <div className="col-md-3 col-sm-6 mb-3">
          <div className={`${styles.statCard} ${styles.primary}`}>
            <div className="d-flex align-items-center">
              <div className={`${styles.iconWrapper} ${styles.primary}`}>
                <i className="fa-solid fa-users"></i>
              </div>
              <div className="ms-3">
                <h3 className="mb-0">{totalUsers}</h3>
                <p className="mb-0 text-muted">Total Users</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3 col-sm-6 mb-3">
          <div className={`${styles.statCard} ${styles.success}`}>
            <div className="d-flex align-items-center">
              <div className={`${styles.iconWrapper} ${styles.success}`}>
                <i className="fa-solid fa-user-plus"></i>
              </div>
              <div className="ms-3">
                <h3 className="mb-0">{recentUsers}</h3>
                <p className="mb-0 text-muted">Recent Users</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3 col-sm-6 mb-3">
          <div className={`${styles.statCard} ${styles.warning}`}>
            <div className="d-flex align-items-center">
              <div className={`${styles.iconWrapper} ${styles.warning}`}>
                <i className="fa-solid fa-calendar"></i>
              </div>
              <div className="ms-3">
                <h3 className="mb-0">{averageAge}</h3>
                <p className="mb-0 text-muted">Avg Age</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3 col-sm-6 mb-3">
          <div className={`${styles.statCard} ${styles.info}`}>
            <div className="d-flex align-items-center">
              <div className={`${styles.iconWrapper} ${styles.info}`}>
                <i className="fa-solid fa-envelope"></i>
              </div>
              <div className="ms-3">
                <h3 className="mb-0">{topDomain}</h3>
                <p className="mb-0 text-muted">Top Domain</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="fa-solid fa-chart-bar me-2"></i>
                User Analytics
              </h5>
            </div>
            <div className="card-body">
              <UsersChart />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="row mt-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="fa-solid fa-bolt me-2"></i>
                Quick Actions
              </h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-4 mb-3">
                  <div className="d-grid">
                    <button 
                      className="btn btn-outline-primary"
                      onClick={handleQuickAdd}
                    >
                      <i className="fa-solid fa-user-plus me-2"></i>
                      Add New User
                    </button>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="d-grid">
                    <button 
                      className="btn btn-outline-success"
                      onClick={handleViewUsers}
                    >
                      <i className="fa-solid fa-list me-2"></i>
                      View All Users
                    </button>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="d-grid">
                    <button 
                      className="btn btn-outline-info"
                      onClick={() => navigate('/dashboard/profile')}
                    >
                      <i className="fa-solid fa-user me-2"></i>
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

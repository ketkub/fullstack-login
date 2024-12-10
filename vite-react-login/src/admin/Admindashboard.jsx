import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import '../css/dashboard.css';

const Admindashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      setError(null);
    } else {
      setIsAuthenticated(false);
      setError('กรุณาเข้าสู่ระบบ');
    }
  }, []);

  if (!isAuthenticated) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <Sidebar />

      {/* Dashboard Content */}
      <Dashboard />
    </div>
  );
};

const Dashboard = () => {
  const [stats, setStats] = useState({ users: 0, companies: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('http://localhost:3000/admin/stats');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="dashboard">
      <h1 className='name-dashboard'>Admin Dashboard</h1>
      <div className="stats">
        <div className="stat-box">
          <h2 className='status'>Users</h2>
          <p>{stats.users}</p>
        </div>
        <div className="stat-box">
          <h2 className='status'>Companies</h2>
          <p>{stats.companies}</p>
        </div>
      </div>
    </div>
  );
};

export default Admindashboard;

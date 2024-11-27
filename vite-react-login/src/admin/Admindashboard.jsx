import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import '../css/dashboard.css';

const Admindashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // ตรวจสอบ token จาก localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // ถ้ามี token สามารถแสดง Dashboard ได้
      setIsAuthenticated(true);
      setError(null);
    } else {
      // ถ้าไม่มี token แสดงข้อความผิดพลาด
      setIsAuthenticated(false);
      setError('กรุณาเข้าสู่ระบบ');
    }
  }, []);

  if (!isAuthenticated) {
    return <div className="auth-error">{error}</div>; // เปลี่ยนชื่อ class name เป็น auth-error
  }

  return (
    <div className="admin-dashboard-container"> {/* เปลี่ยนชื่อ class name */}
      <Sidebar /> {/* เพิ่ม Sidebar เข้าไป */}
      <div className="admin-dashboard-content"> {/* เปลี่ยนชื่อ class name */}
        <h1>Welcome to the Admin Dashboard</h1>
        <div className="dashboard-cards-container"> {/* เปลี่ยนชื่อ class name */}
          <div className="dashboard-card">
            <h2>Total Promotions</h2>
            <p>10</p> {/* สามารถเปลี่ยนตัวเลขได้จากข้อมูลที่ได้มา */}
          </div>
          <div className="dashboard-card">
            <h2>Total Users</h2>
            <p>200</p> {/* สามารถเปลี่ยนตัวเลขได้จากข้อมูลที่ได้มา */}
          </div>
          <div className="dashboard-card">
            <h2>Total Sales</h2>
            <p>$5,000</p> {/* สามารถเปลี่ยนตัวเลขได้จากข้อมูลที่ได้มา */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admindashboard;

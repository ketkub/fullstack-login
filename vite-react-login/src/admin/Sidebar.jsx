import React from 'react';
import { FaHome, FaUpload } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Admin</h2>
      <ul className="sidebar-menu">
        <li className="menu-item">
          <FaHome className="icon" />
          <Link to="/">Home</Link>
        </li>
        <li className="menu-item">
          <FaUpload className="icon" />
          <Link to="/upload-promotion">Upload Promotion</Link>
        </li>
        <li>
              <button onClick={handleLogout} className="logout-button">ออกจากระบบ</button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;

import { FaHome, FaUpload } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Sidebar.css';

function Sidebar() {
  const navigate = useNavigate();

  // ฟังก์ชันออกจากระบบ
  const handleLogout = () => {
    localStorage.removeItem('token'); // ลบ token ที่เก็บไว้
    navigate('/login'); // เปลี่ยนเส้นทางไปที่หน้า login
  };

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Admin Panel</h2>
      <ul className="sidebar-menu">
        <li className="menu-item">
          <Link to="/Admindashboard" className="menu-link">
            <FaHome className="icon" />
            <span>Home</span>
          </Link>
        </li>
        <li className="menu-item">
          <Link to="/UploadPromotion" className="menu-link">
            <FaUpload className="icon" />
            <span>Upload Promotion</span>
          </Link>
        </li>
        <li className="menu-item">
          <Link to="/AdminCompanyCRUD" className="menu-link">
            <FaUpload className="icon" />
            <span>CRUD company</span>
          </Link>
        </li>
        <li className="logout-button-admin">
          <button onClick={handleLogout} className="logout-button-admin">
            ออกจากระบบ
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;

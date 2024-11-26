import { Link, useNavigate } from 'react-router-dom';
import '../css/navbar.css';

function AdminNavbar() {
  const navigate = useNavigate(); // ใช้ useNavigate เพื่อเปลี่ยนเส้นทาง

  const handleLogout = () => {
    // ลบ token จาก localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('role'); // ถ้ามี role ก็ลบด้วย
    navigate('/login'); // เปลี่ยนเส้นทางไปยังหน้าเข้าสู่ระบบ
  };

  return (
    <nav className="admin-navbar">
      <ul>
        <li>
          <Link to="/admin/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/ManagePublicity">Manage Publicity</Link>
        </li>
        <li>
          <Link to="/admin/manage-users">Manage Users</Link>
        </li>
        <li>
          <button onClick={handleLogout} className="logout-button">ออกจากระบบ</button> {/* ปุ่ม Log Out */}
        </li>
      </ul>
    </nav>
  );
}

export default AdminNavbar;
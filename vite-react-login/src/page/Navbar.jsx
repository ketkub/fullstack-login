import { Link, useNavigate } from 'react-router-dom';
import '../css/navbar.css';
function Navbar() {
  const navigate = useNavigate(); // ใช้ useNavigate เพื่อเปลี่ยนเส้นทาง

  const handleLogout = () => {
    // ลบ token จาก localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('role'); // ถ้ามี role ก็ลบด้วย
    navigate('/login'); // เปลี่ยนเส้นทางไปยังหน้าเข้าสู่ระบบ
  };
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">MyApp</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">โปรไฟล์</Link>
        </li>
        <li>
          <button onClick={handleLogout} className="logout-button">ออกจากระบบ</button> {/* ปุ่ม Log Out */}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
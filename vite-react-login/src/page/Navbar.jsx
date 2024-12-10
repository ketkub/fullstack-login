import { useState, useEffect } from 'react'; // Import useState and useEffect
import { Link, useNavigate } from 'react-router-dom';
import '../css/navbar.css'; // ใช้ CSS สำหรับสไตล์

const Navbar = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // ตรวจสอบสถานะการเข้าสู่ระบบจาก token ใน localStorage
  const isLoggedIn = localStorage.getItem('token') !== null;

  const handleLogout = () => {
    // ลบ token และ role จาก localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/'); // เปลี่ยนเส้นทางไปยังหน้าเข้าสู่ระบบ
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('');
      setLoading(false);
      return;
    }
    setLoading(false); // Mark loading as false once token check is complete
  }, []);

  if (loading) return <p>Loading...</p>; // Show loading until token check is complete

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">MyApp</Link> {/* โลโก้หรือลิงก์หน้าหลัก */}
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">หน้าหลัก</Link>
        </li>
        <li>
          <Link to="/companies">บริษัท</Link>
        </li>
        {/* แสดงเมนูแตกต่างกันตามสถานะการเข้าสู่ระบบ */}
        {isLoggedIn ? (
          <>
            <li>
              <Link to="/profile">โปรไฟล์</Link> {/* ลิงก์ไปยังหน้าโปรไฟล์ */}
            </li>
            <li>
              <button onClick={handleLogout} className="logout-button">ออกจากระบบ</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/signup" className="nav-links signup">ลงทะเบียน</Link>
            </li>
            <li>
              <Link to="/login" className="nav-links login">เข้าสู่ระบบ</Link> {/* ปุ่มเข้าสู่ระบบ */}
            </li>
          </>
        )}
      </ul>
      {error && <p>{error}</p>} {/* Show error if exists */}
    </nav>
  );
};

export default Navbar;

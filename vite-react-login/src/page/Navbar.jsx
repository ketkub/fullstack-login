import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/navbar.css'; // ใช้ CSS สำหรับสไตล์

const Navbar = () => {
  const navigate = useNavigate();

  // ตรวจสอบสถานะการเข้าสู่ระบบจาก token ใน localStorage
  const isLoggedIn = localStorage.getItem('token') !== null;

  const handleLogout = () => {
    // ลบ token และ role จาก localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login'); // เปลี่ยนเส้นทางไปยังหน้าเข้าสู่ระบบ
  };

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
          <Link to="/data">คลังข้อมูล</Link>
        </li>
        <li>
          <Link to="/stats">สถิติ</Link>
        </li>
        <li>
          <Link to="/search">ค้นหาข้อมูล</Link>
        </li>
        <li>
          <Link to="/faq">คำถามที่พบบ่อย</Link>
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
              <Link to="/register" className="nav-links signup">ลงทะเบียน</Link>
            </li>
            <li>
              <Link to="/login" className="nav-links login">เข้าสู่ระบบ</Link> {/* ปุ่มเข้าสู่ระบบ */}
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

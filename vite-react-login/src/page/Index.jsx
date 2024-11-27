import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/index.css';
import Navbar from './Navbar';

const Index = () => {
  const [isAdVisible, setIsAdVisible] = useState(true);
  const [promotions, setPromotions] = useState([]);
  const [isLogin, setIsLogin] = useState(false); // ใช้เพื่อเช็คสถานะการล็อกอิน

  useEffect(() => {
    // ฟังก์ชันในการดึงข้อมูลโปรโมชั่น
    const fetchPromotions = async () => {
      try {
        const res = await fetch('http://localhost:3000/promotions');
        const data = await res.json();
        if (data.status === 'ok') {
          setPromotions(data.promotions);
        }
      } catch (err) {
        console.error('Error fetching promotions:', err);
      }
    };

    // ฟังก์ชันในการตรวจสอบสถานะการล็อกอิน
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token');
      setIsLogin(!!token);  // ถ้ามี token ให้ถือว่าล็อกอินแล้ว
    };

    // เรียกใช้ฟังก์ชัน
    checkLoginStatus();
    fetchPromotions();
  }, []);

  // ฟังก์ชันสำหรับปิดป๊อปอัพ
  const closeAd = () => setIsAdVisible(false);

  return (
    <div>
      {/* เรียก Navbar ให้อยู่ในโครงสร้าง JSX */}
      <Navbar />

      {/* ป๊อปอัพโปรโมชั่น */}
      {isAdVisible && promotions.length > 0 && isLogin && ( // แสดงป๊อปอัพหากผู้ใช้ล็อกอินแล้ว
        <div className="ad-popup-overlay">
          <div className="ad-popup-content">
            <span className="close-ad" onClick={closeAd}>
              &times;
            </span>
            <img
              src={promotions[0].image}
              alt="Promotion"
              className="ad-image"
            />
          </div>
        </div>
      )}

      <div className="index-container">
        <header className="hero-section">
          <div className="hero-content">
            <h1>ระบบฝึกสหกิจศึกษา</h1>
            <p>
              ยินดีต้อนรับสู่ระบบฝึกสหกิจศึกษา ที่ช่วยให้นักศึกษาและสถานประกอบการสามารถจัดการข้อมูลและติดต่อประสานงานได้สะดวกและง่ายยิ่งขึ้น
            </p>
          </div>
        </header>

        <section className="features-section">
          <h2>ฟีเจอร์หลักของระบบ</h2>
          <div className="features">
            <div className="feature">
              <h3>จัดการโปรไฟล์นักศึกษา</h3>
              <p>นักศึกษาสามารถบันทึกข้อมูลส่วนตัวและติดตามสถานะการฝึกงานได้</p>
            </div>
            <div className="feature">
              <h3>ค้นหาและจับคู่งาน</h3>
              <p>ช่วยให้สถานประกอบการและนักศึกษาสามารถค้นหาและจับคู่โอกาสการฝึกงานที่เหมาะสม</p>
            </div>
            <div className="feature">
              <h3>ระบบติดตามและประเมินผล</h3>
              <p>ติดตามผลการฝึกงานและประเมินผลได้สะดวกผ่านระบบออนไลน์</p>
            </div>
          </div>
        </section>

        <footer className="footer">
          <p>&copy; {new Date().getFullYear()} ระบบฝึกสหกิจศึกษา | All Rights Reserved</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;

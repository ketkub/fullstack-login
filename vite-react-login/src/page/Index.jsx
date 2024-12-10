import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../css/index.css';

const Index = () => {
    const [isAdVisible, setIsAdVisible] = useState(true);
    const [promotions, setPromotions] = useState([]);
    const [isLogin, setIsLogin] = useState(false);

    // Function to fetch promotions
    useEffect(() => {
        const fetchPromotions = async () => {
            try {
                const response = await fetch('http://localhost:3000/promotions');
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                if (data.status === 'ok') {
                    setPromotions(data.promotions);
                } else {
                    console.warn('Unexpected response status:', data.status);
                }
            } catch (error) {
                console.error('Error fetching promotions:', error.message);
            }
        };

        const checkLoginStatus = () => {
            const token = localStorage.getItem('token');
            setIsLogin(Boolean(token)); // แปลง token เป็น true/false
        };

        // Reset the ad popup if logged in
        if (isLogin) {
            sessionStorage.removeItem('adClosed'); // Clear the ad status when logged in
        }

        // Check if the ad was already closed in the session
        const adStatus = sessionStorage.getItem('adClosed');
        if (adStatus === 'true') {
            setIsAdVisible(false); // Don't show the ad if it was closed before
        }

        checkLoginStatus();
        fetchPromotions();
    }, [isLogin]); // Fetch promotions again and check login status on login change

    // Close the ad and store the status in sessionStorage
    const closeAd = () => {
        setIsAdVisible(false);
        sessionStorage.setItem('adClosed', 'true'); // Store the ad closed status in sessionStorage
    };

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove the token
        sessionStorage.clear(); // Clear all sessionStorage data
        setIsLogin(false); // Set login status to false
    };

    return (
        <div>
            {/* Navbar */}
            <Navbar onLogout={handleLogout} />

            {/* Promotion Popup */}
            {isAdVisible && promotions.length > 0 && isLogin && (
                <div className="ad-popup-overlay">
                    <div className="ad-popup-content">
                        <button className="close-ad" onClick={closeAd} aria-label="Close advertisement"> &times; </button>
                        <img src={promotions[0]?.image} alt="Promotion" className="ad-image" />
                    </div>
                </div>
            )}

            <div className="index-container">
                <header className="hero-section">
                    <div className="hero-content">
                        <h1>ระบบฝึกสหกิจศึกษา</h1>
                        <p>ยินดีต้อนรับสู่ระบบฝึกสหกิจศึกษา ที่ช่วยให้นักศึกษาและสถานประกอบการสามารถจัดการข้อมูลและติดต่อประสานงานได้สะดวกและง่ายยิ่งขึ้น</p>
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

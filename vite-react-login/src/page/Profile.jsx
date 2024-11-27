import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../css/profile.css';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [promotions, setPromotions] = useState([]);
    const [isAdVisible, setIsAdVisible] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                const res = await fetch('http://localhost:3000/profile', {
                    method: 'GET',
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await res.json();
                if (data.status === 'ok') setUser(data.user);
            } catch (err) {
                console.error('Error fetching user data:', err);
            }
        };

        const fetchPromotions = async () => {
            try {
                const res = await fetch('http://localhost:3000/promotions');
                const data = await res.json();
                if (data.status === 'ok') setPromotions(data.promotions);
            } catch (err) {
                console.error('Error fetching promotions:', err);
            }
        };

        fetchUserData();
        fetchPromotions();
    }, []);

    const closeAd = () => setIsAdVisible(false);

    return (
        <div className="profile-page">
            <Navbar />

            {/* ป๊อปอัพโปรโมชั่น */}
            {isAdVisible && promotions.length > 0 && (
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

            {/* ข้อมูลโปรไฟล์ */}
            <div className="profile-container">
                {user ? (
                    <div className="profile-details">
                        <h2>{user.fname} {user.lname}</h2>
                        <p>Email: {user.email}</p>
                        <p>Phone: {user.phone}</p> {/* สมมุติว่ามีข้อมูลเบอร์โทร */}
                        <button className="edit-profile-btn">Edit Profile</button> {/* ปุ่มสำหรับแก้ไขโปรไฟล์ */}
                    </div>
                ) : (
                    <p>Loading profile...</p>
                )}
            </div>
        </div>
    );
};

export default Profile;

import { useState, useEffect } from 'react';

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
        <div>
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
            {user ? (
                <div className="profile-container">
                    <h2>{user.fname} {user.lname}</h2>
                    <p>Email: {user.email}</p>
                </div>
            ) : (
                <p>Loading profile...</p>
            )}
        </div>
    );
};

export default Profile;

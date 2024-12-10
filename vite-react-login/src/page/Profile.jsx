import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import '../css/profile.css';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('กรุณาเข้าสู่ระบบ');
            setLoading(false);
            navigate('/login'); // Redirect to login if not authenticated
            return;
        }

        const fetchUserData = async () => {
            try {
                const res = await fetch('http://localhost:3000/profile', {
                    method: 'GET',
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!res.ok) {
                    throw new Error('ไม่สามารถดึงข้อมูลผู้ใช้ได้');
                }

                const data = await res.json();
                setUser(data.user || data); // Use `data.user` if API returns nested structure
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear token
        navigate('/login'); // Redirect to login page
    };

    if (loading) return <p className="loading-message">กำลังโหลด...</p>;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <div className="profile-page">
            <Navbar onLogout={handleLogout} />
            <div className="profile-container">
                {user ? (
                    <div className="profile-details">
                        <h2>{user.fname} {user.lname}</h2>
                        <p>Email: {user.email}</p>
                        <p>Phone: {user.phone}</p>
                        <button
                            className="edit-profile-btn"
                            onClick={() => navigate('/edit-profile')}
                        >
                            แก้ไขข้อมูลส่วนตัว
                        </button>
                    </div>
                ) : (
                    <p>ไม่พบข้อมูลผู้ใช้</p>
                )}
            </div>
        </div>
    );
};

export default Profile;

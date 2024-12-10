import { useState, useEffect } from 'react';
import '../css/uploads.css';
import Sidebar from './Sidebar';

const UploadPromotion = () => {
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Add state for authentication
    const [authError, setAuthError] = useState(null); // Add state for authentication error

    // Check if the user is authenticated
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
            setAuthError(null);
        } else {
            setIsAuthenticated(false);
            setAuthError('กรุณาเข้าสู่ระบบ');
        }
    }, []); // Run only once when the component mounts

    // Handle image file change
    const handleImageChange = (e) => setImage(e.target.files[0]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image) {
            setError('กรุณาเลือกไฟล์รูปภาพ');
            return;
        }

        const formData = new FormData();
        formData.append('image', image);

        const token = localStorage.getItem('token');
        if (!token) {
            setError('Token การเข้าสู่ระบบสูญหาย');
            return;
        }

        try {
            setLoading(true);
            const response = await fetch('http://localhost:3000/promotions', {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });

            const data = await response.json();
            setLoading(false);

            if (response.ok) {
                alert('เพิ่มโปรโมชั่นสำเร็จ');
            } else {
                setError(data.message || 'เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ');
            }
        } catch (err) {
            setLoading(false);
            setError('Error uploading image: ' + err.message);
        }
    };

    if (!isAuthenticated) {
        return <div>{authError}</div>; // Display authentication error if not logged in
    }

    return (
        <div>
            <Sidebar />
            <h1 className='h1-uploads'>Upload Promotion Image</h1>
            <form className='form-upload' onSubmit={handleSubmit}>
                <div>
                    <label className='label-uploads' htmlFor="image">Image:</label>
                    <input className='input-uploads' type="file" id="image" onChange={handleImageChange} />
                </div>
                {error && <p className='p-up' style={{ color: 'red' }}>{error}</p>}
                <button className="button-upload" type="submit" disabled={loading}>
                    {loading ? 'Uploading...' : 'Upload'}
                </button>
            </form>
        </div>
    );
};

export default UploadPromotion;

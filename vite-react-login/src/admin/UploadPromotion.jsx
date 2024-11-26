import { useState } from 'react';
import AdminNavbar from './AdminNavbar';

const UploadPromotion = () => {
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e) => setImage(e.target.files[0]);

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

    return (
        <div>
            <AdminNavbar />
            <h1>Upload Promotion Image</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="image">Image:</label>
                    <input type="file" id="image" onChange={handleImageChange} />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit" disabled={loading}>
                    {loading ? 'Uploading...' : 'Upload'}
                </button>
            </form>
        </div>
    );
};

export default UploadPromotion;

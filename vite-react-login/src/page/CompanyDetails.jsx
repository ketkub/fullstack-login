import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar'; // ต้องเพิ่ม Navbar
import '../css/company.css';

const CompanyDetails = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      const token = localStorage.getItem('token'); // Get token from localStorage

      if (!token) {
        setError('กรุณาเข้าสู่ระบบ');
        navigate('/login'); // Redirect to login page if not authenticated
        return;
      }

      try {
        const response = await fetch(`http://localhost:3000/companies/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in the Authorization header
          },
        });

        if (!response.ok) {
          const errorMessage =
            response.status === 404
              ? 'ไม่พบข้อมูลบริษัท'
              : 'เกิดข้อผิดพลาดในการโหลดรายละเอียดบริษัท';
          throw new Error(errorMessage);
        }

        const data = await response.json();
        setCompany(data.company || data); // Use `data.company` if API returns nested structure
      } catch (error) {
        setError(error.message);
        console.error('Error fetching company details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyDetails();
  }, [id, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token
    navigate('/login'); // Redirect to login page
  };

  const applyForCompany = () => {
    alert(`คุณได้เลือกบริษัท "${company?.name}" เรียบร้อยแล้ว`);
    navigate('/companies'); // Redirect back to the companies list
  };

  if (loading) return <p className="loading-message">กำลังโหลด...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <>
      <Navbar onLogout={handleLogout} />
      <div className="company-details-container">
        <h1>{company.name}</h1>
        <img
          src={company.logo || 'https://via.placeholder.com/300'}
          alt={company.name}
          className="company-logo-large"
        />
        <p>{company.description}</p>
        <button onClick={applyForCompany} className="btn btn-apply">
          เลือกบริษัทนี้
        </button>
      </div>
    </>
  );
};

export default CompanyDetails;

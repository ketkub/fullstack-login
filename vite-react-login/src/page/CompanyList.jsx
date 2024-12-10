import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import '../css/company.css';

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanies = async () => {
      const token = localStorage.getItem('token'); // Get token from localStorage

      if (!token) {
        setError('กรุณาเข้าสู่ระบบ'); // Show error if not authenticated
        navigate('/login'); // Redirect to login page
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/companies', {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in the Authorization header
          },
        });

        if (!response.ok) {
          const errorMessage =
            response.status === 401
              ? 'สิทธิ์ของคุณไม่ถูกต้อง กรุณาเข้าสู่ระบบอีกครั้ง'
              : 'เกิดข้อผิดพลาดในการโหลดข้อมูลบริษัท';
          throw new Error(errorMessage);
        }

        const data = await response.json();
        setCompanies(data.companies || []); // Use `data.companies` if API returns a nested structure
      } catch (error) {
        setError(error.message);
        console.error('Error fetching companies:', error);
      }
    };

    fetchCompanies();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token
    navigate('/login'); // Redirect to login page
  };

  return (
    <>
      <Navbar onLogout={handleLogout} />
      <div className="company-list-container">
        <h1>เลือกบริษัทสหกิจ</h1>

        {/* Display error if exists */}
        {error && <p className="error-message">{error}</p>}

        {companies.length > 0 ? (
          <div className="company-list">
            {companies.map((company) => (
              <div key={company.id} className="company-card">
                <img
                  src={company.logo || 'https://via.placeholder.com/150'}
                  alt={company.name}
                  className="company-logo"
                />
                <h3>{company.name}</h3>
                <p>{company.description}</p>
                <Link to={`/companies/${company.id}`} className="btn btn-details">
                  ดูรายละเอียด
                </Link>
              </div>
            ))}
          </div>
        ) : (
          !error && <p>ยังไม่มีข้อมูลบริษัทในระบบ</p>
        )}
      </div>
    </>
  );
};

export default CompanyList;

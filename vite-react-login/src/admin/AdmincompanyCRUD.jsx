import { useState, useEffect } from 'react';
import Sidebar from './Sidebar'; // ต้องเพิ่ม Sidebar component
import '../css/AdminCompanyCRUD.css'
const AdminCompanyCRUD = () => {
  const [companies, setCompanies] = useState([]);
  const [formData, setFormData] = useState({ name: '', description: '', logo: '' });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      setError(null);
    } else {
      setIsAuthenticated(false);
      setError('กรุณาเข้าสู่ระบบ');
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchCompanies();
    }
  }, [isAuthenticated]);

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/companies', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Error fetching companies');
      }
      const data = await response.json();
      setCompanies(data.companies || []);
    } catch (error) {
      console.error(error.message);
      setError('ไม่สามารถโหลดข้อมูลบริษัทได้');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.description || !formData.logo) {
      setError('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/companies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Error adding company');
      }
      fetchCompanies();
      setFormData({ name: '', description: '', logo: '' });
    } catch (error) {
      console.error(error.message);
      setError('ไม่สามารถเพิ่มบริษัทได้');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setError(null);
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/companies/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Error deleting company');
      }
      fetchCompanies();
    } catch (error) {
      console.error(error.message);
      setError('ไม่สามารถลบบริษัทได้');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return <div className="error-message">{error}</div>; // Display error if not authenticated
  }

  return (
    <div className="admin-container-1">
      <Sidebar />
      <div className="admin-content-1">
        <h1 className="page-title">จัดการข้อมูลบริษัท</h1>

        <form className="company-form-1" onSubmit={handleSubmit}>
          <input
            className="input-field-1"
            type="text"
            placeholder="ชื่อบริษัท"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            className="input-field-1"
            type="text"
            placeholder="รายละเอียด"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <input
            className="input-field-1"
            type="text"
            placeholder="ลิงก์โลโก้"
            value={formData.logo}
            onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
          />
          <button className="submit-btn-1" type="submit" disabled={loading}>
            {loading ? 'กำลังเพิ่ม...' : 'เพิ่มบริษัท'}
          </button>
        </form>

        {error && <p className="error-message-1">{error}</p>}

        {loading ? (
          <p className="loading-message-1">กำลังโหลดข้อมูล...</p>
        ) : companies.length > 0 ? (
          <>
            <h2 className="company-list-title-1">รายชื่อบริษัท</h2>
            <ul className="company-list-1">
              {companies.map((company) => (
                <li className="company-item-1" key={company.id}>
                  {company.name}
                  <button
                    className="delete-btn-1"
                    onClick={() => handleDelete(company.id)}
                  >
                    ลบ
                  </button>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="no-companies-1">ไม่มีข้อมูลบริษัท</p>
        )}
      </div>
    </div>
  );
};

export default AdminCompanyCRUD;

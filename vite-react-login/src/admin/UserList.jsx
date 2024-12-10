import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import '../css/UserList.css'

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);

  // Fetch users only if authenticated
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      setError(null); // Clear error if token exists
      fetchUsers(token); // Fetch users after authentication
    } else {
      setIsAuthenticated(false);
      setError('กรุณาเข้าสู่ระบบ');
    }
  }, []); // Only run once when component mounts

  // Function to fetch users
  const fetchUsers = async (token) => {
    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (data.status === 'ok') {
        setUsers(data.users); // Assuming the response contains a 'users' array
      } else {
        setError('Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('An error occurred while fetching users');
    }
  };

  // Function to delete a user
  const deleteUser = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('กรุณาเข้าสู่ระบบ');
      return;
    }
    
    try {
      const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.status === 'ok') {
        setUsers(users.filter(user => user.id !== id)); // Remove deleted user from list
      } else {
        setError('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('An error occurred while deleting user');
    }
  };

  // Show error message if not authenticated
  if (!isAuthenticated) {
    return <div className="error-message-1">{error}</div>;
  }

  return (
    <div className="admin-container-1">
      <Sidebar />
      <div className="user-list-content-1">
        <h1 className="page-title-1">จัดการผู้ใช้งาน</h1>
        {error && <div className="error-message-1">{error}</div>}
        <table className="user-table-1">
          <thead>
            <tr>
              <th className="table-header-1">ID</th>
              <th className="table-header-1">Email</th>
              <th className="table-header-1">Name</th>
              <th className="table-header-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td className="table-data-1">{user.id}</td>
                <td className="table-data-1">{user.email}</td>
                <td className="table-data-1">{user.fname} {user.lname}</td>
                <td className="table-actions-1">
                  <button onClick={() => deleteUser(user.id)} className="delete-user-1">ลบ</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;

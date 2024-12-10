import { useEffect, useState } from 'react';

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
      fetchUsers(); // Fetch users after authentication
    } else {
      setIsAuthenticated(false);
      setError('กรุณาเข้าสู่ระบบ');
    }
  }, []); // Only run once when component mounts

  // Function to fetch users
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3000/users');
      const data = await response.json();
      setUsers(data.users); // Assuming the response contains a 'users' array
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Function to delete a user
  const deleteUser = async (id) => {
    try {
      await fetch(`http://localhost:3000/users/${id}`, { method: 'DELETE' });
      setUsers(users.filter(user => user.id !== id)); // Remove deleted user from list
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Show error message if not authenticated
  if (!isAuthenticated) {
    return <div>{error}</div>;
  }

  return (
    <div className="user-list">
      <h1>Manage Users</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.fname} {user.lname}</td>
              <td>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;

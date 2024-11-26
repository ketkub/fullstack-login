import { useState } from 'react';
import '../css/login.css';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear any previous error message
    // Removed because we are using alert instead

    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.status === 'ok') {
      // Store the token and role in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);  // Store the role

      // Redirect based on the user's role
      if (data.role === 'admin') {
        window.location.href = '/UploadPromotion';  // Admin dashboard
      } else {
        window.location.href = '/';  // Regular user dashboard
      }
    } else {
      alert(data.message || 'เข้าสู่ระบบล้มเหลว กรุณาลองใหม่อีกครั้ง'); // Show error message as alert
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="ใส่อีเมลของคุณ"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="ใส่รหัสผ่านของคุณ"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login-button">
            เข้าสู่ระบบ
          </button>
        </form>
        <div className="signup-link">
          ไม่ได้เป็นสมาชิกใช่ไหม{' '}
          <a href="/signup">สมัครสมาชิก</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
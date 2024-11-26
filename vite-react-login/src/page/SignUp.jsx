import { useState } from 'react';

function SignUp() {
  const [fname, setfName] = useState('');
  const [lname, setlName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!fname || !lname || !email || !password) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน'); // "Please fill in all fields"
      return;
    }

    const response = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fname,
        lname,
        email,
        password,
      }),
    });

    const data = await response.json();

    if (data.status === 'ok') {
      alert('Sign Up successful!');
      // Redirect to login page
      window.location.href = '/login'; // Change this to your desired redirect
    } else {
      alert(data.msg || 'Sign up failed. Please try again.'); // Show error message as alert
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>First name</label>
            <input
              type="text"
              placeholder="ใส่ชื่อของคุณ"
              value={fname}
              onChange={(e) => setfName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Last name</label>
            <input
              type="text"
              placeholder="ใส่นามสกุลของคุณ"
              value={lname}
              onChange={(e) => setlName(e.target.value)}
            />
          </div>
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
              type="password" // Corrected input type
              placeholder="สร้างรหัสผ่านของคุณ"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login-button">
            สมัครสมาชิก
          </button>
        </form>
        <div className="signup-link">
          มีบัญชีอยู่แล้ว{' '}
          <a href="/login">Login</a>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
// Signup.jsx
import React, { useState } from 'react';
import './App.css';

const Signup = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    about: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignup = async () => {
    try {
      const res = await fetch('http://localhost:8081/auth/create-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        alert('Account created successfully!');
        onSwitchToLogin(); // Switch back to login
      } else {
        alert('Signup failed');
      }
    } catch (err) {
      console.error('Signup error:', err);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2>Sign Up</h2>
        <input name="name" className="login-input" placeholder="Name" onChange={handleChange} />
        <input name="email" className="login-input" placeholder="Email" onChange={handleChange} />
        <input name="password" className="login-input" placeholder="Password" type="password" onChange={handleChange} />
        <input name="about" className="login-input" placeholder="About" onChange={handleChange} />
        <button className="login-btn" onClick={handleSignup}>Create Account</button>
        <p>Already have an account? <span onClick={onSwitchToLogin} style={{ color: 'blue', cursor: 'pointer' }}>Login</span></p>
      </div>
    </div>
  );
};

export default Signup;

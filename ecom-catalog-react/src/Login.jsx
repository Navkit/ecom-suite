import React, { useState } from 'react';
import './App.css';


const Login = ({ setToken, onSwitchToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await fetch('http://localhost:8081/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('token', data.jwtToken);
        setToken(data.jwtToken);
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box dark">
        <h2 className="login-title">LOGIN</h2>
        <p className="login-subtitle">Please enter your login and password!</p>

        <input
          className="login-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <p className="forgot-password">Forgot password?</p>

        <button className="login-btn outline" onClick={handleLogin}>LOGIN</button>

        <div className="social-login">
          <i className="fab fa-facebook-f"></i>
          <i className="fab fa-twitter"></i>
          <i className="fab fa-google"></i>
        </div>

        <p className="signup-link">
          Don't have an account? <span onClick={onSwitchToSignup}>Sign Up</span>
        </p>
      </div>
    </div>
  );
};

export default Login;

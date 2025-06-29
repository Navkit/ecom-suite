import React, { useState } from 'react';
import './Login.css';

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8081/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.jwtToken);
        setToken(data.jwtToken);
      } else {
        alert('Invalid credentials');
      }
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2>Login</h2>
        <input
          className="login-input"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="email"
          autoComplete="username"
        />
        <input
          className="login-input"
          placeholder="Password"
          value={password}
          type="password"
          onChange={e => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        <button className="login-btn" onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;

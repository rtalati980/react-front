import React, { useState } from 'react';
import axios from 'axios';
import './login.css';

const Login = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginMessage, setLoginMessage] = useState('');

  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    const credentials = {
      username: loginData.email,
      password: loginData.password,
    };
  
    try {
      const response = await axios.post('https://ec2.radhakrishnamart.com:8443/login', credentials, {
        withCredentials: true, // Ensures cookies are included in requests
      });
  
      if (response.status === 200) {
        // Store login indicator
        localStorage.setItem('isLoggedIn', 'true');
        // Redirect or update UI on successful login
        window.location.href = '/admin/dashboard';
      }
    } catch (error) {
      console.error('Login failed', error);
      setLoginMessage('Login failed. Please check your credentials and try again.');
    }
  };
  return (
    <div className='container'>
      <div className="login-container">
        <h1>Login</h1>
        <form id="loginForm" onSubmit={handleLoginSubmit}>
          <label htmlFor="login-email">Email:</label>
          <input 
            type="email" 
            id="login-email" 
            name="email" 
            required 
            value={loginData.email} 
            onChange={handleLoginChange} 
          />
          <label htmlFor="login-password">Password:</label>
          <input 
            type="password" 
            id="login-password" 
            name="password" 
            required 
            value={loginData.password} 
            onChange={handleLoginChange} 
          />
          <button type="submit">Login</button>
        </form>
        <p id="login-message">{loginMessage}</p>
      </div>
    </div>
  );
};

export default Login;

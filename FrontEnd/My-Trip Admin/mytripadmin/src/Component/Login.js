import React, { useState } from 'react';
import axios from 'axios';
import NavbarContainer from './NavbarContainer';
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const Login = () => {
  const [isAdmin, setIsAdmin] = useState(true);
  const [emailOrName, setEmailOrName] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const apiBaseUrl = 'https://localhost:7117/api/Token/';
      const loginEndpoint = isAdmin ? 'Admin' : 'Agents';
      const loginData = {
        ...(isAdmin ? { Admin_Email: emailOrName } : { AgentName: emailOrName }),
        ...(isAdmin ? { Admin_Password: password } : { AgentPassword: password }),
      };

      const response = await axios.post(apiBaseUrl + loginEndpoint, loginData);
      const token = response.data;

      // Store token and user data in Session and Local storage based on user type
      if (isAdmin) {
        sessionStorage.setItem('AdminId', '1'); // Replace '1' with the actual admin ID if available
        sessionStorage.setItem('userType', 'admin');
        localStorage.setItem('adminToken', token);
        navigate('/ad');
        window.location.reload(); // Refresh the page



      } else {
        sessionStorage.setItem('AgentId', token.id.toString());
        sessionStorage.setItem('userType', 'agent');
        localStorage.setItem('agentToken', token);
        navigate('/profile');
        window.location.reload(); // Refresh the page
      }

    } catch (error) {
      toast.error('Login failed. Please check your credentials and try again.');
    }
  };

  
  return (
    <div
    style={{
      height: '100vh', /* Set the height of the container to the full viewport height */
      backgroundImage: "url('/Background-img.jpg')", /* Replace with your travel background image path */
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <div
      style={{
        width: '400px',
        maxWidth: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.9)', /* Set the transparency effect here (adjust the last value) */
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', /* Add a shadow effect */
        borderRadius: '8px',
        padding: '16px',
      }}
      className="card"
    >
      <h2 className="mb-4">Login</h2>
      <div className="mb-3">
        <label className="form-check-label">
          <input
            type="radio"
            className="form-check-input"
            value="admin"
            checked={isAdmin}
            onChange={() => setIsAdmin(true)}
          />
          Admin
        </label> &nbsp;
        <label className="form-check-label ml-3">
          <input
            type="radio"
            className="form-check-input"
            value="agent"
            checked={!isAdmin}
            onChange={() => setIsAdmin(false)}
          />
          Tour Agent
        </label>
      </div>
      <form onSubmit={handleLogin} className="needs-validation" noValidate>
        <div className="mb-3">
          <label className="form-label">{isAdmin ? 'Email' : 'Agent Name'}</label>
          <input
            type="text"
            className="form-control"
            value={emailOrName}
            onChange={(e) => setEmailOrName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
    <ToastContainer />
  </div>
  );
};

export default Login;

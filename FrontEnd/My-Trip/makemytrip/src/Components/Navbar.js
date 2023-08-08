import React, { useState } from 'react';
import axios from 'axios';
import { Button, Modal, Form } from 'react-bootstrap';
import './Main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Registerx from './Registerx';

import { useNavigate, Link } from 'react-router-dom';


export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

 

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [credentials, setCredentials] = useState({
    travelerName: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    travelerName: '',
    password: '',
  });

  const [mobileNavOpen, setMobileNavOpen] = useState(false); // Track mobile navigation state


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://localhost:7132/api/Token/Traveller', credentials);
      const token = response.data;
      localStorage.setItem('token', token.token);
      sessionStorage.setItem('TravellerId', token.id);
      setIsAuthenticated(true);
  
      // Show an alert for successful login
      window.alert('Login successful');
  
      handleCloseLoginModal();
    } catch (error) {
      console.error('Login failed:', error.message);
      window.alert('Login failed. Please check your credentials.');
    }
  };
  
  

  const handleSignOut = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('TravellerId');
    setIsAuthenticated(false);
    navigate('/');
  };

  const handleShowLoginModal = () => setShowLoginModal(true);
  const handleCloseLoginModal = () => setShowLoginModal(false);

  const handleShowRegisterModal = () => setShowRegisterModal(true);
  const handleCloseRegisterModal = () => setShowRegisterModal(false);

  const handleManageBooking = () => {
    if (isAuthenticated) {
      navigate('/d');
    } else {
      handleShowLoginModal();
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { travelerName: '', password: '' };

    if (credentials.travelerName.trim() === '') {
      newErrors.travelerName = 'Username is required';
      valid = false;
    }

    if (credentials.password.trim() === '') {
      newErrors.password = 'Password is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleLogin(credentials);
    }
  };

  


  return (
    <header id="header" className="fixed-top">
      <div className="container d-flex align-items-center justify-content-between">
        <h1 className="logo me-auto">
        <Link to="/">
            <i className="fa-regular fa-compass fa-xl"></i>&nbsp;Bon-Voyage
          </Link>
        </h1>
        <nav id="navbar" className={`navbar ${mobileNavOpen ? 'mobile-nav-open' : ''}`}>
          <ul className={`nav-menu ${mobileNavOpen ? 'mobile-nav-show' : ''}`}>
            <li>
            <Link to="/#hero" className="nav-link scrollto active">
                Home
              </Link>
            </li>
            <li>
            <Link to="/#about" className="nav-link scrollto">
                About
              </Link>
            </li>
            <li>
            <Link to="/tourpackage" className="nav-link scrollto">
                Tour
              </Link>
            </li>
          </ul>
          <i className="bi bi-list mobile-nav-toggle"></i>
        </nav>
        {isAuthenticated ? (
          <Button className="appointment-btn scrollto rounded-pill" onClick={handleManageBooking}>
            <span className="d-none d-md-inline">Manage</span> Booking
          </Button>
        ) : (
          <div>
            <Button className="appointment-btn scrollto rounded-pill" onClick={handleShowLoginModal}>
              <span className="d-none d-md-inline">Login/</span>Sign Up
            </Button>
            <Modal show={showLoginModal} onHide={handleCloseLoginModal}>
              <Modal.Header closeButton>
                <Modal.Title>Login / Sign Up</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <Form onSubmit={handleSubmit}>
  <Form.Group className="mb-3" controlId="formUsername">
    <Form.Label>Username</Form.Label>
    <Form.Control
      type="text"
      name="travelerName"
      value={credentials.travelerName}
      onChange={handleInputChange}
      placeholder="Enter username"
      isInvalid={!!errors.travelerName} // Set isInvalid to true if there's an error
      isValid={credentials.travelerName.trim() !== '' && !errors.travelerName} // Set isValid to true if there's no error and input is not empty
    />
    <Form.Control.Feedback type="invalid">{errors.travelerName}</Form.Control.Feedback>
  </Form.Group>
  <Form.Group className="mb-3" controlId="formPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control
      type="password"
      name="password"
      value={credentials.password}
      onChange={handleInputChange}
      placeholder="Password"
      isInvalid={!!errors.password} // Set isInvalid to true if there's an error
      isValid={credentials.password.trim() !== '' && !errors.password} // Set isValid to true if there's no error and input is not empty
    />
    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
  </Form.Group>
  <Button type="submit" variant="primary" className="rounded-pill">
    Login
  </Button>
  <Button
    type="button"
    variant="secondary"
    onClick={handleShowRegisterModal}
    className="rounded-pill"
  >
    Sign Up
  </Button>
</Form>

              </Modal.Body>
            </Modal>
          </div>
        )}
        {isAuthenticated && localStorage.getItem('token') && sessionStorage.getItem('TravellerId') ? (
  <Button className="appointment-btn scrollto rounded-pill" onClick={handleSignOut}>
    <span className="d-none d-md-inline">Sign Out</span>
  </Button>
) : null}


        <Modal show={showRegisterModal} onHide={handleCloseRegisterModal}>
          <Modal.Header closeButton>
            <Modal.Title>Register</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Registerx handleCloseRegisterModal={handleCloseRegisterModal} />
          </Modal.Body>
        </Modal>
      </div>
    </header>
  );
}

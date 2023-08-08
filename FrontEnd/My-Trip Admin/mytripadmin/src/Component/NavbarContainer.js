import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavbarContainer = () => {
  const [userType, setUserType] = useState('');

  useEffect(() => {
    const userType = sessionStorage.getItem('userType');
    setUserType(userType);
  }, []);

  const navigate = useNavigate();

  const handleAdminSectionClick = (section) => {
    if (section === 'travelAgents') {
      navigate('/notapproved');
    } else if (section === 'getTravelAgents') {
      navigate('/approved');
    } else if (section === 'tour') {
      navigate('/tours'); 
    } else if (section === 'tourPackage') {
      navigate('/tourpackages'); 
    }
  };

  const handleAgentSectionClick = (section) => {
    if (section === 'tour') {
      navigate('/tours');
    } else if (section === 'profile') {
      navigate('/profile');
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    navigate('/');
    window.location.reload(); // Refresh the page
  };

  if (!userType) {
    return null; 
  }

  if (userType === 'admin') {

  return (
    
        <header className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "#337ab7", color: "#fff" }}>
          <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <Link to="/ad" className="navbar-brand" style={{ color: "#fff", fontSize: "20px" }}>Bon-Voyage Admin Page</Link>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto mb-1 mb-lg-0 justify-content-between">
                <li className="nav-item ms-auto">
                  <Link to="/ad" className="nav-link" style={{ color: "#fff", fontSize: "16px", cursor: "pointer", textDecoration: "none" }}>
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <span className="nav-link" style={{ color: "#fff", fontSize: "16px", cursor: "pointer" }} onClick={() => handleAdminSectionClick('travelAgents')}>Requested Travel Agents</span>
                </li>
                <li className="nav-item">
                  <span className="nav-link" style={{ color: "#fff", fontSize: "16px", cursor: "pointer" }} onClick={() => handleAdminSectionClick('getTravelAgents')}>Get Travel Agents</span>
                </li>
                <li className="nav-item">
                  <span className="nav-link" style={{ color: "#fff", fontSize: "16px", cursor: "pointer" }} onClick={() => handleAdminSectionClick('tour')}>Tour</span>
                </li>
                <li className="nav-item">
                  <span className="nav-link" style={{ color: "#fff", fontSize: "16px", cursor: "pointer" }} onClick={() => handleAdminSectionClick('tourPackage')}>TourPackage</span>
                </li>
              </ul>
              <span className="navbar-text me-2" style={{ color: "#fff", fontSize: "16px", border: "1px solid #fff", padding: "5px 10px", borderRadius: "4px" }}>Hi, Admin</span>
              <button className="btn" style={{ color: "#fff", fontSize: "16px", border: "1px solid #fff", padding: "5px 10px", borderRadius: "4px", backgroundColor: "transparent" }} onClick={handleLogout}>Logout</button>

            </div>
          </div>

        </header>
  );
   }

   
   else if (userType === 'agent') {
    return (
        <header className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "#337ab7", color: "#fff" }}>
          <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <Link to="/agent" className="navbar-brand" style={{ color: "#fff", fontSize: "20px" }}>Bon-Voyage Agent Page</Link>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto mb-1 mb-lg-0 justify-content-between">
                <li className="nav-item ms-auto">
                  <Link to="/agent" className="nav-link" style={{ color: "#fff", fontSize: "16px", cursor: "pointer", textDecoration: "none" }}>
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <span className="nav-link" style={{ color: "#fff", fontSize: "16px", cursor: "pointer" }} onClick={() => handleAgentSectionClick('tour')}>Tour</span>
                </li>
                <li className="nav-item">
                  <span className="nav-link" style={{ color: "#fff", fontSize: "16px", cursor: "pointer" }} onClick={() => handleAgentSectionClick('profile')}>Profile</span>
                </li>
              </ul>
              <span className="navbar-text me-2" style={{ color: "#fff", fontSize: "16px", border: "1px solid #fff", padding: "5px 10px", borderRadius: "4px" }}>Hi, Agent</span>
              <button className="btn" style={{ color: "#fff", fontSize: "16px", border: "1px solid #fff", padding: "5px 10px", borderRadius: "4px", backgroundColor: "transparent" }} onClick={handleLogout}>Logout</button>

            </div>
          </div>

        </header>
        
      );
    } else{
        return null;
    }
};

export default NavbarContainer;

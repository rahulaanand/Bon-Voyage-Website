import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminPage from './Component/Admin';
import Tour from './Component/Tour';
import Tourpackages from './Component/Tourpackages';
import NotApprovedAgents from './Component/NotApprovedAgents';
import ApprovedAgent from './Component/ApprovedAgent';
import TravelAgent from './Component/TravelAgent';
import Login from './Component/Login';
import Profile from './Component/Profile';
import NavbarContainer from './Component/NavbarContainer';
import SpotPage from './Component/Spot';
import AddingSpot from './Component/AddingSpot';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const userType = sessionStorage.getItem('userType') || '1';

  return (
    <Router>
      <div className="App">
        {userType ? <NavbarContainer /> : null}
        <Routes>
          <Route path="/ad" element={<AdminPage />} />
          <Route path="/tours" element={<Tour />} />
          <Route path="/tourpackages" element={<Tourpackages />} />
          <Route path="/notapproved" element={<NotApprovedAgents />} />
          <Route path="/approved" element={<ApprovedAgent />} />
          <Route path="/agent" element={<TravelAgent />} />
          <Route path="/" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/spot" element={<SpotPage />} />
          <Route path="/addspot" element={<AddingSpot />} />

        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;

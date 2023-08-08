import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import TravelAgentRegister from './Components/RegisterAgent';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import TourPackages from './Components/TourPackages';
import Packages from './Components/Packages';
import Spot from './Components/Spot';
import Login from './Components/Loginx';
import Bookings from './Components/Bookings';
import Payment from './Components/Payment';
import FeedBack from './Components/FeedBack';
import BookingStatus from './Components/BookingStatus';
import Dash from './Components/Dash';
import Registerx from './Components/Registerx';
import Dashboardx from './Components/Dashboardx';
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tourpackage" element={<TourPackages />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/spot" element={<Spot />} />
          <Route path="/loginx" element={<Login />} />
          <Route path="/book" element={<Bookings />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/feedback" element={<FeedBack />} />
          <Route path="/bookstatus" element={<BookingStatus />} />
          <Route path="/dashboard" element={<Dash />} />
          <Route path="/registerx" element={<Registerx />} />
          <Route path="/registeragent" element={<TravelAgentRegister />} />
          <Route path="/d" element={<Dashboardx />} />

        </Routes>
        <ToastContainer position="top-right" /> 
      </div>
    </Router>
  );
}

export default App;

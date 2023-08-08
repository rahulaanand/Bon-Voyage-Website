import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

export default function Bookings() {
  const isLoggedIn = sessionStorage.getItem('TravellerId') && localStorage.getItem('token');

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    travellerId: isLoggedIn ? sessionStorage.getItem('TravellerId') : '',
    packageId: isLoggedIn ? sessionStorage.getItem('PackageId') : '',
    residence: '',
    numberOfPeople: 1, 
    bookingDate: '',
  });

  const [formErrors, setFormErrors] = useState({
    residence: '',
    bookingDate: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    // Clear validation error when user types
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleNumberOfPeopleChange = (event) => {
    const { value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, numberOfPeople: parseInt(value, 10) }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.residence) {
      newErrors.residence = 'Residence is required';
      isValid = false;
    }

    if (!formData.bookingDate) {
      newErrors.bookingDate = 'Booking date is required';
      isValid = false;
    }

    setFormErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isLoggedIn && validateForm()) {
      axios
        .post('https://localhost:7132/api/Booking', formData)
        .then((response) => {
          const bookingId = response.data.bookingId;
          sessionStorage.setItem('BookingId', bookingId);

          console.log('Booking created successfully:', response.data);
          setFormData({
            travellerId: sessionStorage.getItem('TravellerId'),
            packageId: sessionStorage.getItem('PackageId'),
            residence: '',
            numberOfPeople: 1,
            bookingDate: '',
          });
          navigate('/bookstatus', { state: { numberOfPeople: formData.numberOfPeople } });
        })
        .catch((error) => {
          console.error('Error creating booking:', error);
        });
    } else {
      alert('Login first to book the details.');
    }
  };

  return (
    <div>
      <br /><br /><br />
      <h2>Booking Form</h2>
      {isLoggedIn ? (
        <div className="container mt-5">
          <form onSubmit={handleSubmit} className="shadow p-4 rounded">
            <div className="mb-3">
              <label htmlFor="residence" className="form-label">Residence:</label>
              <input
                type="text"
                name="residence"
                value={formData.residence}
                onChange={handleInputChange}
                required
                className={`form-control ${formErrors.residence && 'is-invalid'}`}
                placeholder="Enter Residence"
              />
              {formErrors.residence && <div className="invalid-feedback">{formErrors.residence}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="numberOfPeople" className="form-label">Number of People:</label>
              <select
                name="numberOfPeople"
                value={formData.numberOfPeople}
                onChange={handleNumberOfPeopleChange}
                required
                className="form-select"
              >
                {Array.from({ length: 10 }, (_, index) => index + 1).map((count) => (
                  <option key={count} value={count}>
                    {count}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="bookingDate" className="form-label">Booking Date:</label>
              <input
                type="date"
                name="bookingDate"
                value={formData.bookingDate}
                onChange={handleInputChange}
                required
                className={`form-control ${formErrors.bookingDate && 'is-invalid'}`}
              />
              {formErrors.bookingDate && <div className="invalid-feedback">{formErrors.bookingDate}</div>}
            </div>
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary btn-block">Book Now</button>
            </div>
          </form>
        </div>
      ) : (
        <p>Login first to book the details.</p>
      )}
    </div>
  );
}

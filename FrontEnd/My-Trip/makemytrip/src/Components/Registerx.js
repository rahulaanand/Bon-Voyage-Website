import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Registerx({ handleCloseRegisterModal }) {
  const [formData, setFormData] = useState({
    TravelerName: '',
    TravelerEmail: '',
    PhoneNumber: '',
    Password: ''
  });

  const [formErrors, setFormErrors] = useState({
    TravelerName: '',
    TravelerEmail: '',
    PhoneNumber: '',
    Password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    // Clear corresponding validation error when user types
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: ''
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.TravelerName) {
      newErrors.TravelerName = 'Name is required';
      isValid = false;
    }

    if (!formData.TravelerEmail) {
      newErrors.TravelerEmail = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.TravelerEmail)) {
      newErrors.TravelerEmail = 'Invalid email format';
      isValid = false;
    }

    if (!formData.PhoneNumber) {
      newErrors.PhoneNumber = 'Phone Number is required';
      isValid = false;
    }

    if (!formData.Password) {
      newErrors.Password = 'Password is required';
      isValid = false;
    }

    setFormErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post('https://localhost:7132/api/Travellers', formData);
        console.log('Registration successful:', response.data);
        window.alert('Registration successful');
      } catch (error) {
        console.error('Registration error:', error);
        window.alert('Registration Error', error);
      }
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input
            type="text"
            className={`form-control ${formErrors.TravelerName && 'is-invalid'}`}
            name="TravelerName"
            value={formData.TravelerName}
            onChange={handleChange}
          />
          {formErrors.TravelerName && <div className="invalid-feedback">{formErrors.TravelerName}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            className={`form-control ${formErrors.TravelerEmail && 'is-invalid'}`}
            name="TravelerEmail"
            value={formData.TravelerEmail}
            onChange={handleChange}
          />
          {formErrors.TravelerEmail && <div className="invalid-feedback">{formErrors.TravelerEmail}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Phone Number:</label>
          <input
            type="tel"
            className={`form-control ${formErrors.PhoneNumber && 'is-invalid'}`}
            name="PhoneNumber"
            value={formData.PhoneNumber}
            onChange={handleChange}
          />
          {formErrors.PhoneNumber && <div className="invalid-feedback">{formErrors.PhoneNumber}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Password:</label>
          <input
            type="password"
            className={`form-control ${formErrors.Password && 'is-invalid'}`}
            name="Password"
            value={formData.Password}
            onChange={handleChange}
          />
          {formErrors.Password && <div className="invalid-feedback">{formErrors.Password}</div>}
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
}

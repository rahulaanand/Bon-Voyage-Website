import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Payment = ({ onCloseModal }) => {

  const [isFormSubmitted, setIsFormSubmitted] = useState(false); // Add a new state

  const [paymentData, setPaymentData] = useState({
    CardNumber: '',
    ExpiryMonth: 0,
    ExpiryYear: 0,
    NameOnCard: '',
    CVVNumber: 0,
    BookingId: '',
  });

  const [validation, setValidation] = useState({
    CardNumber: false,
    ExpiryMonth: false,
    ExpiryYear: false,
    NameOnCard: false,
    CVVNumber: false,
  });

  useEffect(() => {
    const bookingIdFromStorage = sessionStorage.getItem('BookingId');
    setPaymentData((prevData) => ({ ...prevData, BookingId: bookingIdFromStorage }));
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPaymentData((prevData) => ({ ...prevData, [name]: value }));

    // Perform field-specific validation
    if (name === 'CardNumber') {
      setValidation((prevValidation) => ({
        ...prevValidation,
        CardNumber: validateCardNumber(value),
      }));
    } else if (name === 'ExpiryMonth') {
      setValidation((prevValidation) => ({
        ...prevValidation,
        ExpiryMonth: value !== '0',
      }));
    } else if (name === 'ExpiryYear') {
      setValidation((prevValidation) => ({
        ...prevValidation,
        ExpiryYear: value !== '0',
      }));
    } else if (name === 'NameOnCard') {
      setValidation((prevValidation) => ({
        ...prevValidation,
        NameOnCard: value.trim() !== '',
      }));
    } else if (name === 'CVVNumber') {
      setValidation((prevValidation) => ({
        ...prevValidation,
        CVVNumber: validateCVVNumber(value),
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsFormSubmitted(true); 
    const isFormValid = Object.values(validation).every((isValid) => isValid);

    if (isFormValid) {
      axios
        .post('https://localhost:7132/api/Payment', paymentData)
        .then((response) => {
          console.log('Payment submitted successfully:', response.data);
          setPaymentData({
            CardNumber: '',
            ExpiryMonth: 0,
            ExpiryYear: 0,
            NameOnCard: '',
            CVVNumber: 0,
            BookingId: '',
          });
          onCloseModal();
          window.location.reload(); 
        })
        .catch((error) => {
          console.error('Error submitting payment:', error);
        });
    } else {
      console.error('Form validation failed. Please check your inputs.');
    }
  };

  const validateCardNumber = (cardNumber) => {
    return cardNumber.length >= 16;
  };

  const validateCVVNumber = (cvvNumber) => {
    return cvvNumber.length === 3;
  };

  const isFormValid = Object.values(validation).every((isValid) => isValid);

  return (
    <div className="container" style={{ marginTop: '10%' }}>
      <div className="card p-4 shadow">
        <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="font-bold text-sm mb-2">Card Number</label>
            <input
              className={`form-control ${validation.CardNumber ? '' : 'is-invalid'}`}
              type="text"
              name="CardNumber"
              value={paymentData.CardNumber}
              onChange={handleInputChange}
              required
              placeholder="0000 0000 0000 0000"
            />
            <div className="invalid-feedback">Please enter a valid card number.</div>
          </div>
          <div className="row">
            <div className="col">
              <label className="font-bold text-sm mb-2">Expiry Month</label>
              <select
                className={`form-select ${validation.ExpiryMonth ? '' : 'is-invalid'}`}
                name="ExpiryMonth"
                value={paymentData.ExpiryMonth}
                onChange={handleInputChange}
                required
              >
                <option value="0" disabled>Select Expiry Month</option>
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
              <div className="invalid-feedback">Please select a valid expiry month.</div>
            </div>
            <div className="col">
              <label className="font-bold text-sm mb-2">Expiry Year</label>
              <select
                className={`form-control ${validation.ExpiryYear ? '' : 'is-invalid'}`}
                name="ExpiryYear"
                value={paymentData.ExpiryYear}
                onChange={handleInputChange}
                required
              >
                <option value="0" disabled>Select Expiry Year</option>
                {Array.from({ length: 18 }, (_, index) => {
                  const year = 2023 + index;
                  return <option key={year} value={year}>{year}</option>;
                })}
              </select>
              <div className="invalid-feedback">Please select a valid expiry year.</div>
            </div>
          </div>
          <div className="mb-3">
            <label className="font-bold text-sm mb-2">Name on Card</label>
            <input
              className={`form-control ${validation.NameOnCard ? '' : 'is-invalid'}`}
              type="text"
              name="NameOnCard"
              value={paymentData.NameOnCard}
              onChange={handleInputChange}
              required
              placeholder="Rahul Aanand"
            />
            <div className="invalid-feedback">Please enter the name on the card.</div>
          </div>
          <div className="mb-3">
            <label className="font-bold text-sm mb-2">CVV Number</label>
            <input
              className={`form-control ${validation.CVVNumber ? '' : 'is-invalid'}`}
              type="number"
              name="CVVNumber"
              value={paymentData.CVVNumber}
              onChange={handleInputChange}
              required
              placeholder="000"
            />
            <div className="invalid-feedback">Please enter a valid CVV number.</div>
          </div>
          <div className="text-center">
            <button className="btn btn-primary" type="submit" disabled={!isFormValid}>
              Submit Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Payment;

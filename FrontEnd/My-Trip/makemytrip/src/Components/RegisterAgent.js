import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TravelAgentRegister = () => {
  const [agentName, setAgentName] = useState('');
  const [agentEmail, setAgentEmail] = useState('');
  const [agentPassword, setAgentPassword] = useState('');
  const [description, setDescription] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [imageFile, setAgencyImage] = useState(null);

  const navigate = useNavigate();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setAgencyImage(file);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAgentRegister = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('agentName', agentName);
    formData.append('agentEmail', agentEmail);
    formData.append('agentPassword', agentPassword);
    formData.append('description', description);
    formData.append('phoneNumber', phoneNumber);

    if (imageFile) {
      formData.append('imageFile', imageFile);
    }

    try {
      const response = await axios.post('https://localhost:7117/api/Agents', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Travel Agent Registered:', response.data);
      
      toast.success(`Travel Agent registered successfully! An email will be sent to ${agentEmail} shortly.`, {
        position: toast.POSITION.TOP_END,
      });

      navigate('/');
    } catch (error) {
      console.error('Error Registering Travel Agent:', error);
      toast.error('Error registering Travel Agent. Please try again.', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <div style={{ marginTop: '10%', marginBottom: '10%' }}>
      <div className="container justify-content-center" style={{ maxWidth: '600px' }}>
        <div className="card shadow">
          <div className="card-body">
            <div className="offset-lg-2 col-8" style={{ marginTop: '20px' }}>
              <h1>Travel Agent Register Page</h1>
              <br />

              <form onSubmit={handleAgentRegister}>
                {/* Agent Name */}
                <div className="form-group mb-4">
                  <label htmlFor="agentName">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="agentName"
                    value={agentName}
                    onChange={(event) => setAgentName(event.target.value)}
                  />
                </div>

                {/* Agent Email */}
                <div className="form-group mb-4">
                  <label htmlFor="agentEmail">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="agentEmail"
                    value={agentEmail}
                    onChange={(event) => setAgentEmail(event.target.value)}
                  />
                </div>

                {/* Agent Password */}
                <div className="form-group mb-4">
                  <label htmlFor="agentPassword">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="agentPassword"
                    value={agentPassword}
                    onChange={(event) => setAgentPassword(event.target.value)}
                  />
                </div>

                {/* Agent Description */}
                <div className="form-group mb-4">
                  <label htmlFor="description">Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    rows="3"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                  ></textarea>
                </div>

                {/* Agent Phone Number */}
                <div className="form-group mb-4">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(event) => setPhoneNumber(event.target.value)}
                  />
                </div>

                {/* Agent Image */}
                <div className="form-group mb-4">
                  <label htmlFor="imageFile">Image</label>
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      id="imageFile"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    <label className="custom-file-label" htmlFor="imageFile">
                      {imageFile ? imageFile.name : 'Choose file'}
                    </label>
                  </div>
                </div>

                {/* Agreement Checkbox */}
                <div className="form-check d-flex mb-4">
                  <input className="form-check-input" type="checkbox" id="terms" required />
                  <label className="form-check-label" htmlFor="terms">
                    I have read and agree to the terms
                  </label>
                </div>

                {/* Register Button */}
                <button className="btn btn-primary mb-4 w-100" type="submit">
                  Sign up
                </button>

                {/* Login Link */}
                <div className="text-center">
                  Already Logged in ? <br />
                  <a href="/login">Sign-in</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelAgentRegister;

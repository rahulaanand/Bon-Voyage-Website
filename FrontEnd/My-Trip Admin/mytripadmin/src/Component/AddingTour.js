import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddingTour = () => {
  const [tourId, setTourId] = useState('');
  const [agentId, setAgentId] = useState(null);
  const [packageName, setPackageName] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');
  const [hotelName, setHotelName] = useState('');
  const [vacationType, setVacationType] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [tourData, setTourData] = useState([]);

  useEffect(() => {
    fetchTourData();
  }, []);
  
  const fetchTourData = () => {
    axios.get('https://localhost:7117/api/ImageGallery')
      .then((response) => {
        const data = response.data;
        setTourData(data);
      })
      .catch((error) => {
        console.error('Error fetching tour data:', error);
      });
  };


  useEffect(() => {
    // Get agent ID from session storage
    const storedAgentId = sessionStorage.getItem('AgentId');
    if (storedAgentId) {
      setAgentId(storedAgentId);
    }
  }, []);

  const durationOptions = [
    '3 nights & 4 days',
    '4 nights & 5 days',
    '5 nights & 6 days',
  ];

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // Do something with the form data (e.g., send it to the server)
    const formData = new FormData();
    formData.append('agentId', sessionStorage.getItem('AgentId'));
    formData.append('packageName', packageName);
    formData.append('tourId', tourId);
    formData.append('price', price);
    formData.append('duration', duration);
    formData.append('description', description);
    formData.append('hotelName', hotelName);
    formData.append('vacationType', vacationType);
    formData.append('imageFile', imageFile);

    try {
      const response = await axios.post('https://localhost:7087/api/TourPackage', formData);
      console.log('Tour package added:', response.data);

      // Clear form fields
      setPackageName('');
      setPrice('');
      setDuration('');
      setDescription('');
      setHotelName('');
      setVacationType('');
      setImageFile(null);

      // Show a success message or handle redirect if needed
    } catch (error) {
      console.error('Error adding tour package:', error);
      // Handle error and show an error message if needed
    }
  };

  return (
    <div>
    <form onSubmit={handleFormSubmit}>
      <div className="form-group">
        <label htmlFor="tourDropdown">Choose Tour:</label>
        <select
          id="tourDropdown"
          className="form-control"
          value={tourId}
          onChange={(e) => setTourId(e.target.value)}
          required // Add required attribute for validation
        >
          <option value="">Select a tour</option>
          {tourData.map((tour) => (
            <option key={tour.tourId} value={tour.tourId}>
              {tour.tourName}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Package Name:</label>
        <input
          type="text"
          className="form-control"
          value={packageName}
          onChange={(e) => setPackageName(e.target.value)}
          required // Add required attribute for validation
        />
      </div>
      <div className="form-group">
        <label>Price:</label>
        <input
          type="number"
          className="form-control"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required // Add required attribute for validation
        />
      </div>
      <div className="form-group">
        <label>Duration:</label>
        <select
          className="form-control"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required // Add required attribute for validation
        >
          <option value="">Select Duration</option>
          {durationOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Description:</label>
        <textarea
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required // Add required attribute for validation
        />
      </div>
      <div className="form-group">
        <label>Hotel Name:</label>
        <input
          type="text"
          className="form-control"
          value={hotelName}
          onChange={(e) => setHotelName(e.target.value)}
          required // Add required attribute for validation
        />
      </div>
      <div className="form-group">
        <label>Vacation Type:</label>
        <select
          className="form-control"
          value={vacationType}
          onChange={(e) => setVacationType(e.target.value)}
          required // Add required attribute for validation
        >
          <option value="">Select Vacation Type</option>
          <option value="Adventure">Adventure</option>
          <option value="Relaxation">Relaxation</option>
          <option value="Sightseeing">Sightseeing</option>
          {/* Add other vacation types as needed */}
        </select>
      </div>
      <div className="form-group">
        <label>Image:</label>
        <input
          type="file"
          className="form-control"
          onChange={(e) => setImageFile(e.target.files[0])}
          required // Add required attribute for validation
        />
      </div>
      <br />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button
          type="submit"
          className="btn btn-primary rounded-pill px-4 py-2"
          style={{
            fontSize: '16px',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            letterSpacing: '0.5px',
          }}
        >
          Save
        </button>
      </div>
    </form>
  </div>  
  );
};

export default AddingTour;

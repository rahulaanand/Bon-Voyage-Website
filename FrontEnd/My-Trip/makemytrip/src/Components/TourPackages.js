import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

export default function TourPackages() {
  const [tourData, setTourData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7117/api/ImageGallery');
        setTourData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleViewButtonClick = (tourId) => {
    sessionStorage.setItem("TourId", tourId);
    navigate(`/packages`);
  };

  const handleRegisterClick = () => {
    navigate('/registeragent');
  };

  return (
    <div className='container' style={{ marginTop: '10%' }}>
      <div className="row">
        {tourData.map((tour) => (
          <div
            key={tour.tourId}
            className="col-md-4 mb-4"
            style={{ textDecoration: 'none' }}
          >
            <div
              className="card h-100 border border-gray-200 rounded-lg shadow-sm"
            >
              <div
                className="card-img-top rounded-t-lg"
                style={{
                  height: '450px',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundImage: `url(https://localhost:7117/Uploads/${tour.locationImage})`,
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: 0,
                    transition: 'opacity 0.3s',
                    cursor: 'pointer', 

                  }}
                  onMouseEnter={(e) => (e.target.style.opacity = '1')}
                  onMouseLeave={(e) => (e.target.style.opacity = '0')}
                  onClick={() => handleViewButtonClick(tour.tourId)}

                >
                  <h5 style={{ fontSize: '1.25rem', color: 'white' }}>
                    {tour.tourName}
                  </h5>
                  <p style={{ color: 'white', display: 'none' }}>
                    {tour.description}
                  </p>
                </div>
              </div>
              <div className="card-body">
                <h5 className="card-title text-2xl font-weight-bold text-gray-900">
                  {tour.tourName}
                </h5>
                <p className="card-text text-gray-700">{tour.description}</p>
                <div className="d-flex justify-content-center">
  <button
    className="btn btn-primary"
    onClick={() => handleViewButtonClick(tour.tourId)}
  >
    View
  </button>
</div>

              </div>
            </div>
          </div>
        ))}
      </div>
      <center><p>Are you interested in becoming a Travel Agent?</p>
      <button className="btn btn-primary" onClick={handleRegisterClick}>
        Wanna be a Travel Agent?
      </button>
      </center>    
      <br/>
      </div>
      
  );
}

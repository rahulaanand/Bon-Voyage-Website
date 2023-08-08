import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Packages() {
  const [tourPackageData, setTourPackageData] = useState([]);
  const [selectedTour, setSelectedTour] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchTourPackageData();
  }, []);

  const fetchTourPackageData = async () => {
    try {
      const packageId = parseInt(sessionStorage.getItem('TourId'))
      
      if (packageId) {
        const response = await axios.get(`https://localhost:7087/api/TourPackage/TourId/${packageId}`);
        setSelectedTour(response.data);
        setTourPackageData(response.data);
        
      }
      
    } catch (error) {
      console.error('Error fetching tour package data:', error);
    }
  };

  const handlePackageButtonClick = (packageId) => {
    console.log(packageId);
    sessionStorage.setItem("PackageId", packageId);
    navigate(`/spot`);
  };

  return (
    <section className="my-background-radial-gradient overflow-hidden" style={{ marginTop: '50px' }}>
      {/* ...Rest of the component's code... */}
      <div className="container">
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {tourPackageData.map(tourPackages => (
            <div key={tourPackages.packageId} className="col mb-4">
              <div className="card my-bg-glass h-100">
                <img
                  src={`https://localhost:7087/Uploads/${tourPackages.image}`}
                  className="card-img-top"
                  alt=""
                  style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{tourPackages.packageName}</h5>
                  <p className="card-text">Price: {tourPackages.price}</p>
                  <p className="card-text">Duration: {tourPackages.duration}</p>
                  {/* Add more package details here */}
                </div>
                <div className="card-footer">
                  <button
                    className="btn btn-primary w-100"
                    onClick={() => handlePackageButtonClick(tourPackages.packageId)}
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function PackageView() {
  const navigate = useNavigate();
  const [tourPackageData, setTourPackageData] = useState([]);

  useEffect(() => {
    fetchTourPackageData();
  }, []);

  const fetchTourPackageData = () => {
    axios
      .get('https://localhost:7087/api/TourPackage')
      .then((response) => {
        const data = response.data;
        setTourPackageData(data.slice(0, 4)); // Display only the first 4 images
      })
      .catch((error) => {
        console.error('Error fetching tour package data:', error);
      });
  };

  const handlePackageButtonClick = (packageId) => {
    console.log(packageId);
    sessionStorage.setItem('PackageId', packageId);
    navigate(`/spot`);
  };

  return (
    <section className="my-background-radial-gradient overflow-hidden">
      <div className="my-agents-container container">
        <div className="section-title">
          <h2>Tour Packages</h2>
          <p className="text-muted">
            Explore our handpicked collection of amazing tour packages and embark on unforgettable journeys.
          </p>
        </div>
        <div className="container">
          <div className="row row-cols-1 row-cols-md-4 g-4">
            {tourPackageData.map((tourPackage) => (
              <div key={tourPackage.packageId} className="col">
                <div className="card my-bg-glass border-1">
                  <div className="card-body text-center">
                    <img
                      src={`https://localhost:7087/Uploads/${tourPackage.image}`}
                      className="card-img-top mx-auto img-fluid"
                      alt=""
                      style={{ width: '150px', height: '150px' }}
                    />

                    <div className="card-body">
                      <p className="card-title"><b>{tourPackage.packageName}</b></p>
                      <p className="card-text text-muted">Price: ₹{tourPackage.price}</p>
                      <p className="card-text text-muted">Duration: {tourPackage.duration}</p>
                    </div>
                  </div>
                  <div className="card-footer bg-transparent border-0">
                    <button
                      className="btn btn-primary w-100"
                      onClick={() => handlePackageButtonClick(tourPackage.packageId)}
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

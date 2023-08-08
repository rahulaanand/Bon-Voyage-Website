import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Itinerary() {
  const [itineraryDetails, setItineraryDetails] = useState('');
  const packageIdFromStorage = sessionStorage.getItem('PackageId');

  useEffect(() => {
    // Fetch TourPackages data
    axios.get(`https://localhost:7087/api/TourPackage/${packageIdFromStorage}`)
      .then(response => {
        const packageData = response.data;
        // Assuming the itinerary is an array with a single item
        if (packageData.itinerary && packageData.itinerary.length > 0) {
          setItineraryDetails(packageData.itinerary[0].itineraryDetails);
        }
      })
      .catch(error => {
        console.error('Error fetching tour package:', error);
      });
  }, [packageIdFromStorage]);

  const getItineraryPoints = (itineraryDetails) => {
    return itineraryDetails.split('.');
  };

  return (
    <div className="container" style={{marginTop: '10%'}}>
  <div className="row justify-content-center">
    <div className="col-md-8 col-lg-10 mb-4">
    <div className="card rounded border">
  <div className="card-body">
    <h2 className="text-center mb-4">Itineraries</h2>
    <h4 className="text-center mb-4">Experience the Adventure of a Lifetime</h4>
    <ul className="itinerary-list">
      {getItineraryPoints(itineraryDetails)
        .filter((point) => point.trim() !== "") // Remove empty points
        .map((point, index) => (
          <li key={index}>
            <p>{point}</p>
          </li>
        ))}
    </ul>
  </div>
</div>
    </div>
  </div>
</div>

  );
}

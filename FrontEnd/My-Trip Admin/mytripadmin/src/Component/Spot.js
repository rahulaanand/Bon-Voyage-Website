import React, { useEffect, useState } from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';

export default function SpotPage() {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    const packageId = sessionStorage.getItem('packageId');
    if (packageId) {
      axios.get(`https://localhost:7087/api/TourPackage/${packageId}`)
        .then(response => {
          setSelectedPackage(response.data);
        })
        .catch(error => {
          console.error('Error fetching selected tour package:', error);
        });
    }

    axios.get('https://localhost:7087/api/Spots')
      .then(response => {
        setSpots(response.data);
      })
      .catch(error => {
        console.error('Error fetching spots:', error);
      });
  }, []);

  return (
    <div className="container" style={{ marginTop: '10%' }}>
      <div className="row">
      <div className="col-8">

          <div className='container' style={{marginLeft: '10%'}}>

            <h1>Spots to be visited:</h1>
            {spots.map((spot) => (
              selectedPackage && selectedPackage.packageId === spot.packageId && (
                <div
                  key={spot.spotId}
                  style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px' }}
                >
      <img
        src={`https://localhost:7087/Uploads/${spot.image1}`}
        alt={`Spot Image 1`}
        style={{
          width: '200px',
          height: '200px',
          objectFit: 'cover',
          marginRight: '10px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      />
      <img
        src={`https://localhost:7087/Uploads/${spot.image2}`}
        alt={`Spot Image 2`}
        style={{
          width: '200px',
          height: '200px',
          objectFit: 'cover',
          marginRight: '10px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      />
      <img
        src={`https://localhost:7087/Uploads/${spot.image3}`}
        alt={`Spot Image 3`}
        style={{
          width: '200px',
          height: '200px',
          objectFit: 'cover',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      />
    </div>
              )
  ))}
  <div
    style={{
      display: 'flex',
      flexDirection: 'row',
      marginBottom: '10px',
      alignItems: 'center',
    }}
  >
    {spots.map((spot, index) => (
      index >= spots.length - 2 && (
        <img
          key={`row2-${spot.spotId}`}
          src={`https://localhost:7087/Uploads/${spot.image4}`}
          alt={`Spot Image 4`}
          style={{
            width: '200px',
            height: '200px',
            objectFit: 'cover',
            marginRight: '10px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        />
      )
    ))}
    {spots.map((spot, index) => (
      index >= spots.length - 2 && (
        <img
          key={`row2-${spot.spotId}`}
          src={`https://localhost:7087/Uploads/${spot.image5}`}
          alt={`Spot Image 5`}
          style={{
            width: '200px',
            height: '200px',
            objectFit: 'cover',
            marginRight: '10px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        />
        
      )
    ))}
  </div>

</div>

        </div>

          
        </div>
        </div>
            
  );
}

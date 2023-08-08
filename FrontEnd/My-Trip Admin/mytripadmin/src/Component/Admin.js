import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from './Footer';
import Tourpackages from './Tourpackages';

export default function TravelAgent() {
  const [agents, setAgents] = useState([]);
  const [notApprovedAgents, setNotApprovedAgents] = useState([]);
  const [approvedCount, setApprovedCount] = useState(0);
  const [requestedCount, setRequestedCount] = useState(0);
  const [tourPackageCount, setTourPackageCount] = useState(0);
  const [imageCount, setImageCount] = useState(0);
  const [tourData, setTourData] = useState([]);
  const slicedTourData = tourData.slice(0, 3);


  useEffect(() => {
    fetchApprovedAgents();
    fetchNotApprovedAgents();
    fetchTourPackageCount();
    fetchImageCount();

  }, []);

  const fetchApprovedAgents = async () => {
    try {
      const response = await axios.get('https://localhost:7117/api/Agents/AcceptedAgents', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });

      const approvedAgents = response.data;
      setAgents(approvedAgents);
      setApprovedCount(approvedAgents.length);
    } catch (error) {
      console.log('Failed to fetch approved agents: ' + error.message);
    }
  };

  const fetchNotApprovedAgents = () => {
    fetch('https://localhost:7117/api/Agents/RequestedAgents', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setNotApprovedAgents(data);
        setRequestedCount(data.length);
      })
      .catch((error) => console.log(error));
  };

  const fetchTourPackageCount = () => {
    axios.get('https://localhost:7087/api/TourPackage/count')
      .then((response) => {
        const count = response.data;
        setTourPackageCount(count);
      })
      .catch((error) => {
        console.error('Error fetching tour package count:', error);
      });
  };

  const fetchImageCount = () => {
    axios.get('https://localhost:7117/api/ImageGallery/count')
      .then((response) => {
        const count = response.data;
        setImageCount(count);
      })
      .catch((error) => {
        console.error('Error fetching image count:', error);
      });
  };
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


  return (
    
    <div className="content" style={{ marginTop: '100px' }}>
      <div className="container">
        <h1 className="text-center mb-4">Welcome to Our Travel Agency Website!</h1><hr/>
        <p className="text-center lead mb-5">
          As an admin, you have access to various features and tools to manage and update the travel agency website. Here are some key areas you can focus on:
        </p>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Total Tours Available</h5>
            <p className="card-text">Total: {imageCount}</p>
          </div>
        </div>
        <br/>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Total Tour Packages</h5>
            <p className="card-text">Total: {tourPackageCount}</p>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Approved Agents</h5>
                <p className="card-text">Total: {approvedCount}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Requested Agents</h5>
                <p className="card-text">Total: {requestedCount}</p>
              </div>
            </div>
          </div>
        </div>
      </div><br/><br/>
      <div>
      <h2 className="text-center mt-4">Tour Gallery</h2>
      <div className="container mt-4"><hr/>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {slicedTourData.map((tour) => (
            <div key={tour.TourId} className="col mb-4">
              <div className="card">
                <img
                  src={`https://localhost:7117/Uploads/${tour.locationImage}`}
                  alt={tour.tourName}
                  className="card-img-top"
                  style={{ height: '400px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{tour.tourName}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    
      </div>
      <div><br/><br/>
      <Tourpackages/>
    </div><br/><br/>
    <Footer/>
    </div>
  );
}

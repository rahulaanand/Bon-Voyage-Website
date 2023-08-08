import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarContainer from './NavbarContainer';

export default function ApprovedAgent() {
  const [approvedAgents, setApprovedAgents] = useState([]);
  const [tourPackages, setTourPackages] = useState([]);

  // Function to fetch approved agents
  const fetchApprovedAgents = () => {
    axios.get("https://localhost:7117/api/Agents/AcceptedAgents")
      .then(response => {
        setApprovedAgents(response.data);
      })
      .catch(error => console.log(error));
  };

  // Function to fetch tour packages
  const fetchTourPackages = () => {
    axios.get("https://localhost:7087/api/TourPackage")
      .then(response => {
        setTourPackages(response.data);
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    fetchApprovedAgents();
    fetchTourPackages();
  }, []); // Run this effect only once on component mount

  return (
    <div className="agents" style={{ marginTop: '50px' }}>
      <section className="my-background-radial-gradient overflow-hidden">
        <div className="my-agents-container container">
          <div className="my-page-heading">
            <h2>Approved Agent Details</h2>
            <hr />
          </div>
          <div className="container">
            <div className="row row-cols-1 row-cols-md-4 g-4">
              {approvedAgents.map(agent => (
                <div key={agent.agentId} className="col">
                  <div className="card my-bg-glass">
                  <div className="card-body" style={{marginTop: '5%'}}>
                  <img
                        src={`https://localhost:7117/Uploads/${agent.agencyImage}`}
                        className="card-img-top"
                        alt=""
                        style={{ width: '200px', height: '200px', transform: 'scale(1.2)' }}
                      />

                      <div className="flex flex-wrap">
                        <br />
                        <span className="inline-block w-1/2">
                          <p className="text-sm text-gray-600">Name: {agent.agentName}</p>
                          <p className="text-sm text-gray-600">Email: {agent.agentEmail}</p>
                          <p className="text-sm text-gray-600">Phone Number: {agent.phoneNumber}</p>
                          <p className="text-sm text-gray-600">Status: {agent.status}</p>
                        </span>
                      </div>
                      <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => {
                            const requestBody = {
                              "id": agent.agentId
                            };
                            console.log(requestBody);

                            fetch(`https://localhost:7117/api/Agents/DeclineStatus/${agent.agentId}`, {
                              method: "PUT",
                              headers: {
                                "Accept": "application/json",
                                "Content-Type": "application/json",
                                Authorization: 'Bearer ' + localStorage.getItem('token')
                              },
                              body: JSON.stringify(requestBody)
                            })
                              .then(response => response.json())
                              .then(data => {
                                console.log(data);
                                fetchApprovedAgents();
                              })
                              .catch(error => console.log(error));
                          }}
                        >
                          Decline
                        </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <br/><br/>
      <section className="my-background-radial-gradient overflow-hidden">
  <div className="my-agents-container container">
    <div className="my-page-heading">
      <h2>Tour Packages</h2>
      <hr />
    </div>
    <div className="container">
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {tourPackages.map((tourPackage) => (
          <div key={tourPackage.PackageId} className="col">
            <div className="card my-bg-glass h-100">
              <div className="card-body">
                <img
                  src={`https://localhost:7087/Uploads/${tourPackage.image}`}
                  className="card-img-top"
                  alt=""
                  style={{ width: '200px', height: '200px', transform: 'scale(1.2)', marginTop: '20px' }}
                />

                <div className="flex flex-wrap" style={{ marginTop: '6%' }}>
                  <br />
                  <span className="inline-block w-1/2">
                    <p className="text-sm text-gray-600">Package Name: {tourPackage.packageName}</p>
                    <p className="text-sm text-gray-600">Agent Id: {tourPackage.agentId}</p>

                    <p className="text-sm text-gray-600">Price: {tourPackage.price}</p>
                    <p className="text-sm text-gray-600">Duration: {tourPackage.duration}</p>
                    <p className="text-sm text-gray-600">Description: {tourPackage.description}</p>

                    {/* Add more package details here */}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>
<br/>
<br/>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarContainer from './NavbarContainer';

export default function NotApprovedAgents() {
  const [notApprovedAgents, setNotApprovedAgents] = useState([]);

  // Function to fetch requested agents
  const fetchRequestedAgents = () => {
    axios.get("https://localhost:7117/api/Agents/RequestedAgents")
      .then(response => {
        setNotApprovedAgents(response.data);
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    fetchRequestedAgents();
  }, []); 
  
  return (
    <div className="agents" style={{ marginTop: '50px' }}>
      <section className="my-background-radial-gradient overflow-hidden">
        <div className="my-agents-container container">
          <div className="my-page-heading">
            <h2>Requested Agent Details</h2>
            <hr />
          </div>
          <div className="container">
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {notApprovedAgents.map(agent => (
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
                          {/* Add more agent details here */}
                          <p className="text-sm text-gray-600">Email: {agent.agentEmail}</p>
                          <p className="text-sm text-gray-600">Phone Number: {agent.phoneNumber}</p>
                          <p className="text-sm text-gray-600">Status: {agent.status}</p>
                        </span>
                        {/* You can add more details to the second column */}
                        {/* <span className="inline-block w-1/2">
                          ... Other agent details here ...
                        </span> */}
                      </div>
                      <hr />

                      <div className="d-flex justify-content-center">
                        
                        <button
                              type="button"
                              className="btn btn-success me-2"
                              onClick={() => {
                                const requestBody = {
                                  "id": agent.agentId
                                };
                                console.log(requestBody);

                                fetch(`https://localhost:7117/api/Agents/UpdateStatus/${agent.agentId}`, {
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
                                    fetchRequestedAgents();
                                
                                  })
                                  .catch(error => console.log(error));
                              }}>Accept</button>
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
                                fetchRequestedAgents();
                            
                              })
                              .catch(error => console.log(error));
                          }}
                        >
                          Decline
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <br/>

        <br/>

      </section>
    </div>
  );
}

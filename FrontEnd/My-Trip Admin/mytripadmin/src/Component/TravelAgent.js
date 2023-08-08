import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function TravelAgentList() {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    // Fetch all Travel Agent details
    const fetchAgents = async () => {
      try {
        const response = await axios.get('https://localhost:7117/api/Agents');
        setAgents(response.data);
      } catch (error) {
        console.error('Error fetching Travel Agent details:', error);
      }
    };

    fetchAgents();
  }, []);

  if (agents.length === 0) {
    return <div>Loading...</div>;
  }

  // Display the list of Travel Agents
  return (
    <div>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>List of Travel Agents</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {agents.map((agent) => (
          <div
            key={agent.agentId}
            style={{
              width: '18rem',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              borderRadius: '8px',
              margin: '10px',
              backgroundColor: '#fff',
            }}
          >
            <div style={{ padding: '20px' }}>
              <h2 style={{ marginBottom: '10px' }}>{agent.agentName}</h2>
              <p>Email: {agent.agentEmail}</p>
              <p>Description {agent.description}</p>
              <p>Phone Number: {agent.phoneNumber}</p>
            </div>
           
          </div>
        ))}
      </div>
    </div>
  );
}

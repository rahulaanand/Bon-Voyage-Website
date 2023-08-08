import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AddingTour from './AddingTour.js'

const Profile = () => {
  const [agentDetails, setAgentDetails] = useState(null);
  const [tourPackageData, setTourPackageData] = useState([]);
  const [agentId, setAgentId] = useState(null);
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleModalShow = () => {
    setShowModal(true);
  };
  
  const handleModalHide = () => {
    setShowModal(false);
  };
  
  const handleDeleteClick = (packageId) => {
    setSelectedPackageId(packageId);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      // Perform the DELETE request here for the selected package (selectedPackageId)
      await axios.delete(`https://localhost:7087/api/TourPackage/${selectedPackageId}`);
      console.log(`Deleted package with ID ${selectedPackageId}`);

      // Close the modal after deletion
      setShowDeleteModal(false);
      setSelectedPackageId(null);
      
      // Refetch the tour package data
      fetchTourPackageData();
    } catch (error) {
      console.error('Error deleting tour package:', error);
      // Handle error here if needed
    }
  };

  const handleCancelDelete = () => {
    setSelectedPackageId(null);
    setShowDeleteModal(false);
  };

  useEffect(() => {
    const storedAgentId = sessionStorage.getItem('AgentId');

    if (storedAgentId) {
      setAgentId(storedAgentId);
      const fetchAgentDetails = async () => {
        try {
          const response = await axios.get(`https://localhost:7117/api/Agents/${storedAgentId}`);
          setAgentDetails(response.data);
        } catch (error) {
          console.error('Error fetching Travel Agent details:', error);
        }
      };

      fetchAgentDetails();
    }
  }, []);

  useEffect(() => {
    if (agentId) {
      fetchTourPackageData();
    }
  }, [agentId]);

  const fetchTourPackageData = () => {
    axios
      .get(`https://localhost:7087/api/TourPackage/Agent/${agentId}`)
      .then((response) => {
        const data = response.data;
        setTourPackageData(data);
      })
      .catch((error) => {
        console.error('Error fetching tour package data:', error);
      });
  };

  if (!agentDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{marginTop: '3%'}}>
      <h1>My Profile</h1>
      <p>Name: {agentDetails.agentName}</p>
      <p>Email: {agentDetails.agentEmail}</p>

      <section className="my-background-radial-gradient overflow-hidden" style={{ marginTop: '50px' }}>
        <div className="my-agents-container container">
          <div className="my-page-heading">
            <h2>Tour Packages</h2>
            <hr />
          </div>
          <div className="container">
            <div className="row row-cols-1 row-cols-md-4 g-4">
              {tourPackageData.map((tourPackage) => (
                <div key={tourPackage.PackageId} className="col">
                  <div className="card my-bg-glass">
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
                            
  <button
    onClick={() => {
      sessionStorage.setItem('packageId', tourPackage.packageId);
      navigate(`/spot`);
    }}
    className="btn btn-primary"
  >
    View
  </button>
  <span style={{ margin: '0 10px', color: '#ccc' }}>|</span>
  <button
    onClick={() => handleDeleteClick(tourPackage.packageId)}
    className="btn btn-danger"
  >
    Delete
  </button>



                        </span>
                      </div>

                    </div>

                  </div>

                </div>
                
              ))}
              <button
  className="btn"
  style={{
    border: '1px solid #007bff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    borderRadius: '4px',
    padding: '0.5rem 0.75rem', 
    fontSize: '20px', 
    transition: 'border-color 0.3s', 
    position: 'relative',
  }}
  onMouseOver={(e) => {
    e.target.style.borderColor = '#007bff'; // Change the border color on hover
    e.target.style.textDecoration = 'underline'; // Underline the text on hover
    e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)'; // Additional shadow effect on hover
  }}
  onMouseOut={(e) => {
    e.target.style.borderColor = 'initial'; // Reset the border color when not hovering
    e.target.style.textDecoration = 'none'; // Remove the underline when not hovering
    e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)'; // Reset the shadow when not hovering
  }}
  onClick={handleModalShow} 
  >
  Add Tour
</button>
<Modal show={showModal} onHide={handleModalHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add Tour</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddingTour/>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModalHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>

            </div>
          </div>
        </div>
      </section><br/>
      <Modal show={showDeleteModal} onHide={handleCancelDelete}>

  <h2 className="text-center mt-4">Confirm Delete</h2>

  <p className="text-center mt-2">Are you sure you want to delete this tour package..?</p>
    <Button variant="secondary" onClick={handleCancelDelete}>
      No
    </Button>
    <Button variant="danger" onClick={handleConfirmDelete}>
      Yes
    </Button>
</Modal>


    </div>
  );
};

export default Profile;

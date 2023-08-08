import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import AddingTour from './AddingTour';

export default function TourAndTourPackage() {
  const [tourData, setTourData] = useState([]);
  const [newTour, setNewTour] = useState({
    tourName: '',
    locationImage: null,
    description: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [locationImageFile, setLocationImageFile] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [tourToDelete, setTourToDelete] = useState(null);

  useEffect(() => {
    fetchTourData();
    checkAdminLogin();
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTour({ ...newTour, [name]: value });
  };

  const handleAddTour = () => {
    const formData = new FormData();
    formData.append('tourName', newTour.tourName);
    formData.append('locationImage', newTour.locationImage);
    formData.append('description', newTour.description);

    if (locationImageFile) {
      formData.append('imageFile', locationImageFile);
    }

    axios.post('https://localhost:7117/api/ImageGallery', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        fetchTourData();
        setNewTour({
          tourName: '',
          locationImage: null,
          description: '',
        });
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error('Error adding tour:', error);
      });
  };

  const checkAdminLogin = () => {
    const userType = sessionStorage.getItem('userType');
    const adminId = sessionStorage.getItem('AdminId');
    setIsAdmin(userType === 'admin' && adminId === '1');
  };

  const handleImageChange = (e) => {
    setLocationImageFile(e.target.files[0]);
  };

  const handleDeleteTour = (tourId) => {
    axios.delete(`https://localhost:7117/api/ImageGallery/${tourId}`)
      .then((response) => {
        fetchTourData();
        setIsDeleteModalOpen(false);
      })
      .catch((error) => {
        console.error('Error deleting tour:', error);
      });
  };

  const handleDeleteClick = (tourId) => {
    setTourToDelete(tourId);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (tourToDelete) {
      handleDeleteTour(tourToDelete);
      setTourToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setTourToDelete(null);
    setIsDeleteModalOpen(false);
  };

  return (
    <div>
      <div style={{ marginTop: '50px' }}>
        <h1 className="text-center mt-4">Tour Gallery</h1>
        <div className="container mt-4">
          <hr />
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {tourData.map((tour) => (
              <div key={tour.tourId} className="col mb-4">
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
                
                  
                </div><br/>
                {isAdmin && (
                    <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteClick(tour.tourId)}
                  >
                  Delete
                  </button>

                  )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        {isAdmin ? (
          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
            Add Tour
          </button>
        ) : null}
            <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
          <h2 className="text-center mt-4">Add a New Tour</h2>
          <div className="container mt-4">
            <div className="row">
              <div className="col-md-6 offset-md-3">
                <form>
                  <div className="mb-3">
                    <label htmlFor="tourName" className="form-label">Tour Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="tourName"
                      name="tourName"
                      value={newTour.tourName}
                      onChange={handleInputChange}
                    />
                    
                  </div>
                  
                  
                  <div className="mb-3">
                    <label htmlFor="locationImage" className="form-label">Location Image</label>
                    <input
                      type="file"
                      className="form-control"
                      id="locationImage"
                      name="locationImage"
                      onChange={handleImageChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input
                      type="text"
                      className="form-control"
                      id="description"
                      name="description"
                      value={newTour.description}
                      onChange={handleInputChange}
                    />
                  </div>

                  <button type="button" className="btn btn-primary" onClick={handleAddTour}>Add Tour</button>
                </form>
              </div>
            </div>
          </div>
        </Modal>
        <Modal isOpen={isDeleteModalOpen} onRequestClose={handleDeleteCancel}>
          <h2 className="text-center mt-4">Delete Tour</h2>
          <p className="text-center mt-2">Are you sure you want to delete this tour ..?</p>
          <div className="d-flex justify-content-center mt-4">
            <button className="btn btn-danger mx-2" onClick={handleDeleteConfirm}>
              Yes
            </button>
            <button className="btn btn-secondary mx-2" onClick={handleDeleteCancel}>
              No
            </button>
          </div>
        </Modal>
      </div>
      <br/>
    </div>
  );
}

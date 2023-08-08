import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Dashboardx() {
  const travelerId = sessionStorage.getItem('TravellerId');
  const navigate = useNavigate();

  const [bookingsWithPackages, setBookingsWithPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);

  useEffect(() => {
    if (travelerId) {
      async function fetchData() {
        try {
          const response = await fetch(`https://localhost:7132/api/Booking?travellerId=${travelerId}`);
          const bookings = await response.json();
  
          const confirmedBookingsWithPackages = [];
          for (const booking of bookings) {
            const packageResponse = await fetch(`https://localhost:7087/api/TourPackage/${booking.packageId}`);
            const associatedPackage = await packageResponse.json();
  
            if (booking.isConfirmed) {
              confirmedBookingsWithPackages.push({ booking, associatedPackage });
            }
          }
  
          setBookingsWithPackages(confirmedBookingsWithPackages);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
  
      fetchData();
    }
  }, [travelerId]);
  

  if (!travelerId) {
    return null; 
  }

  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  function getConfirmationStatus(isConfirmed) {
    return isConfirmed ? 'Confirmed' : 'Not Confirmed';
  }

  function handleShowCancelModal(bookingId) {
    setShowCancelModal(true);
    setBookingToCancel(bookingId);
  }

  function handleCloseCancelModal() {
    setShowCancelModal(false);
    setBookingToCancel(null);
  }

  const handleCancelBooking = async (bookingId) => {
    try {
      const response = await fetch(`https://localhost:7132/api/Booking/${bookingId}/cancel`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        console.log(`Booking ${bookingId} canceled successfully.`);
        toast.success('Booking canceled successfully', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          
        });
        navigate('/dashboard');
  
      } else {
        // Handle error case here.
        console.error('Failed to cancel booking.');
        toast.error('Failed to cancel booking', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error('Error occurred while canceling booking:', error);
      toast.error('An error occurred while canceling booking', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }
  };
  

  return (
    <div style={{ marginTop: '8%' }} className="container">
      <h1>Confirmed Tours</h1>
      {loading ? (
        <p>Loading data...</p>
      ) : bookingsWithPackages.length > 0 ? (
        bookingsWithPackages.map(({ booking, associatedPackage }) => (
          <div key={booking.bookingId} className="card mb-4">
            <div className="row">
              <div className="col-md-5 offset-md-1">
                <div className="card-body">
                  <h5 className="card-title">Package Name: {associatedPackage.packageName}</h5>
                  <p className="card-text">Booking Id: {booking.bookingId}</p>
                  <p className="card-text">Number of People: {booking.numberOfPeople}</p>
                  <p className="card-text">Booking Date: {formatDate(booking.bookingDate)}</p>
                  <p className="card-text">Booking-Confirmation: {getConfirmationStatus(booking.isConfirmed)}</p>
                  <div>
                    <button className="btn btn-danger mt-2" onClick={() => handleShowCancelModal(booking.bookingId)}>
                      Cancel Booking
                    </button>

                    <Modal show={showCancelModal} onHide={handleCloseCancelModal}>
                      <Modal.Header closeButton>
                        <Modal.Title>Confirm Cancellation</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        Are you sure you want to cancel this booking?
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseCancelModal}>
                          No
                        </Button>
                        <Button variant="danger" onClick={() => handleCancelBooking(bookingToCancel)}>
                          Yes, Cancel Booking
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </div>
                </div>
              </div>
              <div className="col-md-4 d-flex justify-content-center align-items-center">
                <div className="row justify-content-end">
                  <div className="col-md-3">
                    <img
                      src={`https://localhost:7087/Uploads/${associatedPackage.image}`}
                      alt={associatedPackage.packageName}
                      className='img-fluid rounded'
                      style={{ maxWidth: '200px' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No confirmed tours found.</p>
      )}
    </div>
  );
}

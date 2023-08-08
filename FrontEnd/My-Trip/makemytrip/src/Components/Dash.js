import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Dash() {
  const [bookingsWithPackages, setBookingsWithPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [travelerData, setTravelerData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch traveler data based on the session storage ID
        const travelerId = sessionStorage.getItem('TravellerId');
        const travelerResponse = await axios.get(`https://localhost:7132/api/Travellers/${travelerId}`);
        const bookingsResponse = await axios.get('https://localhost:7132/api/Booking');
        const packagesResponse = await axios.get('https://localhost:7087/api/TourPackage');

        const bookings = bookingsResponse.data;
        const packages = packagesResponse.data;
        const traveler = travelerResponse.data;

        // Match each booking with its associated package
        const bookingsWithPackagesData = bookings
          .map((booking) => {
            const associatedPackage = packages.find((pkg) => pkg.packageId === booking.packageId);
            return { booking, associatedPackage };
          })
          .filter((data) => data.booking.isConfirmed === 1 && data.booking.bookingId === travelerId);

        setBookingsWithPackages(bookingsWithPackagesData);
        setTravelerData(traveler);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  

  // Function to get the Confirmation status text
  const getConfirmationStatus = (isConfirmed) => {
    return isConfirmed ? 'Successful' : 'Pending'; 
  };

  const getItineraryPoints = (itineraryDetails) => {
    return itineraryDetails.split('.');
  };

  const formatDate = (dateTimeString) => {
    const dateObj = new Date(dateTimeString);
    return dateObj.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
  };
  
  
const calculateTourCost = (booking) => {
  const { numberOfPeople, associatedPackage } = booking;
  if (!associatedPackage) {
    return 0; 
  }
  const { price } = associatedPackage;
  return numberOfPeople * price;
};



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

  const [showCancelModal, setShowCancelModal] = useState(false);

  const handleShowCancelModal = () => {
    setShowCancelModal(true);
  };
  
  const handleCloseCancelModal = () => {
    setShowCancelModal(false);
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
  <button className="btn btn-danger mt-2" onClick={handleShowCancelModal}>
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
      <Button variant="danger" onClick={() => handleCancelBooking(booking.bookingId)}>
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
                  style={{ maxWidth: '200px' }} // Adjust the value as per your requirement
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

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Payment from './Payment';
import { Modal } from 'react-bootstrap';
import { PDFDownloadLink, Page, Text, Document, View, StyleSheet } from '@react-pdf/renderer';

export default function BookingStatus() {
  const [bookingData, setBookingData] = useState(null);
  const [tourPackage, setTourPackage] = useState(null);
  const [travellerData, setTravellerData] = useState(null); // State to store traveler's data
  
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Define a styles object for PDF
  const styles = StyleSheet.create({
    page: {
      padding: '1cm',
    },
    heading: {
      fontSize: 24,
      textAlign: 'center',
      marginBottom: '1cm',
    },
    section: {
      marginBottom: '1cm',
      fontSize: 16,
    },
    packageName: {
      fontSize: 14,
      fontWeight: 'bold',
    },
    packageText: {
      fontSize: 10,
    },
    footer: {
      fontSize: 10,
      textAlign: 'center',
    },
  });

  const formatDate = (dateTimeString) => {
    const dateObj = new Date(dateTimeString);
    return dateObj.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
  };

  const generatePDF = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.heading}>Bon-Voyage</Text>
        </View>
  
        <View style={{ ...styles.section, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 20, marginBottom: '0.5cm' }}>Welcome to Bon-Voyage</Text>
          <Text style={{ fontSize: 14, color: '#666', lineHeight: '1.5' }}>
            Unravel the World's Finest Destinations
          </Text>
        </View>
  
        <View style={styles.section}>
          <Text style={{ ...styles.packageName, fontSize: 20, marginBottom: '0.5cm' }}>About Us</Text>
          <Text style={{ fontSize: 14, lineHeight: '1.5' }}>
            We are your gateway to extraordinary journeys, offering an exquisite array of destinations and unforgettable
            trips. Our dedicated team is committed to providing you with the finest travel experiences, tailored to your
            dreams and desires. Embark on a journey of a lifetime with us and let the adventure begin!
          </Text>
        </View>
  
        <View style={styles.section}>
          <Text style={styles.heading}>Booking Details</Text>
          <Text style={{ fontSize: 14 }}>Booking Id: {bookingData?.bookingId}</Text>
          <Text style={{ fontSize: 14 }}>Booking Status: {getBookingStatus(bookingData?.isConfirmed)}</Text>
          <Text style={{ fontSize: 14 }}>Number of People: {bookingData?.numberOfPeople}</Text>
        </View>
  
        <View style={styles.section}>
          <Text style={styles.heading}>Traveler Details</Text>
          <Text style={{ fontSize: 14 }}>Name: {travellerData?.travelerName}</Text>
          <Text style={{ fontSize: 14 }}>Email: {travellerData?.travelerEmail}</Text>
        </View>
  
        <View style={styles.section}>
          
          <Text style={styles.heading}>Tour Package Details</Text>
          <Text style={{ fontSize: 14 }}>Package Name: {tourPackage?.packageName}</Text>
          <Text style={{ fontSize: 14 }}>Price: ${tourPackage?.price}</Text>
          <Text style={{ fontSize: 14 }}>Duration: {tourPackage?.duration} days</Text>
          <Text style={{ fontSize: 14 }}>Hotel: {tourPackage?.hotelName}</Text>
          <Text style={{ fontSize: 14 }}>
            Total Price: ${tourPackage?.price * numberOfPeople}
          </Text>
        </View>
  
        <View style={{ ...styles.section, borderTop: '1px solid #ccc', paddingTop: '0.5cm' }}>
          <Text style={{ fontSize: 12, color: '#666', textAlign: 'center' }}>
            Bon Voyage Travel © 2023. All rights reserved.
          </Text>
          <Text style={{ fontSize: 12, color: '#666', textAlign: 'center' }}>
            Contact us: contact@bonvoyagetravel.com | Phone: 9994163873
          </Text>
          <Text style={{ fontSize: 12, color: '#666', textAlign: 'center' }}>
            Follow us on social media:
          </Text>
        </View>
      </Page>
    </Document>
  );
  
  useEffect(() => {
    // Fetch the traveler's data using the TravellerId from Session Storage
    const storedTravellerId = sessionStorage.getItem('TravellerId');
    if (storedTravellerId) {
      axios
        .get(`https://localhost:7132/api/Travellers/${storedTravellerId}`)
        .then((response) => {
          setTravellerData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching traveler data:', error);
        });
    }
  }, []);


  useEffect(() => {
    const storedBookingId = sessionStorage.getItem('BookingId');
    const storedPackageId = sessionStorage.getItem('PackageId');

    if (storedBookingId && storedPackageId) {
      fetch(`https://localhost:7132/api/Booking/${storedBookingId}`)
        .then((response) => response.json())
        .then((data) => {
          setBookingData(data);
        })
        .catch((error) => {
          console.error('Error fetching booking data from API:', error);
        });

      axios.get(`https://localhost:7087/api/TourPackage/${storedPackageId}`)
        .then(response => {
          setTourPackage(response.data);
        })
        .catch(error => {
          console.error('Error fetching tour package:', error);
        });
    } else {
      console.error('BookingId or PackageId not found in Session Storage');
    }
  }, []);

  const location = useLocation();
  
  const numberOfPeople = location.state?.numberOfPeople || 1; // Get the number of persons from the state, default to 1 if not available.
  
  const getBookingStatus = (isConfirmed) => {
    return isConfirmed === 0 ? 'Requested' : 'Successful';
  };

  const handlePayNowClick = () => {
    setShowPaymentModal(true);
  };

  const handleCloseModal = () => {
    setShowPaymentModal(false);
  };

  return (
    <div style={{marginTop: '8%'}} className="container">
        
    <div className="row">
    <div className="col-md-4 offset-md-2">
        <h1>Booking Status</h1>
        {bookingData ? (
          <>
            <p>Booking Id: {bookingData.bookingId}</p>
            <p>Booking Status: {getBookingStatus(bookingData.isConfirmed)}</p>
            <p>Number of People: {bookingData.numberOfPeople}</p>
          </>
        ) : (
          <p>Loading booking data...</p>
        )}
        {travellerData ? (
            <>
              <h2>Traveler Details</h2>
              <p>Name: {travellerData.travelerName}</p>
              <p>Email: {travellerData.travelerEmail}</p>
            </>
          ) : (
            <p>Loading traveler details...</p>
          )}
        </div>
      
      

        <div className="col-md-3 offset-md-1">
        {tourPackage ? (
          <div className="card">
            <img
        src={`https://localhost:7087/Uploads/${tourPackage.image}`}
        alt="Tour Package"
              className="card-img-top"
              style={{ height: '200px', objectFit: 'cover' }}
            />
            <div className="card-body">
              <h2 className="card-title">{tourPackage.packageName}</h2>
              <p className="card-text">Price: {tourPackage.price}</p>
              <p className="card-text">Duration: {tourPackage.duration}</p>
              <p className="card-text">Hotel: {tourPackage.hotelName}</p>
              <hr/>
              <center><p>Total Price: {tourPackage.price * numberOfPeople}</p></center>
              
              <div className="text-center">
{bookingData && bookingData.isConfirmed === 1 ? (
  <>
    <PDFDownloadLink document={generatePDF(bookingData)} fileName="booking_details.pdf">
      {({ loading }) => (
        <button className="btn btn-primary">
          {loading ? 'Loading document...' : 'Download PDF'}
        </button>
      )}
    </PDFDownloadLink>
    <span className="separator"> | </span>

    <button className="btn btn-danger ml-2" disabled>
      Paid
    </button>
  </>

  ) : (
    <button
      className="btn btn-primary"
      onClick={handlePayNowClick}
      disabled={!bookingData || !tourPackage}
    >
      Pay Now
    </button>
  )}
</div>

            </div>
          </div>
        ) : (
          <p>Loading tour package data...</p>
        )}
      </div>
    </div>
    <br/>


    
    <Modal show={showPaymentModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Payment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Payment onCloseModal={handleCloseModal} />
        </Modal.Body>
      </Modal>
  </div>
  );
}

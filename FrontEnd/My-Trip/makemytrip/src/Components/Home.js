import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios to make API requests
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';
import Footer from './Footer';
import FeedbackView from './FeedbackView';
import PackageView from './PackageView';

export default function Home() {
  const [tourData, setTourData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7117/api/ImageGallery');
        setTourData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const displayedTourData = tourData.slice(0, 3);

  const handleViewButtonClick = (tour) => {
    console.log('View button clicked for:', tour.tourName);
  };

  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get('https://localhost:7132/api/Feedback');
      setFeedbacks(response.data);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    }
  };

  const renderStars = (rating) => {
    const fullStars = '★'.repeat(rating);
    const emptyStars = '☆'.repeat(5 - rating);
    return (
      <span>
        {fullStars}
        {emptyStars}
      </span>
    );
  };

  return (
    <div>
      <section id="hero" className="d-flex align-items-center">
        <div style={{
          position: 'absolute',
          top: '60%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          width: '50%'
        }}>
          <h1>Welcome to Bon-Voyage</h1>
          <h2> Unravel the World's Finest Destinations</h2>
          <a href="#about" className="btn btn-primary btn-get-started scrollto">Get Started</a>
        </div>
      </section>
      <section id="about" className="departments" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10%' }}>
        <div className="container">
          <div className="section-title">
            <h2>About Us</h2>
            <p>We are your gateway to extraordinary journeys, offering an exquisite array of destinations and unforgettable trips. Our dedicated team is committed to providing you with the finest travel experiences, tailored to your dreams and desires. Embark on a journey of a lifetime with us and let the adventure begin!</p>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="row">
          {tourData.slice(0, 3).map((tour) => (
            <div key={tour.tourId} className="col-md-4">
              <div className="card my-bg-glass">
              <div
                className="card-img-top rounded-t-lg"
                style={{
                  height: '450px',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundImage: `url(https://localhost:7117/Uploads/${tour.locationImage})`,
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: 0,
                    transition: 'opacity 0.3s',
                  }}
                  onMouseEnter={(e) => (e.target.style.opacity = '1')}
                  onMouseLeave={(e) => (e.target.style.opacity = '0')}
                ><h5 style={{ fontSize: '1.25rem', color: 'white' }}>
                {tour.tourName}
              </h5>
                  </div>
                  </div>
                <div className="card-body text-center">
                  <p className="card-text">{tour.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <br /><br />
  <center><Link to="/tourpackage" className="btn btn-primary">Know More</Link></center>
      </div>

        <PackageView/>

      <section id="services" className="services">
        <div className="container">
          
          <div className="section-title">
            <h2>Our Tours Services</h2>
            <p>Explore a world of possibilities with our tailor-made tour packages, where every detail is designed to suit your unique preferences. Create your dream vacation with personalized itineraries, handpicked activities, and accommodations that match your style and budget.</p>
          </div><br/><br/><br/>


          <div className="row">
            <div className="col-lg-4 col-md-6 d-flex align-items-stretch">
              <div className="icon-box" style={{ padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#ffffff', transition: 'transform 0.3s ease' }}>
                <div className="icon"><i className="fas fa-hiking"></i></div>
                <h4>Adventure Tours</h4>
                <p>Experience the thrill of adventure with our carefully crafted tours for the daring souls. From trekking through lush jungles to scaling towering peaks, our adventure tours offer an unforgettable experience.</p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0">
              <div className="icon-box" style={{ padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#ffffff', transition: 'transform 0.3s ease' }}>
                <div className="icon"><i className="fas fa-umbrella-beach"></i></div>
                <h4>Beach Escapes</h4>
                <p>Relax and unwind with our beach escape tours, where sun-kissed shores and crystal-clear waters await you. Bask in the tropical paradise and enjoy the serene beauty of coastal landscapes.</p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0">
              <div className="icon-box" style={{ padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#ffffff', transition: 'transform 0.3s ease' }}>
                <div className="icon"><i className="fas fa-camera-retro"></i></div>
                <h4>Cultural Photography</h4>
                <p>Immerse yourself in diverse cultures and capture their essence through your lens. Our cultural photography tours offer an opportunity to embrace local traditions and document authentic experiences.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

<section>
<div className="container">
<div className="section-title">
            <h2>Customer Feedback</h2>
          </div>     
          <div className="row">
    {feedbacks.map((feedback) => (
      <div key={feedback.feedbackId} className="col-md-3 mb-4">
        <div className="card">
          <div className="card-body">
            
            <h5 className="card-title">
              Rating: <span style={{ color: 'primary', fontSize: '1.5rem' }}>{'★'.repeat(feedback.rating)}{'☆'.repeat(5 - feedback.rating)}</span>
            </h5>
            <p><b style={{ fontSize: '1.2rem', color: '#333', marginBottom: '10px' }}>{feedback.traveller.travelerName}</b></p>
            <p className="card-text">{feedback.description}</p>
           
          </div>
        </div>
      </div>
    ))}
  </div>
    </div>
    </section>    
<Footer/>
    </div>
  );
}

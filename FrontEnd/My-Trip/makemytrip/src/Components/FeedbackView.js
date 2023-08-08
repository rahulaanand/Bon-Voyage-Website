import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function FeedbackView() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    // Fetch feedbacks when the component mounts
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

  return (
    <div className="container mt-4">
    <h2 className="text-center">FeedbackView</h2>
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {feedbacks.map((feedback) => (
        <div key={feedback.PackageId} className="col">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Package ID: {feedback.packageId}</h4>
              <p className="card-text">Rating: {feedback.rating}</p>
              <p className="card-text">Description: {feedback.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  
  );
}

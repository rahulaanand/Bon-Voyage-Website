import React, { useState } from 'react';
import axios from 'axios';

export default function FeedBack() {
  // State variables to store user input
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState('');

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Fetch Traveller Id and Package Id from session storage
    const travellerId = sessionStorage.getItem('TravellerId');
    const packageId = sessionStorage.getItem('PackageId');

    // Create a feedback object with the user input
    const feedbackData = {
      TravellerId: parseInt(travellerId),
      PackageId: parseInt(packageId),
      Rating: rating,
      Description: description,
    };

    // Post the feedbackData to your backend API using Axios
    axios
      .post('https://localhost:7132/api/Feedback', feedbackData)
      .then((response) => {
        // Handle the response from the backend if needed
        console.log('Feedback submitted successfully!');
      })
      .catch((error) => {
        // Handle errors if any
        console.error('Error submitting feedback:', error);
      });
  };

  return (
    <div>
      <h1>Feedback</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Rating:
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(event) => setRating(parseInt(event.target.value))}
          />
        </label>
        <br />
        <label>
          Comment:
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
}

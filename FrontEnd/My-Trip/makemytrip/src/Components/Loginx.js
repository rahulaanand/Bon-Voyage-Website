// import React, { useState } from 'react';
// import axios from 'axios';
// import Registerx from './Registerx';
// import { toast } from 'react-toastify'; 

// export default function Loginx() {
//   const [credentials, setCredentials] = useState({
//     travelerName: '',
//     password: ''
//   });

//   const [showRegisterModal, setShowRegisterModal] = useState(false);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setCredentials((prevCredentials) => ({
//       ...prevCredentials,
//       [name]: value,
//     }));
//   };

//   const handleShowRegisterModal = () => setShowRegisterModal(true);
//   const handleCloseRegisterModal = () => setShowRegisterModal(false);

//   const handleLogin = async () => {
//     try {
//       const response = await axios.post('https://localhost:7132/api/Token/Traveller', credentials);
//       const token = response.data;
//       localStorage.setItem('token', token.token);
//       sessionStorage.setItem('TravellerId', token.id);
  
//       // Show an alert with the traveler ID
//       window.alert('Traveller ID: ' + token.id);
//     } catch (error) {
//       console.error('Login failed:', error.message);
//     }
//   };
  

//   return (
//     <div>
//       <h2>Login Form</h2>
//       <form style={{ marginTop: '10%' }}>
//         <label>
//           Username:
//           <input
//             type="text"
//             name="travelerName"
//             value={credentials.travelerName}
//             onChange={handleInputChange}
//           />
//         </label>
//         <label>
//           Password:
//           <input
//             type="password"
//             name="password"
//             value={credentials.password}
//             onChange={handleInputChange}
//           />
//         </label>
//         <button type="button" onClick={handleLogin}>
//           Login
//         </button>
//         <button type="button" onClick={handleShowRegisterModal}>
//           Register
//         </button>
//       </form>

//       <div style={{ display: showRegisterModal ? 'block' : 'none' }}>
//         <button onClick={handleCloseRegisterModal}>Close</button>
//         <Registerx handleCloseRegisterModal={handleCloseRegisterModal} />
//       </div>
//     </div>
//   );
// }

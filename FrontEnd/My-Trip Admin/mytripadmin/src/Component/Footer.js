import React from 'react';

const Footer = () => {
  return (
    <footer className="footer bg-dark py-4 ">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-4 text-center text-md-left">
            <p className="text-white mb-0">Bon Voyage Travel © {new Date().getFullYear()}. All rights reserved.</p>
          </div>
          <div className="col-12 col-md-4 text-center">
            <p className="text-white mb-0">Contact us: contact@bonvoyagetravel.com | Phone_Number: 9994163873</p>
          </div>
          <div className="col-12 col-md-4 text-center text-md-right">
            <p className="text-white mb-0">Follow us on social media:</p>
            {/* Add your social media icons and links here */}
            
            <a href="https://www.facebook.com/bonvoyagetravel" className="text-white me-3"><i className="fab fa-facebook"></i></a>
            <a href="https://www.instagram.com/rahul.sk_/" className="text-white me-3"><i className="fab fa-instagram"></i></a>
            
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

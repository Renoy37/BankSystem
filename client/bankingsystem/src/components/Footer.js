import React from 'react';

function Footer() {
  return (
    <footer className={footerStyle}>
      <div className="footer-content">
        <div className="footer-column">
          <h4>About Us</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
        <div className="footer-column">
          <h4>Services</h4>
          <ul>
            <li>Savings Accounts</li>
            <li>Checking Accounts</li>
            <li>Loans</li>
            <li>Investment Management</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Contact Us</h4>
          <p>Email: example@example.com</p>
          <p>Phone: 123-456-7890</p>
          <p>Address: 123 Main Street, City, Country</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Your Bank Name. All rights reserved.</p>
      </div>
    </footer>
  );
}



export default Footer;

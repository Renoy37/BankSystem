import React from 'react';

function Footer() {
  return (
    <footer className= 'footerStyle'>
      <div className="footer-content">
        <div className="footer-column">
          <h4>About Us</h4>
          <p>With our intuitive app, easily track transactions, check balances, and update profiles with just a tap. Simplify your banking experience with Consage.</p>
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
          <p>Email: coinsage@gmail.com</p>
          <p>Phone: 123-456-7890</p>
          <p>Address: 123 Main Street, City, Country</p>
        </div>
        
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Coin Sage. All rights reserved.</p>
      </div>
    </footer>
  );
}



export default Footer;

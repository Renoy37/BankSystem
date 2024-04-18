import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/menu" className="nav-link">
            Menu
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/transactions" className="nav-link">
            Transactions
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/details" className="nav-link">
            Details
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

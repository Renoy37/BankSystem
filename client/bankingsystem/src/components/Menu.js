import React from 'react';
import { Link } from 'react-router-dom';


function Menu() {
  return (
    <div className='menu_contain'>
      <h1>Menu</h1>
      <ul className="menu-list">
        <li className="menu-item">
          Account Overview
          <ul className="submenu">
            <li className="submenu-item">
            <Link to="/details" className='hover-links'>
             View Profile
            </Link>
            </li>
            <li className="submenu-item">
            <Link to="/details" className='hover-links'>
             Edit Profile
            </Link>
            </li>
          </ul>
        </li>
        <li className="menu-item">
          Check Balance
          <ul className="submenu">
            <li className="submenu-item">
            <Link to="/details" className='hover-links'>
             Savings Account
            </Link>
            </li>
            <li className="submenu-item">
            <Link to="/details" className='hover-links'>
              Checking Account
            </Link>
            </li>
          </ul>
        </li>
        <li className="menu-item">
          Withdraw
          <ul className="submenu">
            <li className="submenu-item">ATM Withdrawal</li>
            <li className="submenu-item">Branch Withdrawal</li>
          </ul>
        </li>
        <li className="menu-item">
          Deposit
          <ul className="submenu">
            <li className="submenu-item">ATM Deposit</li>
            <li className="submenu-item">Branch Deposit</li>
          </ul>
        </li>
        <li className="menu-item">
          Transfer
          <ul className="submenu">
            <li className="submenu-item">Within Accounts</li>
            <li className="submenu-item">To Other Accounts</li>
          </ul>
        </li>
        <li className="menu-item">Transaction History</li>
        <li className="menu-item">Change PIN</li>
        <li className="menu-item">Request Statement</li>
      </ul>
    </div>
  );
}

export default Menu;

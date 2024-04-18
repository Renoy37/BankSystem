import React from 'react';

function Menu() {
  return (
    <div>
      <h1>Menu</h1>
      <ul className="menu-list">
        <li className="menu-item">
          Account Overview
          <ul className="submenu">
            <li className="submenu-item">View Profile</li>
            <li className="submenu-item">Edit Profile</li>
          </ul>
        </li>
        <li className="menu-item">
          Check Balance
          <ul className="submenu">
            <li className="submenu-item">Savings Account</li>
            <li className="submenu-item">Checking Account</li>
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

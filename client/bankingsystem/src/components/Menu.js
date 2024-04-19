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
            <li className="submenu-item" onClick={handleWithdrawClick}>ATM Withdrawal</li>
          </ul>
        </li>
        <li className="menu-item">
          Deposit
          <ul className="submenu">
            <li className="submenu-item" onClick={handleDepositClick}>ATM Deposit</li>
          </ul>
        </li>
        <li className="menu-item">
          Transfer
          <ul className="submenu">
            <li className="submenu-item" onClick={handleTransferClick}>Within Accounts</li>
          </ul>
        </li>
      </ul>



     
    </div>
  );
}

export default Menu;

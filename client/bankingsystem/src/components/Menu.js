import React, { useState } from 'react';

function Menu() {
  const [amount, setAmount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [action, setAction] = useState(null); // New state to track selected action

  const handleCheckBalanceClick = () => {
    // Simulated logic to fetch balance for savings account
    const savingsBalance = 1000; // Assuming balance is ksh1000
    setBalance(savingsBalance);
    setAmount('check_balance');
    setAction(null); // Reset selected action
  };

  const handleWithdrawClick = () => {
    setAmount('withdraw');
    setAction('withdraw'); // Set selected action
  };

  const handleDepositClick = () => {
    setAmount('deposit');
    setAction('deposit'); // Set selected action
  };

  const handleTransferClick = () => {
    setAmount('transfer');
    setAction('transfer'); // Set selected action
  };

  const handleDismissPopup = () => {
    setAmount(null);
    setAction(null); // Reset selected action
  };

  return (
    <div style={menuContainerStyle}>
      <h1 onClick={handleDismissPopup}>Menu</h1> {/* Dismiss popup on click */}
      <ul className="menu-list">
        <li className="menu-item">
          Check Balance
          <ul className="submenu">
            <li className="submenu-item" onClick={handleCheckBalanceClick}>Savings Account</li>
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

      {amount === 'check_balance' && balance !== null && (
        <div style={messageContainerStyle}>
          <h2>Your Savings Account Balance:</h2>
          <p>ksh{balance}</p>
        </div>
      )}

      {/* Only show "Enter Amount" message when a specific action requiring an amount is selected */}
      {amount !== 'check_balance' && action && (
        <div style={messageContainerStyle}>
          <h2>Enter Amount:</h2>
          <input type="number" placeholder="Amount" />
          <button>Submit</button>
        </div>
      )}

      <footer onClick={handleDismissPopup}></footer> {/* Dismiss popup on click */}
      <nav onClick={handleDismissPopup}></nav> {/* Dismiss popup on click */}
    </div>
  );
}

const menuContainerStyle = {
  position: 'relative'
};

const messageContainerStyle = {
  position: 'absolute',
  top: '-100px', // Adjust as needed
  left: '50%', // Center horizontally
  transform: 'translateX(-50%)', // Center horizontally precisely
  backgroundColor: 'white',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '5px'
};

export default Menu;

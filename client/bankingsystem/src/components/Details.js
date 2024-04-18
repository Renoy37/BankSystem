import React from 'react';
import { Icon } from '@iconify/react';


function Details( ) {

    const accountOverview = {
        savingsBalance: 5000,
        checkingBalance: 2500,
        accountNumber: '1234567890',
        linkedAccounts: ['9876543210', '5678901234'],
      };
    
      const recentTransactions = [
        { type: 'Deposit', amount: 1000, date: '2024-04-15' },
        { type: 'Withdrawal', amount: 200, date: '2024-04-14' },
        { type: 'Transfer', amount: 500, date: '2024-04-13' },
      ];

  return (
    <div className="user-details-container">
      <h1>User Details</h1>
      <div className="user-details">
        <div className="profile-icon">
            <div><Icon icon="iconamoon:profile-circle" className='icon'/></div>
          {/* Add profile icon image here */}
        </div>
        <div className="details-grid">
          <div className="detail">
            <label htmlFor="name">Name:</label>
            {/* <span>{user.name}</span> */}
            <p>User One</p>
          </div>
          <div className="detail">
            <label htmlFor="address">Address:</label>
            {/* <span>{user.address}</span> */}
            <p>0000000000</p>
          </div>
          <div className="detail">
            <label htmlFor="phone">Phone Number:</label>
            {/* <span>{user.phone}</span> */}
            <p>11111111111</p>
          </div>
          <div className="detail">
            <label htmlFor="email">Email:</label>
            {/* <span>{user.email}</span> */}
            <p>User@example.com</p>
          </div>
          <div className="detail">
            <label htmlFor="dateOfBirth">Date of Birth:</label>
            {/* <span>{user.dateOfBirth}</span> */}
            <p>12/12/2000</p>
          </div>
          <div className="detail">
            <label htmlFor="gender">Gender:</label>
            {/* <span>{user.gender}</span> */}
            <p>Male</p>
          </div>
          <div className="detail">
            <label htmlFor="nationality">Nationality:</label>
            {/* <span>{user.nationality}</span> */}
            <p>Indian</p>
          </div>
        </div>
      </div>

      {/* Account Overview Section */}
      <section className="account-overview">
        <h2>Account Overview</h2>
        <div className="account-summary">
          <div className="account">
            <h3>Savings Account</h3>
            <p>Balance: ${accountOverview.savingsBalance}</p>
            <p>Account Number: {accountOverview.accountNumber}</p>
          </div>
          <div className="account">
            <h3>Checking Account</h3>
            <p>Balance: ${accountOverview.checkingBalance}</p>
            <p>Account Number: {accountOverview.accountNumber}</p>
          </div>
        </div>
        <div className="linked-accounts">
          <h3>Linked Accounts</h3>
          <ul>
            {accountOverview.linkedAccounts.map(account => (
              <li key={account}>{account}</li>
            ))}
          </ul>
        </div>
      </section>

    </div>
  );
}

export default Details;

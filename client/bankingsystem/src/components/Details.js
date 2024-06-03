import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import Navbar from './Navbar';
import Footer from './Footer';
import UserDetailsForm from './UserDetailsForm';

function Details({ accessToken }) {
  const [userDetails, setUserDetails] = useState(null);
  const [accountDetails, setAccountDetails] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetch('https://banksystem-26.onrender.com/user_details', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserDetails(data);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, [accessToken]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/account_details', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAccountDetails(data);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, [accessToken]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSubmit = (updatedDetails) => {
    fetch('http://127.0.0.1:5000/edit_user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(updatedDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('User details updated successfully:', data);
        setUserDetails(updatedDetails);
        setEditMode(false);
      })
      .catch((error) => {
        console.error("Error updating user details:", error);
      });
  };

  return (
    <>
      <Navbar />
      <div className="user-details-container">
        <h1>User Details</h1>
        {editMode ? (
          <UserDetailsForm userDetails={userDetails} onSubmit={handleSubmit} />
        ) : (
          userDetails && (
            <div className="user-details">
              <div className="profile-icon">
                <div>
                  <Icon icon="iconamoon:profile-circle" className='icon' />
                </div>
              </div>
              <div className="details-grid">
                <div className="detail">
                  <label htmlFor="name">Name:</label>
                  <p>{userDetails.name}</p>
                </div>
                <div className="detail">
                  <label htmlFor="address">Address:</label>
                  <p>{userDetails.address}</p>
                </div>
                <div className="detail">
                  <label htmlFor="phone">Phone Number:</label>
                  <p>{userDetails.phone_number}</p>
                </div>
                <div className="detail">
                  <label htmlFor="email">Email:</label>
                  <p>{userDetails.email}</p>
                </div>
                <div className="detail">
                  <label htmlFor="dateOfBirth">Date of Birth:</label>
                  <p>{userDetails.date_of_birth}</p>
                </div>
                <div className="detail">
                  <label htmlFor="gender">Gender:</label>
                  <p>{userDetails.gender}</p>
                </div>
                <div className="detail">
                  <label htmlFor="nationality">Nationality:</label>
                  <p>{userDetails.nationality}</p>
                </div>
                <button onClick={handleEdit} className='details_edit'>Edit</button>
              </div>
            </div>
          )
        )}

        <section className="account-overview">
          <h2>Account Overview</h2>
          {accountDetails && accountDetails.accounts && (
            <div className="account-summary">
              {accountDetails.accounts.map((account, index) => (
                <div key={index} className="account">
                  <h3>{account.type} Account</h3>
                  <p>Balance: ${account.balance}</p>
                  <p>Account Number: {account.account_number}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Details;

import React from 'react';
import { Icon } from '@iconify/react';


function Details({ user }) {
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
          </div>
          <div className="detail">
            <label htmlFor="address">Address:</label>
            {/* <span>{user.address}</span> */}
          </div>
          <div className="detail">
            <label htmlFor="phone">Phone Number:</label>
            {/* <span>{user.phone}</span> */}
          </div>
          <div className="detail">
            <label htmlFor="email">Email:</label>
            {/* <span>{user.email}</span> */}
          </div>
          <div className="detail">
            <label htmlFor="dateOfBirth">Date of Birth:</label>
            {/* <span>{user.dateOfBirth}</span> */}
          </div>
          <div className="detail">
            <label htmlFor="gender">Gender:</label>
            {/* <span>{user.gender}</span> */}
          </div>
          <div className="detail">
            <label htmlFor="nationality">Nationality:</label>
            {/* <span>{user.nationality}</span> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;

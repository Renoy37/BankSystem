import React, { useState } from 'react';

function UserDetailsForm({ userDetails, onSubmit }) {
  const [updatedDetails, setUpdatedDetails] = useState(userDetails);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedDetails({ ...updatedDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(updatedDetails);
  };

  return (
    <form onSubmit={handleSubmit} className="user-details-form">
      <label htmlFor="name" className="form-label">Name:</label>
      <input type="text" name="name" value={updatedDetails.name} onChange={handleChange} className="form-input" />

      <label htmlFor="address" className="form-label">Address:</label>
      <input type="text" name="address" value={updatedDetails.address} onChange={handleChange} className="form-input" />

      <label htmlFor="phoneNumber" className="form-label">Phone Number:</label>
      <input type="text" name="phoneNumber" value={updatedDetails.phoneNumber} onChange={handleChange} className="form-input" />

      <label htmlFor="email" className="form-label">Email:</label>
      <input type="email" name="email" value={updatedDetails.email} onChange={handleChange} className="form-input" />

      <label htmlFor="dateOfBirth" className="form-label">Date of Birth:</label>
      <input type="date" name="dateOfBirth" value={updatedDetails.dateOfBirth} onChange={handleChange} className="form-input" />

      <label htmlFor="gender" className="form-label">Gender:</label>
      <input type="text" name="gender" value={updatedDetails.gender} onChange={handleChange} className="form-input" />

      <label htmlFor="nationality" className="form-label">Nationality:</label>
      <input type="text" name="nationality" value={updatedDetails.nationality} onChange={handleChange} className="form-input" />

      <button type="submit" className="save-button">Save</button>
    </form>
  );
}

export default UserDetailsForm;

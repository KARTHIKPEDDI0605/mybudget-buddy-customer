import React, { useState } from 'react';

const Profile = () => {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', password: '', role: '', username: '', address: '', district: '', state: '', country: '', gender: '', pincode: '', dob: '', phoneNumber: '', services: []
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit to backend
    fetch('/api/profile-update', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
  };

  return (
    <div className="profile-update">
      <h1>Update Profile</h1>
      <form onSubmit={handleSubmit}>
        <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" required />
        <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required />
        <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="Email" required />
        <input name="password" value={formData.password} onChange={handleChange} type="password" placeholder="Password" required />
        <input name="role" value={formData.role} onChange={handleChange} placeholder="Role" required />
        <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
        <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" required />
        <input name="district" value={formData.district} onChange={handleChange} placeholder="District" required />
        <input name="state" value={formData.state} onChange={handleChange} placeholder="State" required />
        <input name="country" value={formData.country} onChange={handleChange} placeholder="Country" required />
        <input name="gender" value={formData.gender} onChange={handleChange} placeholder="Gender" required />
        <input name="pincode" value={formData.pincode} onChange={handleChange} placeholder="Pincode" pattern="\d{6}" required />
        <input name="dob" value={formData.dob} onChange={handleChange} type="date" required />
        <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone (e.g., +911234567890)" pattern="\+\\d{1,3}\\d{10,15}" required />
        <input name="services" value={formData.services} onChange={handleChange} placeholder="Services (comma-separated)" />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default Profile;
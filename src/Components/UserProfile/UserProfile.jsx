import React, { useState, useEffect } from "react";
import axios from "axios";
import "./userProfile.css";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem('userId'); // Fetch the user ID from localStorage or another source

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/userProfiles/${userId}`);
        setUser(response.data);
      } catch (error) {
        const message = error.response?.data?.message || "Error fetching user profile";
        setError(message);
        console.error(error);
      }
    };

    if (userId) {
      fetchUserProfile();
    } else {
      setError("User not logged in");
    }
  }, [userId]);

  if (error) return <p>{error}</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <div className="userProfile container">
      <h2>Personal info</h2>
      <p>Info about you and your preferences across our services</p>

      <section className="profileSection">
        <h3>Your profile info</h3>
        <p>Personal info and options to manage it. You can make some of this info visible to others.</p>

        <div className="infoBox">
          <h4>Basic info</h4>
          <div className="infoRow">
            <span>Profile picture</span>
            <img src={user.profilePicture || 'defaultProfilePicture.png'} alt="Profile" className="profilePicture" />
          </div>
          <div className="infoRow">
            <span>Name</span>
            <span>{user.name || 'N/A'}</span>
          </div>
          <div className="infoRow">
            <span>Birthday</span>
            <span>{user.birthdate ? new Date(user.birthdate).toLocaleDateString() : 'N/A'}</span>
          </div>
          <div className="infoRow">
            <span>Gender</span>
            <span>{user.gender || 'N/A'}</span>
          </div>
        </div>

        <div className="infoBox">
          <h4>Contact info</h4>
          <div className="infoRow">
            <span>Email</span>
            <span>{user.email || 'N/A'}</span>
          </div>
          <div className="infoRow">
            <span>Phone</span>
            <span>{user.phone || 'N/A'}</span>
          </div>
        </div>

        <div className="infoBox">
          <h4>Addresses</h4>
          <div className="infoRow">
            <span>Home</span>
            <span>{user.address?.home || 'N/A'}</span>
          </div>
          <div className="infoRow">
            <span>Work</span>
            <span>{user.address?.work || 'N/A'}</span>
          </div>
          <div className="infoRow">
            <span>Other</span>
            <span>{user.address?.other || 'N/A'}</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserProfile;

import React from 'react';
import { useAuth } from "../pages/AuthContext"
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  // Get everything we need from our authentication context
  const { isLoggedIn, currentUser, logout } = useAuth();
  const navigate = useNavigate();

  // Define what happens when the user clicks "Logout"
  const handleLogout = () => {
    logout(); // This clears the user from our context
    navigate('/'); // This redirects the user back to the homepage
  };

  // This is a "protected" route. If a user who is not logged in
  // somehow gets to this URL, we'll show them a message.
  if (!isLoggedIn) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center' }}>
        <h2>Please log in to view your profile.</h2>
      </div>
    );
  }

  // This is what a logged-in user will see
  return (
    <div style={{ maxWidth: '800px', margin: '4rem auto', padding: '0 2rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>My Profile</h1>
      <p style={{ fontSize: '1.5rem', marginBottom: '3rem' }}>
        Welcome back, <strong>{currentUser}!</strong>
      </p>
      
      {/* You can add more profile sections here in the future */}
      {/* For example: Order History, Manage Addresses, etc. */}
      
      <button 
        onClick={handleLogout} 
        className="submit-btn" // Re-using your button style
        style={{ maxWidth: '250px', margin: '0 auto' }}
      >
        Logout
      </button>
    </div>
  );
}
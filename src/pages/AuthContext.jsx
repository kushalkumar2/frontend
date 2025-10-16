import React, { createContext, useState, useContext } from 'react';
import AuthModal from '../components/AuthModal'; // 1. Import your modal component

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null); // Will store the user's name
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Function to be called from the Navbar to open the modal
  const openAuthModal = () => setIsAuthModalOpen(true);

  // Function to be passed to the modal to close it
  const closeAuthModal = () => setIsAuthModalOpen(false);

  // Function to be called by the modal on successful login/signup
  const handleLoginSuccess = (userName) => {
    setCurrentUser(userName); // Set the logged-in user
  };

  const logout = () => {
    setCurrentUser(null); // Clear the user on logout
  };

  const value = {
    isLoggedIn: !!currentUser, // A user is logged in if currentUser is not null
    currentUser,
    openAuthModal,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      {/* 2. Conditionally render the AuthModal here */}
      {/* It's managed by the context, keeping App.js clean */}
      {isAuthModalOpen && (
        <AuthModal
          closeModal={closeAuthModal}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </AuthContext.Provider>
  );
}
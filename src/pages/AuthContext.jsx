import React, { createContext, useState, useContext, useEffect } from 'react';
import AuthModal from '../components/AuthModal';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  // 1. Initialize state by reading from localStorage
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('currentUser') || null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // 2. Add an effect that syncs localStorage whenever currentUser changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', currentUser);
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  // 3. This function is now perfect. It sets the state, and the useEffect handles localStorage.
  const handleLoginSuccess = (userName) => {
    setCurrentUser(userName);
  };

  // 4. This logout function is also now perfect.
  const logout = () => {
    setCurrentUser(null);
  };

  const value = {
    isLoggedIn: !!currentUser,
    currentUser,
    openAuthModal,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      {isAuthModalOpen && (
        <AuthModal
          closeModal={closeAuthModal}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </AuthContext.Provider>
  );
}
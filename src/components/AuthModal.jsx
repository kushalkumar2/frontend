import React, { useState, useEffect } from "react";
import './AuthModal.css'; 

export default function AuthModal({ closeModal, onLoginSuccess }) {
  const [mode, setMode] = useState("phone"); // phone | otp | email | signup | success
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Load existing users from localStorage on component mount
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  // Helper function to save users to localStorage
  const saveUsers = (updatedUsers) => {
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  };

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (mobile.length === 10) {
      setError("");
      setMode("otp");
    } else {
      setError("Please enter a valid 10-digit mobile number.");
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    setTimeout(() => { // Simulate network delay
      if (otp === "1234") {
        const existingUser = users.find((u) => u.phone === mobile);
        if (existingUser) {
          setMode("success");
          setTimeout(() => {
            onLoginSuccess(existingUser.firstName);
            closeModal();
          }, 1200);
        } else {
          setSignupPhone(mobile);
          setIsLoading(false);
          setMode("signup");
        }
      } else {
        setError("Invalid OTP. Please use 1234.");
        setIsLoading(false);
      }
    }, 500);
  };

  const handleEmailLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setTimeout(() => {
        const existingUser = users.find(
          (u) => u.email === email && u.password === password
        );
        if (existingUser) {
          setMode("success");
          setTimeout(() => {
            onLoginSuccess(existingUser.firstName);
            closeModal();
          }, 1200);
        } else {
          setError("Invalid email or password.");
          setIsLoading(false);
        }
    }, 500);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    setTimeout(() => {
        if (firstName && signupEmail && signupPassword) {
            const userExists = users.find(u => u.email === signupEmail);
            if (userExists) {
                setError("An account with this email already exists. Please login.");
                setIsLoading(false);
                return;
            }

          const newUser = {
            firstName, lastName, phone: signupPhone, email: signupEmail, password: signupPassword,
          };
          const updatedUsers = [...users, newUser];
          saveUsers(updatedUsers);

          setMode("success");
          setTimeout(() => {
            onLoginSuccess(firstName);
            closeModal();
          }, 1200);
        } else {
          setError("Please fill all required fields.");
          setIsLoading(false);
        }
    }, 500);
  };

  const switchMode = (newMode) => {
      setError(""); // Clear errors when switching views
      setMode(newMode);
  }

  return (
    <div className="modal-overlay">
      <div className="auth-modal slide-up">
        <button className="close-btn" onClick={closeModal}>✕</button>

        {mode === "phone" && (
          <div className="fade-in">
            <h2>Login / Signup</h2>
            <p className="subtitle">Enter your mobile number</p>
            <form onSubmit={handlePhoneSubmit}>
              <div className="input-container">
                <span className="country-code">+91</span>
                <input type="tel" placeholder="Enter Mobile Number" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
              </div>
              {error && <p className="error-message">{error}</p>}
              <button type="submit" className="submit-btn">Continue</button>
            </form>
            <div className="social-login">
              <button className="google-btn">Continue with Google</button>
              <button className="facebook-btn">Continue with Facebook</button>
            </div>
            <p className="switch-link" onClick={() => switchMode("email")}>Login with Email instead</p>
          </div>
        )}

        {mode === "otp" && (
          <div className="fade-in">
            <h2>Verify OTP</h2>
            <p className="subtitle">Enter 4-digit OTP sent to +91 {mobile}</p>
            <form onSubmit={handleOtpSubmit}>
              <input type="tel" className="otp-input" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required />
              {error && <p className="error-message">{error}</p>}
              <button type="submit" className="submit-btn" disabled={isLoading}>{isLoading ? 'Verifying...' : 'Verify'}</button>
            </form>
          </div>
        )}

        {mode === "email" && (
          <div className="fade-in">
            <h2>Login with Email</h2>
            <form onSubmit={handleEmailLogin}>
              <input type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              {error && <p className="error-message">{error}</p>}
              <button type="submit" className="submit-btn" disabled={isLoading}>{isLoading ? 'Logging In...' : 'Login'}</button>
            </form>
            <div className="social-login">
              <button className="google-btn">Continue with Google</button>
              <button className="facebook-btn">Continue with Facebook</button>
            </div>
            <p className="switch-link" onClick={() => switchMode("phone")}>Login with Phone instead</p>
            <p className="signup-link" onClick={() => switchMode("signup")}>Don’t have an account? Create Account</p>
          </div>
        )}

        {mode === "signup" && (
          <div className="fade-in">
            <h2>Create Account</h2>
            <form onSubmit={handleSignup}>
              <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
              <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              <input type="tel" placeholder="Phone" value={signupPhone} onChange={(e) => setSignupPhone(e.target.value)} required />
              <input type="email" placeholder="Email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} required />
              <input type="password" placeholder="Password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} required />
              {error && <p className="error-message">{error}</p>}
              <button type="submit" className="submit-btn" disabled={isLoading}>{isLoading ? 'Creating Account...' : 'Sign Up'}</button>
            </form>
            <p className="switch-link" onClick={() => switchMode("email")}>Already have an account? Login</p>
          </div>
        )}

        {mode === "success" && (
          <div className="fade-in success-step">
            <h2>Welcome 👋</h2>
            <p className="success-text">You’re successfully logged in</p>
            <div className="loader"></div>
          </div>
        )}
      </div>
    </div>
  );
}
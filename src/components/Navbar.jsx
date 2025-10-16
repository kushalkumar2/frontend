import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiUser, FiHeart, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../pages/CartContext';
import { useAuth } from '../pages/AuthContext';
import './Navbar.css';

// 1. Define the navigation structure in a data object for cleanliness
const navLinks = [
  { title: 'Topwear', path: '/topwear', sublinks: [
    { title: 'Shirts', path: '/topwear/shirts' },
    { title: 'Polos', path: '/topwear/polos' },
    { title: 'Crew Neck T-Shirt', path: '/topwear/t-shirts' },
  ]},
  { title: 'Bottomwear', path: '/bottomwear', sublinks: [
    { title: 'Jeans', path: '/bottomwear/jeans' },
    { title: 'Pants', path: '/bottomwear/pants' },
  ]},
  { title: 'Athleisure', path: '/athleisure', sublinks: [
    { title: 'Shorts', path: '/athleisure/shorts' },
    { title: 'Joggers', path: '/athleisure/joggers' },
    { title: 'Tank Tops', path: '/athleisure/tank-tops' },
  ]},
];

export default function Navbar() {
  const { cartItemCount } = useCart();
  const { isLoggedIn, currentUser, openAuthModal, logout } = useAuth();
  const navigate = useNavigate();

  // 2. State to manage which dropdown is currently active
  const [activeMenu, setActiveMenu] = useState(null);

  const handleLogout = () => {
    logout();
    setActiveMenu(null); // Close dropdown on logout
    navigate('/');
  };

  return (
    <nav className="navbar" onMouseLeave={() => setActiveMenu(null)}>
      {/* --- Left Section --- */}
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
        CK
        </Link>
      </div>

      {/* --- Right Section --- */}
      <div className="navbar-right">
        <ul className="nav-links">
          {/* 3. Map over the navLinks data to create the menu */}
          {navLinks.map((link) => (
            <li 
              key={link.title} 
              className="nav-item"
              onMouseEnter={() => setActiveMenu(link.title)}
            >
              <Link to={link.path}>{link.title}</Link>
              {/* Conditionally render the dropdown */}
              {activeMenu === link.title && (
                <div className="dropdown-menu">
                  {link.sublinks.map((sublink) => (
                    <Link key={sublink.title} to={sublink.path} className="dropdown-link">
                      {sublink.title}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="search-container">
          <FiSearch className="search-icon" />
          <input type="text" placeholder="Search" />
        </div>

        <div className="nav-icons">
          <button className="icon-btn"><FiHeart size={22} /></button>
          <Link to="/cart" className="icon-btn cart-icon">
            <FiShoppingBag size={22} />
            {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
          </Link>
          {/* 4. Profile Icon with its own dropdown logic */}
          <div 
            className="nav-item profile-item"
            onMouseEnter={() => setActiveMenu('profile')}
          >
            <button className="icon-btn"><FiUser size={22} /></button>
            {activeMenu === 'profile' && (
              <div className="dropdown-menu profile-dropdown">
                {isLoggedIn ? (
                  <>
                    <p className="dropdown-header">Hello, {currentUser}</p>
                    <Link to="/profile" className="dropdown-link">My Profile</Link>
                    <button onClick={handleLogout} className="dropdown-link logout-btn">Sign Out</button>
                  </>
                ) : (
                  <>
                    <p className="dropdown-header">Welcome</p>
                    <button onClick={openAuthModal} className="dropdown-link login-btn">Login / Signup</button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
import React from 'react';
import { FiMenu, FiSearch, FiUser, FiHeart, FiShoppingBag } from 'react-icons/fi';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      {/* Left Section: Menu and Logo */}
      <div className="navbar-left">
        <button className="icon-btn">
          <FiMenu size={24} />
        </button>
        <a href="/" className="navbar-logo">
          CK
        </a>
      </div>

      {/* Middle Section: Search Bar */}
      <div className="navbar-middle">
        <div className="search-container">
          <FiSearch className="search-icon" />
          <input type="text" placeholder="Search for products..." />
        </div>
      </div>

      {/* Right Section: Profile, Wishlist, Cart */}
      <div className="navbar-right">
        <button className="icon-btn">
          <FiHeart size={22} />
        </button>
        <button className="icon-btn">
          <FiShoppingBag size={22} />
        </button>
        <button className="icon-btn">
          <FiUser size={22} />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
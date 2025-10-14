import React from 'react';
import { FiMenu, FiSearch, FiUser, FiHeart, FiShoppingBag } from 'react-icons/fi';
import './Navbar.css';

function Navbar() {
  return (
     <nav className="navbar">
      {/* Left Section: Logo */}
      <div className="navbar-left">
        <a href="/" className="navbar-logo">
          CK
        </a>
      </div>

      {/* Right Section: Contains links, search, and icons all together */}
      <div className="navbar-right">
        {/* Navigation Links */}
        <ul className="nav-links">
          <li><a href="/topwear">Topwear</a></li>
          <li><a href="/bottomwear">Bottomwear</a></li>
          <li><a href="/athleisure">Athleisure</a></li>
        </ul>

        {/* Search Bar */}
        <div className="search-container">
          <FiSearch className="search-icon" />
          <input type="text" placeholder="Search" />
        </div>

        {/* Icons */}
        <div className="nav-icons">
          <button className="icon-btn">
            <FiUser size={22} />
          </button>
          <button className="icon-btn">
            <FiHeart size={22} />
          </button>
          <button className="icon-btn">
            <FiShoppingBag size={22} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Icon (optional, for responsive design) */}
      <button className="icon-btn mobile-menu-btn">
        <FiMenu size={24} />
      </button>
    </nav>
  );
}

export default Navbar;
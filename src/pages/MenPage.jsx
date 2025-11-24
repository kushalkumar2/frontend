// src/components/Navbar.js

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiUser, FiHeart, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../pages/CartContext';
import { useAuth } from '../pages/AuthContext';
import { allProducts } from '../data/allProducts'; 
import './Navbar.css';

// -----------------------------------------------------------------
// 1. UPDATED NAV LINKS ARRAY
// The main links are now Men, Women, and Kids.
// Sublinks are now nested under the 'Men' category only.
// -----------------------------------------------------------------
const primaryNavLinks = [
  { 
    title: 'MEN', 
    path: '/men', 
    sublinks: [ // These sublinks will only be displayed on the main Navbar when hovering over MEN
      { title: 'Topwear', path: '/men/topwear' },
      { title: 'Bottomwear', path: '/men/bottomwear' },
      { title: 'Athleisure', path: '/men/athleisure' },
      // Optional: A link to view all menswear
      { title: 'Shop All Men', path: '/men' },
    ]
  },
  { title: 'WOMEN', path: '/women', sublinks: [] }, // No sublinks for Women
  { title: 'KIDS', path: '/kids', sublinks: [] },   // No sublinks for Kids
];

// Existing men's sub-category links for the nested dropdown structure (Optional but good for quick access)
const menSubCategories = [
  { title: 'Shirts', path: '/men/topwear/shirts' },
  { title: 'Polos', path: '/men/topwear/polos' },
  { title: 'T-Shirts', path: '/men/topwear/t-shirts' },
  { title: 'Jeans', path: '/men/bottomwear/jeans' },
  { title: 'Pants', path: '/men/bottomwear/pants' },
  // ... add more specific sublinks if desired for the dropdown menu
];


export default function Navbar() {
  const { cartItemCount } = useCart();
  const { isLoggedIn, currentUser, openAuthModal, logout } = useAuth();
  const navigate = useNavigate();

  const [activeMenu, setActiveMenu] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Search logic remains the same
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    const filtered = allProducts.filter(product =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filtered);
  }, [searchQuery]);

  const handleLogout = () => {
    logout();
    setActiveMenu(null);
    navigate('/');
  };

  const handleResultClick = () => {
    setSearchQuery('');
    setIsSearchFocused(false);
  };
  
  // Custom logic to handle link click and menu close
  const handleLinkClick = () => {
    setActiveMenu(null);
  };

  return (
    <nav className="navbar" onMouseLeave={() => setActiveMenu(null)}>
      {/* ... Left Section (Logo) ... */}
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">CK</Link>
      </div>

      {/* --- Right Section --- */}
      <div className="navbar-right">
        
        {/* ------------------------------------------------------------- */}
        {/* 2. UPDATED NAV LINKS MAPPING (Primary Categories: M/W/K)    */}
        {/* ------------------------------------------------------------- */}
        <ul className="nav-links">
          {primaryNavLinks.map((link) => (
            <li 
              key={link.title} 
              className="nav-item"
              // Only show dropdown on hover for MEN or PROFILE
              onMouseEnter={() => setActiveMenu(link.title)}
            >
              {/* Main Category Link (MEN, WOMEN, KIDS) */}
              <Link to={link.path} onClick={handleLinkClick}>{link.title}</Link>
              
              {/* Dropdown Menu - ONLY for MEN and if it has sublinks */}
              {link.title === 'MEN' && activeMenu === link.title && link.sublinks.length > 0 && (
                <div className="dropdown-menu">
                  {/* Map the main menswear categories (Topwear, Bottomwear, etc.) */}
                  <div className="dropdown-column">
                    <p className="dropdown-header">Shop By Category</p>
                    {link.sublinks.map((sublink) => (
                      <Link 
                        key={sublink.title} 
                        to={sublink.path} 
                        className="dropdown-link"
                        onClick={handleLinkClick}
                      >
                        {sublink.title}
                      </Link>
                    ))}
                  </div>
                  
                  {/* Additional column for specific sub-sub-categories */}
                  <div className="dropdown-column">
                    <p className="dropdown-header">Trending Now</p>
                    {menSubCategories.slice(0, 5).map((subcat) => (
                        <Link 
                            key={subcat.title} 
                            to={subcat.path} 
                            className="dropdown-link"
                            onClick={handleLinkClick}
                        >
                            {subcat.title}
                        </Link>
                    ))}
                  </div>
                  {/* You can add an image or promotions here */}
                  <div className="dropdown-promo">
                    
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* --- SEARCH BAR (Unchanged) --- */}
        <div className="search-wrapper">
          <div className="search-container">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)} 
            />
          </div>

          {/* --- SEARCH RESULTS DROPDOWN (Unchanged) --- */}
          {isSearchFocused && searchQuery && (
            <div className="search-results-dropdown">
              {searchResults.length > 0 ? (
                searchResults.slice(0, 5).map(product => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className="search-result-item"
                    onClick={handleResultClick}
                  >
                    <img src={product.image} alt={product.title} className="search-result-image" />
                    <div className="search-result-info">
                      <p className="search-result-title">{product.title}</p>
                      <p className="search-result-price">₹{product.price}</p>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="search-no-results">No products found.</div>
              )}
            </div>
          )}
        </div>

        {/* ... Nav Icons (Unchanged) ... */}
        <div className="nav-icons">
          <button className="icon-btn"><FiHeart size={22} /></button>
          <Link to="/cart" className="icon-btn cart-icon">
            <FiShoppingBag size={22} />
            {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
          </Link>
          <div 
            className="nav-item profile-item"
            onMouseEnter={() => setActiveMenu('profile')}
            onMouseLeave={() => setActiveMenu(null)} // Added onMouseLeave for Profile for better control
          >
            <button className="icon-btn"><FiUser size={22} /></button>
            {activeMenu === 'profile' && (
              <div className="dropdown-menu profile-dropdown">
                {isLoggedIn ? (
                  <>
                    <p className="dropdown-header">Hello, {currentUser}</p>
                    <Link to="/profile" className="dropdown-link" onClick={handleLinkClick}>My Profile</Link>
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
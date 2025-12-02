import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  IoSearchOutline,
  IoPersonOutline,
  IoHeartOutline,
  IoBagOutline,
  IoMenuOutline,
  IoCloseOutline
} from 'react-icons/io5';

import { useCart } from '../pages/CartContext';
import { useAuth } from '../pages/AuthContext';
import { allProducts } from '../data/allProducts';
import './Navbar.css';

const navLinks = [
  {
    title: 'Men',
    path: '/topwear',
    sublinks: [
      { title: 'Shirts', path: '/topwear/shirts' },
      { title: 'T-Shirts', path: '/topwear/t-shirts' },
      { title: 'Jeans', path: '/bottomwear/jeans' },
      { title: 'Pants', path: '/bottomwear/pants' },
    ]
  },
  { title: 'Women', path: '/women', sublinks: [] },
  { title: 'Kids', path: '/kids', sublinks: [] },
];

export default function Navbar() {
  const { cartItemCount } = useCart();
  const { user, logout } = useAuth();  // FIXED
  const navigate = useNavigate();
  const location = useLocation();

  const [activeMenu, setActiveMenu] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // NEW: Profile dropdown
  const [openProfile, setOpenProfile] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const closeDropdown = (e) => {
      if (!e.target.closest(".profile-wrapper")) {
        setOpenProfile(false);
      }
    };
    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, []);

  // Scroll transparency logic
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const isTransparent = location.pathname === '/' && !isScrolled && !isMobileMenuOpen;
  const navbarClass = `navbar ${isTransparent ? 'navbar-transparent' : 'navbar-solid'}`;

  // Search Logic
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
    setOpenProfile(false);
    navigate('/');
  };

  const handleResultClick = () => {
    setSearchQuery('');
    setIsSearchFocused(false);
  };

  return (
    <>
      <nav className={navbarClass} onMouseLeave={() => setActiveMenu(null)}>

        {/* Mobile Menu Button */}
        <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(true)}>
          <IoMenuOutline size={28} />
        </button>

        {/* Left Logo */}
        <div className="navbar-left">
          <Link to="/" className="navbar-logo">CK</Link>
        </div>

        {/* Desktop Links */}
        <div className="navbar-center desktop-only">
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.title}
                  className="nav-item"
                  onMouseEnter={() => setActiveMenu(link.title)}
              >
                <Link to={link.path}>{link.title}</Link>
                {activeMenu === link.title && link.sublinks.length > 0 && (
                  <div className="dropdown-menu">
                    {link.sublinks.map((sublink) => (
                      <Link key={sublink.title}
                        to={sublink.path}
                        className="dropdown-link"
                      >
                        {sublink.title}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Icons */}
        <div className="navbar-right">

          {/* Search */}
          <div className={`search-wrapper ${isTransparent ? 'search-transparent' : ''} desktop-search`}>
            <div className="search-container">
              <IoSearchOutline size={24} className="search-icon" />
              <input
                type="text"
                placeholder="SEARCH"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              />
            </div>

            {isSearchFocused && searchQuery && (
              <div className="search-results-dropdown">
                {searchResults.slice(0, 5).map(product => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className="search-result-item"
                    onClick={handleResultClick}
                  >
                    <img src={product.image} alt={product.title} />
                    <div>
                      <p>{product.title}</p>
                      <p>₹{product.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Icons */}
          <div className="nav-icons">

            {/* Wishlist Icon */}
            <Link to="/wishlist" className="icon-btn">
              <IoHeartOutline size={24} />
            </Link>

            {/* Cart Icon */}
            <Link to="/cart" className="icon-btn cart-icon">
              <IoBagOutline size={24} />
              {cartItemCount > 0 && (
                <span className="cart-badge">{cartItemCount}</span>
              )}
            </Link>

            {/* PROFILE DROPDOWN */}
            <div className="profile-wrapper desktop-only">
              <button
                className="icon-btn"
                onClick={() => setOpenProfile(!openProfile)}
              >
                <IoPersonOutline size={24} />
              </button>

              {openProfile && (
                <div className="profile-dropdown">

                  {!user ? (
                    <>
                      <Link to="/login" className="dropdown-item">Login</Link>
                      <Link to="/signup" className="dropdown-item">Create Account</Link>
                    </>
                  ) : (
                    <>
                      <span className="dropdown-welcome">Hello, {user.email}</span>
                      <Link to="/wishlist" className="dropdown-item">My Wishlist</Link>
                      <Link to="/orders" className="dropdown-item">My Orders</Link>

                      <button className="dropdown-item logout-btn" onClick={handleLogout}>
                        Logout
                      </button>
                    </>
                  )}

                </div>
              )}
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile Side Menu */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <span className="navbar-logo" style={{ color: 'black' }}>CK</span>
          <button className="close-menu-btn" onClick={() => setIsMobileMenuOpen(false)}>
            <IoCloseOutline size={30} />
          </button>
        </div>

        <div className="mobile-menu-links">
          {navLinks.map((link) => (
            <div key={link.title} className="mobile-link-group">
              <Link to={link.path} className="mobile-main-link" onClick={() => setIsMobileMenuOpen(false)}>
                {link.title}
              </Link>
              {link.sublinks.map(sub => (
                <Link
                  key={sub.title}
                  to={sub.path}
                  className="mobile-sub-link"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  - {sub.title}
                </Link>
              ))}
            </div>
          ))}

          <div className="mobile-auth-section">
            {!user ? (
              <Link to="/login" className="mobile-auth-btn">Login / Signup</Link>
            ) : (
              <button onClick={handleLogout} className="mobile-auth-btn">
                Logout
              </button>
            )}
          </div>
        </div>
      </div>

    </>
  );
}

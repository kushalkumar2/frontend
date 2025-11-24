import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiUser, FiHeart, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../pages/CartContext';
import { useAuth } from '../pages/AuthContext';
import { allProducts } from '../data/allProducts'; // Import all your products
import './Navbar.css';

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

  const [activeMenu, setActiveMenu] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // This effect runs whenever the user changes the search query
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

  return (
    <nav className="navbar" onMouseLeave={() => setActiveMenu(null)}>
      {/* ... Left Section (Logo) ... */}
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">CK</Link>
      </div>

      {/* --- Right Section --- */}
      <div className="navbar-right">
        {/* ... Nav Links Mapping ... */}
        <ul className="nav-links">
          {navLinks.map((link) => (
            <li 
              key={link.title} 
              className="nav-item"
              onMouseEnter={() => setActiveMenu(link.title)}
            >
              <Link to={link.path}>{link.title}</Link>
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

        {/* --- SEARCH BAR --- */}
        <div className="search-wrapper">
          <div className="search-container">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)} // Delay to allow click on results
            />
          </div>

          {/* --- SEARCH RESULTS DROPDOWN --- */}
          {isSearchFocused && searchQuery && (
            <div className="search-results-dropdown">
              {searchResults.length > 0 ? (
                searchResults.slice(0, 5).map(product => ( // Show max 5 results
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

        {/* ... Nav Icons ... */}
        <div className="nav-icons">
          {/* ... Heart and Cart icons ... */}
          <button className="icon-btn"><FiHeart size={22} /></button>
          <Link to="/cart" className="icon-btn cart-icon">
            <FiShoppingBag size={22} />
            {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
          </Link>
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
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; // We will create this next
import { FiInstagram, FiTwitter, FiFacebook, FiYoutube } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        
        {/* Column 1: Brand Info */}
        <div className="footer-section">
          <h2 className="footer-logo">CK</h2>
          <p>Premium fashion for the modern individual. Quality meets style in every thread.</p>
        </div>

        {/* Column 2: Shopping */}
        <div className="footer-section">
          <h3>Shop</h3>
          <ul>
            <li><Link to="/topwear">Men's Topwear</Link></li>
            <li><Link to="/bottomwear">Men's Bottomwear</Link></li>
            <li><Link to="/women">Women (Coming Soon)</Link></li>
            <li><Link to="/kids">Kids (Coming Soon)</Link></li>
          </ul>
        </div>

        {/* Column 3: Customer Service */}
        <div className="footer-section">
          <h3>Support</h3>
          <ul>
            <li><Link to="/profile">My Account</Link></li>
            <li><Link to="/cart">Track Order</Link></li>
            <li><a href="#">Returns & Exchanges</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>

        {/* Column 4: Socials */}
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#  "><FiInstagram /></a>
            <a href="#"><FiFacebook /></a>
            <a href="#"><FiTwitter /></a>
            <a href="#"><FiYoutube /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} CK Fashion. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
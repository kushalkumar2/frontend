import React from 'react';
import { Link } from 'react-router-dom';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <div className="hero-container">
      {/* Background Image is handled in CSS, or inline style if dynamic */}
      <div className="hero-overlay"></div>
      
      <div className="hero-content">
        <p className="hero-subtitle">NEW ARRIVALS 2025</p>
        <h1 className="hero-title">WEAR YOUR <br /> CONFIDENCE</h1>
        <p className="hero-description">
          Discover the latest trends in men's fashion. 
          Premium quality, designed for the modern individual.
        </p>
        
        <div className="hero-btns">
          <Link to="/topwear">
            <button className="btn btn-primary">Shop Men</button>
          </Link>
          <Link to="/women">
            <button className="btn btn-outline">Shop Women</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
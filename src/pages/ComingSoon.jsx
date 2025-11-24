import React from 'react';
import { Link } from 'react-router-dom';

const ComingSoon = ({ category }) => {
  return (
    <div className="coming-soon-container">
      <h1>{category} Section</h1>
      <h2 style={{ color: '#ff6347' }}>Coming Soon</h2>
      <p>We are working hard to bring you the best fashion for {category.toLowerCase()}.</p>
      
      {/* Button to go back to Men's (Home) */}
      <Link to="/">
        <button className="back-btn">Shop Men's Wear Now</button>
      </Link>
    </div>
  );
};

export default ComingSoon;
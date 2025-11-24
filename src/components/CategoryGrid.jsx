import React from 'react';
import { Link } from 'react-router-dom';
import './CategoryGrid.css';

const categories = [
  {
    id: 1,
    title: "MEN'S CLOTHING",
    image: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?q=80&w=2071&auto=format&fit=crop',
    link: '/topwear' // Redirects to your Men's section
  },
  {
    id: 2,
    title: "WOMEN'S CLOTHING",
    image: 'https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?q=80&w=2070&auto=format&fit=crop',
    link: '/women'
  },
  {
    id: 3,
    title: "KIDS' CLOTHING",
    image: 'https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?q=80&w=2070&auto=format&fit=crop',
    link: '/kids'
  }
];

const CategoryGrid = () => {
  return (
    <div className="category-grid-container">
      {categories.map((cat) => (
        <Link to={cat.link} key={cat.id} className="category-item">
          <div className="category-image-wrapper">
            <img src={cat.image} alt={cat.title} className="category-image" />
          </div>
          
          {/* The White Overlay Box */}
          <div className="category-overlay">
            <span>{cat.title}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryGrid;
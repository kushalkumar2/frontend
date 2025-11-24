import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext'; // Ensure this points to your CartContext
import { trendingData } from '../data/trendingData'; 
// import HeroSection from '../components/HeroSection'; 

import CategoryGrid from '../components/CategoryGrid';
import './HomePage.css';

export default function HomePage() {
  const { addToCart } = useCart();

  return (
    <>
      {/* 1. NEW HERO SECTION (Replaces the Carousel) */}
      {/* <HeroSection /> */}
      
      <CategoryGrid />

      {/* 2. MAIN CONTENT */}
      <main className="homepage-content">
        
        {/* We removed the old "Shop By Category" row to make it cleaner. 
            The Navbar now handles navigation. */}

        <section className="trending-section">
          <h2 className="section-title">Trending Now</h2>
          
          <div className="trending-grid">
            {trendingData.map((product) => (
              <div key={product.id} className="product-card">
                
                {/* Clickable Card */}
                <Link to={`/product/${product.id}`} className="product-card-link">
                  <div className="product-image-container">
                    <img src={product.image} alt={product.title} className="product-image" />
                  </div>
                  
                  <div className="product-info">
                    <h3 className="product-title">{product.title}</h3>
                    <p className="product-price">₹{product.price}</p>
                  </div>
                </Link>

                {/* Add to Cart Button */}
                <button
                  className="add-to-cart-btn-grid"
                  onClick={() => addToCart(product.id)}
                >
                  ADD TO CART
                </button>
              </div>
            ))}
          </div>
        </section>

      </main>
    </>
  );
}
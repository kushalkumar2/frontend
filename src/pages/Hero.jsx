import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../pages/CartContext';
import { trendingData } from '../data/trendingData'; 
import { IoHeartOutline } from 'react-icons/io5';
import HeroSection from '../components/HeroSection';
import CategoryGrid from '../components/CategoryGrid'; 
import './Hero.css'; 

export default function Hero() {
  const { addToCart } = useCart();

  return (
    <>
      <HeroSection />
      <CategoryGrid />

      <main className="homepage-content">
        <section className="trending-section">
          
          {/* --- PREMIUM HEADER UPGRADE --- */}
          <div className="section-header">
            <h2 className="section-title">Trending Now</h2>
            <Link to="/topwear" className="view-all-link">View All</Link>
          </div>
          
          <div className="trending-grid">
            {trendingData.map((product) => (
              <div key={product.id} className="product-card">
                <Link to={`/product/${product.id}`} className="product-card-link">
                  <div className="product-image-container">
                    <img src={product.image} alt={product.title} className="product-image" />
                    
                    {/* Badge & Heart */}
                    <span className="discount-badge">40% OFF</span>
                    <button className="wishlist-btn" onClick={(e) => {
                      e.preventDefault();
                    }}>
                      <IoHeartOutline size={20} />
                    </button>
                  </div>
                  
                  <div className="product-info">
                    <h3 className="product-title">{product.title}</h3>
                    <div className="price-row">
                      <span className="original-price">₹{Math.floor(product.price * 1.4)}</span>
                      <span className="sale-price">₹{product.price}</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
import React from 'react';
import './Hero.css'; // Don't forget the CSS file

import { featuredData } from '../data/featuredData';
import { categoryData } from '../data/categoryData';
import { trendingData } from '../data/trendingData';

export default function Hero() {
  return (
    <main className="homepage-content">
      {/* 1 & 2. Alternating Feature Sections */}
      {featuredData.map((feature) => (
        <section
          key={feature.id}
          className={`feature-section ${feature.layout === 'imageLeft' ? 'image-left' : 'text-left'}`}
        >
          <div className="feature-image">
            <img src={feature.image} alt={feature.alt} />
          </div>
          <div className="feature-text">
            <h2>{feature.title}</h2>
            <p>{feature.description}</p>
            <button className="shop-btn">{feature.buttonText}</button>
          </div>
        </section>
      ))}

      {/* 3. Shop by Category Section */}
      <section className="category-section">
        <h2>Shop by Category</h2>
        <div className="categories-grid">
          {categoryData.map((category) => (
            <div key={category.id} className="category-item">
              <img src={category.image} alt={category.title} />
              <h3>{category.title}</h3>
              <button className="shop-btn-small">VIEW ALL</button>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Trending Products Section */}
      <section className="trending-section">
        <h2>Trending Now</h2>
        <div className="trending-grid">
          {trendingData.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <p>{product.price}</p>
              <button className="add-to-cart-btn">ADD TO CART</button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
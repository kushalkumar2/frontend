import React from 'react';
import { Link } from 'react-router-dom'; // 1. Import Link
import { useCart } from '../context/CartContext';
import { trendingData } from '../data/trendingData';
import './HomePage.css';
// ... other imports

export default function HomePage() {
  const { addToCart } = useCart();

  return (
    <main className="homepage-content">
      {/* ... other sections ... */}
      <section className="trending-section">
        <h2>Trending Now</h2>
        <div className="trending-grid">
          {trendingData.map((product) => (
            // This is the same structure as ProductGrid.js
            <div key={product.id} className="product-card">
              <Link to={`/product/${product.id}`} className="product-card-link">
                <div className="product-image-container">
                   <img src={product.image} alt={product.title} className="product-image" />
                </div>
                <div className="product-info">
                  <h3>{product.title}</h3>
                  <p>₹{product.price}</p>
                </div>
              </Link>
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
  );
}
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from './CartContext';
import { allProducts } from '../data/allProducts'; // Make sure you have this master list!
import { IoHeartOutline } from 'react-icons/io5';
import './Hero.css'; // Re-use the Premium CSS we already wrote

const ShopPage = ({ baseCategory }) => {
  const { subcategory } = useParams(); // Reads "shirts", "jeans" from URL
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let filtered = allProducts;

    // 1. Filter by Base Category (e.g., 'topwear') passed from App.jsx
    if (baseCategory) {
      filtered = filtered.filter(p => p.category === baseCategory);
    }

    // 2. Filter by Subcategory (e.g., 'shirts') from URL
    if (subcategory) {
      filtered = filtered.filter(p => p.subcategory === subcategory);
    }

    setProducts(filtered);
  }, [baseCategory, subcategory]);

  // Capitalize for Title (e.g., "Topwear / Shirts")
  const pageTitle = subcategory 
    ? `${baseCategory} / ${subcategory}` 
    : baseCategory;

  return (
    <div className="homepage-content"> {/* Re-using container class */}
      
      {/* HEADER */}
      <div className="section-header" style={{ marginTop: '100px' }}>
        <h2 className="section-title" style={{ fontSize: '24px' }}>
          {pageTitle} <span style={{color: '#999', fontSize: '14px'}}>({products.length})</span>
        </h2>
        {/* Simple Sort/Filter Mockup */}
        <div style={{ fontSize: '12px', fontWeight: '600' }}>SORT BY: NEWEST</div>
      </div>

      {/* PRODUCT GRID */}
      {products.length > 0 ? (
        <div className="trending-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <Link to={`/product/${product.id}`} className="product-card-link">
                
                {/* Image */}
                <div className="product-image-container">
                  <img src={product.image} alt={product.title} className="product-image" />
                  <span className="discount-badge">40% OFF</span>
                  <button className="wishlist-btn" onClick={(e) => e.preventDefault()}>
                    <IoHeartOutline size={20} />
                  </button>
                </div>
                
                {/* Info */}
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
      ) : (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h3>No products found in this category.</h3>
          <p>We are updating our stock. Check back soon!</p>
        </div>
      )}
    </div>
  );
};

export default ShopPage;
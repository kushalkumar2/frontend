import React from 'react';
import { useCart } from '../pages/CartContext';
import { Link } from 'react-router-dom'; // 1. Import Link
import './ProductGrid.css';

// This component displays a single product card
function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      {/* 2. Wrap the image and info in a Link component */}
      <Link to={`/product/${product.id}`} className="product-card-link">
        <div className="product-image-container">
          <img src={product.image} alt={product.title} className="product-image" />
        </div>
        <div className="product-info">
          <h3 className="product-title">{product.title}</h3>
          <p className="product-price">₹{product.price}</p>
        </div>
      </Link>
      <button 
        className="add-to-cart-btn-grid" 
        onClick={() => addToCart(product.id)}
      >
        Add to Cart
      </button>
    </div>
  );
}

// This component creates the grid layout
export default function ProductGrid({ products }) {
  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
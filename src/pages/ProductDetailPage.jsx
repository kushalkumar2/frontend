import React from 'react';
import { useParams } from 'react-router-dom';
import { allProducts } from '../data/allProducts'; // Import our combined list
import { useCart } from '../pages/CartContext';
import './ProductDetailPage.css';

export default function ProductDetailPage() {
  const { productId } = useParams(); // Get the product ID from the URL
  const { addToCart } = useCart();

  // Find the product in our combined list
  const product = allProducts.find(p => p.id === productId);

  // If the product doesn't exist, show a message
  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product Not Found</h2>
        <p>Sorry, we couldn't find the product you're looking for.</p>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      <div className="product-detail-image">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="product-detail-info">
        <h1 className="pdp-title">{product.title}</h1>
        <p className="pdp-price">₹{product.price}</p>
        <p className="pdp-description">
          This is a sample description for the product. It highlights the key features, materials, and why this is a must-have item for your wardrobe. Style, comfort, and durability all in one package.
        </p>
        
        {/* We can add size/color selectors here in the future */}
        
        <button 
          className="pdp-add-to-cart-btn" 
          onClick={() => addToCart(product.id)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from './CartContext'; 
// import { trendingData } from '../data/trendingData'; // Or allProducts if you have it

import { allProducts } from '../data/allProducts';
import { IoStar, IoStarOutline, IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5';
import './ProductDetailPage.css';

import { useWishlist } from "./WishlistContext";
import { IoHeart, IoHeartOutline } from "react-icons/io5";


const ProductDetailPage = () => {
  const { productId } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);

  const { toggleWishlist, isWishlisted } = useWishlist();

  
  // States for UI
  const [selectedSize, setSelectedSize] = useState(null);
  const [activeAccordion, setActiveAccordion] = useState('description'); // 'description' or 'delivery'

  // Sizes Array (Static for now)
  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  // Find Product Logic
  useEffect(() => {
    // Search in your data source. 
    // If you have 'allProducts', import that instead of trendingData
    // const found = trendingData.find(p => p.id === productId || p.id === parseInt(productId));
    const found = allProducts.find(p => p.id === productId);
    setProduct(found);
  }, [productId]);

  if (!product) return <div className="loading-state">Loading...</div>;

  return (
    <div className="pdp-container">
      
      {/* 1. LEFT SIDE - IMAGE GALLERY */}
      <div className="pdp-image-section">
        <div className="main-image-wrapper">
          <img src={product.image} alt={product.title} />
        </div>
        {/* If you had more images, they would stack here */}
      </div>

      {/* 2. RIGHT SIDE - DETAILS (Sticky) */}
      <div className="pdp-details-section">
        
        {/* Breadcrumbs */}
        <div className="pdp-breadcrumb">
          <Link to="/">Home</Link> / <Link to="/topwear">Men</Link> / <span>{product.title}</span>
        </div>

        {/* Title & Price */}
        <h1 className="pdp-title">{product.title}</h1>
        <div className="pdp-price">
          <span className="pdp-sale-price">₹{product.price}</span>
          <span className="pdp-original-price">₹{Math.floor(product.price * 1.4)}</span>
          <span className="pdp-discount-tag">40% OFF</span>
        </div>

        {/* Reviews (Fake for design) */}
        <div className="pdp-rating">
          <div className="stars">
            {[1,2,3,4].map(i => <IoStar key={i} />)}
            <IoStarOutline />
          </div>
          <span>(24 Reviews)</span>
        </div>

        {/* Size Selector */}
        <div className="pdp-selector-group">
          <div className="selector-label">
            <span>Size:</span>
            <span className="selected-value">{selectedSize || 'Select a size'}</span>
          </div>
          <div className="size-grid">
            {sizes.map((size) => (
              <button
                key={size}
                className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pdp-actions">
          <button 
            className="add-to-cart-btn-pdp"
            onClick={() => {
              if(!selectedSize) alert('Please select a size');
              else addToCart(product.id, selectedSize);
            }}
          >
            ADD TO BAG
          </button>
          {/* <button className="wishlist-btn-pdp">
            Save to Wishlist
          </button> */}
          
        <button
          className="wishlist-btn-pdp"
          onClick={() => toggleWishlist(product)}
        >
        {isWishlisted(product.id) ? (
        <IoHeart size={22} color="red" />
        ) : (
        <IoHeartOutline size={22} />
        )}
        &nbsp; Save to Wishlist
        </button>



        </div>

        {/* Accordions (Collapsible Info) */}
        <div className="pdp-accordion-group">
          
          {/* Description Item */}
          <div className="accordion-item">
            <button 
              className="accordion-header" 
              onClick={() => setActiveAccordion(activeAccordion === 'description' ? '' : 'description')}
            >
              <span>DESCRIPTION</span>
              {activeAccordion === 'description' ? <IoChevronUpOutline /> : <IoChevronDownOutline />}
            </button>
            <div className={`accordion-content ${activeAccordion === 'description' ? 'open' : ''}`}>
              <p>Crafted for the modern individual, this {product.title.toLowerCase()} features premium fabric construction for all-day comfort. Designed with a relaxed fit and durable stitching.</p>
              <ul>
                <li>100% Premium Cotton</li>
                <li>Machine Wash Cold</li>
                <li>Regular Fit</li>
              </ul>
            </div>
          </div>

          {/* Delivery Item */}
          <div className="accordion-item">
            <button 
              className="accordion-header" 
              onClick={() => setActiveAccordion(activeAccordion === 'delivery' ? '' : 'delivery')}
            >
              <span>DELIVERY & RETURNS</span>
              {activeAccordion === 'delivery' ? <IoChevronUpOutline /> : <IoChevronDownOutline />}
            </button>
            <div className={`accordion-content ${activeAccordion === 'delivery' ? 'open' : ''}`}>
              <p>Free shipping on orders over ₹2000. Returns accepted within 30 days of delivery. See our return policy for more details.</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ProductDetailPage;
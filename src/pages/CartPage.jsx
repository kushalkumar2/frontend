import React from 'react';
import { useCart } from '../pages/CartContext'; // Adjust path if needed
import { Link } from 'react-router-dom';
import { IoCloseOutline, IoAddOutline, IoRemoveOutline } from 'react-icons/io5';
import './CartPage.css';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="empty-cart-container">
        <h2>Your Bag is Empty</h2>
        <Link to="/" className="continue-shopping-btn">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart-page-container">
      <h1 className="cart-header">SHOPPING BAG ({cart.length})</h1>

      <div className="cart-content">
        {/* LEFT SIDE: CART ITEMS */}
        <div className="cart-items-list">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              
              {/* Image */}
              <div className="cart-item-image">
                <img src={item.image} alt={item.title} />
              </div>

              {/* Details */}
              <div className="cart-item-details">
                <div className="item-header">
                  <h3 className="item-title">{item.title}</h3>
                  <button 
                    className="remove-btn" 
                    onClick={() => removeFromCart(item.id)}
                  >
                    <IoCloseOutline size={20} />
                  </button>
                </div>
                
                <p className="item-price">₹{item.price}</p>
                <p className="item-meta">Size: M | Color: Black</p> {/* Static example */}

                {/* Quantity Selector */}
                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                    <IoRemoveOutline size={16} />
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                    <IoAddOutline size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE (or Bottom on Mobile): SUMMARY */}
        <div className="cart-summary">
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{cartTotal}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-row total-row">
            <span>Total</span>
            <span>₹{cartTotal}</span>
          </div>

          <button className="checkout-btn">PROCEED TO CHECKOUT</button>
          <p className="secure-text">Secure Checkout</p>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
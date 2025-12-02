import React from 'react';
import { useCart } from '../pages/CartContext';
import { Link } from 'react-router-dom';
import {
  IoCloseOutline,
  IoAddOutline,
  IoRemoveOutline
} from 'react-icons/io5';
import './CartPage.css';

const CartPage = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartItemCount
  } = useCart();

  if (cart.length === 0) {
    return (
      <div className="empty-cart-container">
        <h2>Your Bag is Empty</h2>
        <Link to="/" className="continue-shopping-btn">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page-container">
      <h1 className="cart-header">SHOPPING BAG ({cartItemCount})</h1>

      <div className="cart-content">
        
        {/* LEFT SIDE — ITEMS */}
        <div className="cart-items-list">
          {cart.map((item) => (
            <div key={item.id + item.size} className="cart-item">
              
              {/* IMAGE */}
              <div className="cart-item-image">
                <img src={item.image} alt={item.title} />
              </div>

              {/* DETAILS */}
              <div className="cart-item-details">
                
                {/* TITLE + REMOVE */}
                <div className="item-header">
                  <h3 className="item-title">{item.title}</h3>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id, item.size)}
                  >
                    <IoCloseOutline size={22} />
                  </button>
                </div>

                {/* PRICE */}
                <p className="item-price">₹{item.price}</p>

                {/* VARIANTS */}
                <p className="item-meta">
                  Size: {item.size} &nbsp;|&nbsp; Color: {item.color || 'Black'}
                </p>

                {/* QUANTITY CONTROLS */}
                <div className="qty-wrapper">
                  <button
                    className="qty-btn"
                    onClick={() =>
                      updateQuantity(item.id, item.size, item.quantity - 1)
                    }
                  >
                    <IoRemoveOutline />
                  </button>

                  <span className="qty-display">{item.quantity}</span>

                  <button
                    className="qty-btn"
                    onClick={() =>
                      updateQuantity(item.id, item.size, item.quantity + 1)
                    }
                  >
                    <IoAddOutline />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE — ORDER SUMMARY */}
        <div className="cart-summary">
          <h2 className="summary-title">ORDER SUMMARY</h2>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{cartTotal}</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span className="shipping-free">Free</span>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-row total-row">
            <span>Total</span>
            <span className="summary-total">₹{cartTotal}</span>
          </div>

          <button className="checkout-btn">PROCEED TO CHECKOUT</button>
          <p className="secure-text">Secure Checkout • Encrypted Payments</p>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

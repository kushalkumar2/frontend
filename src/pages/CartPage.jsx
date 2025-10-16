import React from 'react';
import { useCart } from '../pages/CartContext   '
import './CartPage.css'; // We'll create this CSS file next

export default function CartPage({ cartItems }) {
  // Calculate the total price
    const { cartItems, totalPrice } = useCart();

  return (
    <div className="cart-page">
      <h1>Your Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is currently empty.</p>
        </div>
      ) : (
        <div className="cart-container">
          {/* ... The rest of your JSX remains the same ... */}
          {/* You can use the `cartItems` array as before */}
          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-total">
              <span>Total</span>
              {/* Use totalPrice from the context */}
              <span>₹{totalPrice}</span>
            </div>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}
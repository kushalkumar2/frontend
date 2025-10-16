import React, { createContext, useState, useContext } from 'react';
import { trendingData } from '../data/trendingData'; // We'll get product data from here

// 1. Create the Context
const CartContext = createContext();

// 2. Create a custom hook for easy access to the context
export function useCart() {
  return useContext(CartContext);
}

// 3. Create the Provider component
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // --- Core Cart Functions ---
  const addToCart = (productId) => {
    // Find the full product details from our data file
    const product = trendingData.find(p => p.id === productId);
    if (!product) return; // Do nothing if product not found

    const exist = cartItems.find((item) => item.id === productId);
    if (exist) {
      // If item already exists, increase its quantity
      setCartItems(
        cartItems.map((item) =>
          item.id === productId ? { ...exist, quantity: exist.quantity + 1 } : item
        )
      );
    } else {
      // If new, add it to the cart with quantity 1
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  // --- Calculated Values ---
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce((price, item) => price + item.quantity * item.price, 0);

  // The value object that will be available to all consuming components
  const value = {
    cartItems,
    addToCart,
    cartItemCount,
    totalPrice
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
import React, { createContext, useState, useContext, useEffect } from 'react';
import { allProducts } from '../data/allProducts';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

// Helper function to get initial cart state from localStorage
const getInitialCart = () => {
  const savedCart = localStorage.getItem('cartItems');
  return savedCart ? JSON.parse(savedCart) : [];
};

export function CartProvider({ children }) {
  // 1. Initialize state by calling our helper function
  const [cartItems, setCartItems] = useState(getInitialCart);

  // 2. This effect runs every time cartItems changes, saving it to localStorage
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // --- Core Cart Functions (these remain the same) ---
  const addToCart = (productId) => {
    const exist = cartItems.find((item) => item.id === productId);
    if (exist) {
      setCartItems(
        cartItems.map((item) =>
          item.id === productId ? { ...exist, quantity: exist.quantity + 1 } : item
        )
      );
    } else {
      const product = allProducts.find(p => p.id === productId);
      if (product) {
        setCartItems([...cartItems, { ...product, quantity: 1 }]);
      }
    }
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, amount) => {
    setCartItems(
      cartItems.map(item => {
        if (item.id === productId) {
          const newQuantity = item.quantity + amount;
          return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
        }
        return item;
      }).filter(item => item.quantity > 0) // Optional: remove item if quantity becomes 0
    );
  };

  // --- Calculated Values (these remain the same) ---
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce((price, item) => price + item.quantity * item.price, 0);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    cartItemCount,
    totalPrice
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
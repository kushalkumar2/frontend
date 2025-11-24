import React, { createContext, useContext, useState, useEffect } from 'react';
import { allProducts } from '../data/allProducts'; // Ensure you have this or remove if not using for lookup

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  // Load cart from localStorage on start
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // 1. ADD TO CART
  const addToCart = (productId) => {
    setCart((prevCart) => {
      // Check if item is already in cart
      const existingItem = prevCart.find((item) => item.id === productId);

      if (existingItem) {
        // If yes, just increase quantity
        return prevCart.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // If no, find product details (assuming you have a product list to look up)
        // Note: You might need to adjust how you find the product details based on your data structure
        // For now, I'll assume you pass the full product object or we find it in 'allProducts'
        const productDetails = allProducts.find(p => p.id === productId);
        
        if (!productDetails) return prevCart; // Safety check

        return [...prevCart, { ...productDetails, quantity: 1 }];
      }
    });
  };

  // 2. REMOVE FROM CART
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // 3. UPDATE QUANTITY
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return; // Prevent going below 1
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // 4. CALCULATE TOTAL
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  // 5. ITEM COUNT (For Badge)
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartItemCount
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
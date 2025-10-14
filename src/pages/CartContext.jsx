    import React, { createContext, useState, useContext } from 'react';

    const CartContext = createContext();

    export const useCart = () => {
      return useContext(CartContext);
    };

    export const CartProvider = ({ children }) => {
      const [cartItems, setCartItems] = useState([]);

      const addToCart = (product, quantity = 1) => {
        setCartItems((prevItems) => {
          const existingItem = prevItems.find((item) => item.id === product.id);

          if (existingItem) {
            // If item already in cart, update quantity
            return prevItems.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          } else {
            // If new item, add to cart
            return [...prevItems, { ...product, quantity }];
          }
        });
      };

      const removeFromCart = (productId) => {
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.id !== productId)
        );
      };

      const updateCartItemQuantity = (productId, newQuantity) => {
        setCartItems((prevItems) => {
          if (newQuantity <= 0) {
            return prevItems.filter((item) => item.id !== productId);
          }
          return prevItems.map((item) =>
            item.id === productId
              ? { ...item, quantity: newQuantity }
              : item
          );
        });
      };

      const clearCart = () => {
        setCartItems([]);
      };

      // Calculate total items and total price (optional, but very useful)
      const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
      const totalPrice = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);


      const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart,
        totalItems,
        totalPrice,
      };

      return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
    };
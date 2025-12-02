import React, { createContext, useContext, useState, useEffect } from "react";
import { allProducts } from "../data/allProducts";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // // ADD TO CART
  // const addToCart = (productId, size) => {
  //   setCart((prev) => {
  //     const existing = prev.find((item) => item.id === productId);

  //     if (existing) {
  //       return prev.map((item) =>
  //         item.id === productId
  //           ? { ...item, quantity: item.quantity + 1 }
  //           : item
  //       );
  //     }

  //     const product = allProducts.find((p) => p.id === productId);
  //     if (!product) return prev; // safety

  //     return [...prev, { ...product, quantity: 1 }];
  //   });
  // };

const addToCart = (productId, size) => {
  setCart(prev => {
    const existing = prev.find(
      item => item.id === productId && item.size === size
    );

    if (existing) {
      return prev.map(item =>
        item.id === productId && item.size === size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }

    const productDetails = allProducts.find(p => p.id === productId);

    return [
      ...prev,
      {
        ...productDetails,
        size,
        quantity: 1
      }
    ];
  });
};



  // REMOVE FROM CART
  // const removeFromCart = (id) => {
  //   setCart((prev) => prev.filter((item) => item.id !== id));
  // };

  const removeFromCart = (id, size) => {
  setCart(prev =>
    prev.filter(item => !(item.id === id && item.size === size))
  );
};


  // UPDATE QUANTITY
  const updateQuantity = (id, size, qty) => {
    if (qty < 1) return;
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.size === size
         ? { ...item, quantity: qty } : item
      )
    );
  };

  // TOTAL PRICE
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // TOTAL ITEM COUNT
  const cartItemCount = cart.reduce(
    (count, item) => count + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartTotal,
        cartItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

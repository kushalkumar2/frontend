import React from "react";
import { useWishlist } from "./WishlistContext";
import { Link } from "react-router-dom";
import "./WishlistPage.css";

const WishlistPage = () => {
  const { wishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="empty-wishlist">
        <h2>Your Wishlist is Empty</h2>
        <Link to="/" className="shop-btn">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="wishlist-container">
      <h1>My Wishlist ({wishlist.length})</h1>

      <div className="wishlist-grid">
        {wishlist.map((item) => (
          <Link
            to={`/product/${item.id}`}
            key={item.id}
            className="wishlist-card"
          >
            <img src={item.image} alt={item.title} />
            <h3>{item.title}</h3>
            <p>₹{item.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;

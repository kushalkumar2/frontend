import React from "react";
import { useWishlist } from "./WishlistContext";
import { useCart } from "./CartContext";
import { Link } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";
import "./WishlistPage.css";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="wishlist-empty-container">
        <h2>Your Wishlist is Empty</h2>
        <p>Save your favourite items to shop later.</p>
        <Link to="/" className="wishlist-empty-btn">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="wishlist-container">

      <h1 className="wishlist-title">WISHLIST ({wishlist.length})</h1>

      <div className="wishlist-grid">

        {wishlist.map((item) => (
          <div className="wishlist-card" key={`${item.id}-${item.size}`}>

            {/* REMOVE BUTTON */}
            <button
              className="wishlist-remove-btn"
              onClick={() => removeFromWishlist(item.id, item.size)}
            >
              <IoCloseOutline size={22} />
            </button>

            {/* IMAGE */}
            <Link
              to={`/product/${item.id}`}
              className="wishlist-image-wrapper"
            >
              <img src={item.image} alt={item.title} />
            </Link>

            {/* INFO */}
            <div className="wishlist-info">
              <h3 className="wishlist-item-title">{item.title}</h3>
              <p className="wishlist-price">₹{item.price}</p>

              <button
                className="wishlist-cart-btn"
                onClick={() => {
                  const res = addToCart(item.id, item.size);
                  if (res.success) {
                    removeFromWishlist(item.id, item.size);
                  }
                }}
              >
                MOVE TO BAG
              </button>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}

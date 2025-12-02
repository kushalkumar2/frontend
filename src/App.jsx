import React from "react";
import './App.css';
import Hero from './pages/Hero';
import HeroCarousel from './components/HeroCarousel';
// Navbar is removed from here because it is in Layout.jsx now!
import { Routes, Route } from "react-router-dom";
import { WishlistProvider } from "./pages/WishlistContext";
import { CartProvider } from "./pages/CartContext";
import { AuthProvider } from "./pages/AuthContext";
import TopWearPage from "./pages/TopWearPage";
import BottomwearPage from "./pages/BottomwearPage";
import AthleisurePage from "./pages/AthleisurePage";
import AuthModal from "./components/AuthModal";
import JeansPage from "./pages/JeansPage";
import PantsPage from "./pages/PantsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import Layout from "./components/Layout"; // Import the frame
import ComingSoon from "./pages/ComingSoon";
import Tshirts from "./pages/Tshirt";
import ShopPage from "./pages/ShopPage";
import Shirts from "./pages/Shirts";
import WishlistPage from "./pages/WishListPage";
import LoginPage from "./pages/LoginPage";

import AdminLayout from "./admin/AdminLayout";
import AdminProtected from "./admin/AdminProtected";
import Dashboard from "./admin/Dashboard";
import ManageProducts from "./admin/ManageProducts";
import ManageOrders from "./admin/ManageOrders";
import ManageUsers from "./admin/ManageUsers";


function App(){
  return(
    <>
    <div className="App">
      <AuthProvider>
        <CartProvider>
        <WishlistProvider>

          <Routes>

            <Route path="login" element={<LoginPage />} />
        {/* THE MAIN WRAPPER: All these pages will have the Navbar automatically */}
        <Route path="/" element={<Layout />}>

            {/* The Home Page */}
            <Route index element={
              <>
              <Hero />
              </>
            } />

            {/* Your existing categories (I kept them exactly as you had them) */}
           <Route path="topwear/:subcategory?" element={<ShopPage baseCategory="topwear" />} />
          <Route path="bottomwear/:subcategory?" element={<ShopPage baseCategory="bottomwear" />} />
          <Route path="athleisure/:subcategory?" element={<ShopPage baseCategory="athleisure" />} />

            <Route path="women" element={<ComingSoon category="Women" />} />
            <Route path="kids" element={<ComingSoon category="Kids" />} />

            <Route path="product/:productId" element={<ProductDetailPage />} />

            <Route path=":category/:subcategory?" element={<ShopPage />} />

            <Route path="cart" element={<CartPage />} />
            <Route path="topwear/t-shirts" element={<Tshirts />} />
            <Route path="topwear/shirts" element={<Shirts />} />
            <Route path="bottomwear/jeans" element={<JeansPage />} />
            <Route path="bottomwear/pants" element={<PantsPage />} />

            <Route path="/wishlist" element={<WishlistPage />} />


        </Route> 
        {/* End of the Wrapper */}

        {/* Login is OUTSIDE the wrapper because you usually don't want a Navbar on the login screen */}
        <Route path="/login" element={<AuthModal />} />

        <Route path="/admin" element={<AdminProtected><AdminLayout /></AdminProtected>}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<ManageProducts />} />
          <Route path="orders" element={<ManageOrders />} />
          <Route path="users" element={<ManageUsers />} />
       </Route>



      </Routes>
        </WishlistProvider>
      </CartProvider>
      </AuthProvider>
    </div>
    </>
  );
}

export default App;
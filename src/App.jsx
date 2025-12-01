import React from "react";
import './App.css';
import Hero from './pages/Hero';
import HeroCarousel from './components/HeroCarousel';
// Navbar is removed from here because it is in Layout.jsx now!
import { Routes, Route } from "react-router-dom";
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

function App(){
  return(
    <>
    <div className="App">
      <AuthProvider>
        <CartProvider>
        
      <Routes>
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

            <Route path="cart" element={<CartPage />} />
            <Route path="men/topwear/t-shirts" element={<Tshirts />} />
            <Route path="men/topwear/shirts" element={<Shirts />} />
            <Route path="bottomwear/jeans" element={<JeansPage />} />
            <Route path="bottomwear/pants" element={<PantsPage />} />

        </Route> 
        {/* End of the Wrapper */}

        {/* Login is OUTSIDE the wrapper because you usually don't want a Navbar on the login screen */}
        <Route path="/login" element={<AuthModal />} />

      </Routes>
      </CartProvider>
      </AuthProvider>
    </div>
    </>
  );
}

export default App;
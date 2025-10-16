import React from "react";
import './App.css';
import Hero from './pages/Hero';
import HeroCarousel from './components/HeroCarousel';
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./pages/CartContext";
import { AuthProvider } from "./pages/AuthContext";
import TopWearPage from "./pages/TopWearPage";
import BottomwearPage from "./pages/BottomwearPage";
import AthleisurePage from "./pages/AthleisurePage";
import AuthModal from "./components/AuthModal";
import ProfilePage from "./pages/ProfilePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";

function App(){
  return(
    <>
    <div className="App">
      <AuthProvider>
        <CartProvider>
        <Navbar />

      <Routes>
        <Route path="/" element={
          <>
          <HeroCarousel />
          <Hero />
          </>
      } />

        <Route path="/login" element={<AuthModal />} />
        <Route path="/topwear" element={<TopWearPage />} />
        <Route path="/bottomwear" element={<BottomwearPage />} />
        <Route path="/athleisure" element={<AthleisurePage />} />

        {/* path routes for categories */}
        <Route path="/topwear/shirts" element={<TopWearPage />} />
        <Route path="/topwear/polos" element={<TopWearPage />} />
        <Route path="/topwear/t-shirts" element={<TopWearPage />} />

        <Route path="/bottomwear/jeans" element={<BottomwearPage />} />
        <Route path="/bottomwear/pants" element={<BottomwearPage />} />

        <Route path="/athleisure/shorts" element={<AthleisurePage />} />
        <Route path="/athleisure/joggers" element={<AthleisurePage />} />
        <Route path="/athleisure/tank-tops" element={<AthleisurePage />} />

        {/* 2. Add the dynamic route. The ":" means "productId" is a variable. */}
        <Route path="/product/:productId" element={<ProductDetailPage />} />

        <Route path="/cart" element={<CartPage />} />
        
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      </CartProvider>
      </AuthProvider>
    </div>
    </>
  );
}

export default App;
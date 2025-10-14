import React from "react";
import './App.css';
import Hero from './pages/Hero';
import HeroCarousel from './components/HeroCarousel';
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import TopWearPage from "./pages/TopWearPage";
import BottomwearPage from "./pages/BottomwearPage";
import AthleisurePage from "./pages/AthleisurePage";

function App(){
  return(
    <>
    <div className="App">

      <Navbar />

      <Routes>
        <Route path="/" element={
          <>
          <HeroCarousel />
          <Hero />
          </>
      } />
        <Route path="/topwear" element={<TopWearPage />} />
        <Route path="/bottomwear" element={<BottomwearPage />} />
        <Route path="/athleisure" element={<AthleisurePage />} />
      </Routes>
    </div>
    </>
  );
}

export default App;
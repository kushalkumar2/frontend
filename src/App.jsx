import React from "react";
import './App.css';
import Hero from './pages/Hero';
import HeroCarousel from './components/HeroCarousel';
import Navbar from "./components/Navbar";

function App(){
  return(
    <>
    <Navbar />,
    <HeroCarousel />
    
    </>
  );
}

export default App;
import React from "react";
import HeroCarousel from "../components/HeroCarousel";
import Hero from "./Hero";

export default function HomePage() {
  return (
    <div>
      <HeroCarousel />
      <Hero />
    </div>
  );
}
import React from 'react';
import { athleisureData } from '../data/athleisureData';
import ProductGrid from '../components/ProductGrid';

export default function AthleisurePage() {
  return (
    <div className="page-container">
      <h1 className="page-title">Athleisure</h1>
      <ProductGrid products={athleisureData} />
    </div>
  );
}
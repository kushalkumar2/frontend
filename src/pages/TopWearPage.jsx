import React from 'react';
import { topwearData } from '../data/topwearData';
import ProductGrid from '../components/ProductGrid';

// A simple placeholder page
export default function TopWearPage() {
  return (
    <div className="page-container">
      <h1 className="page-title">Topwear</h1>
      <ProductGrid products={topwearData} />
    </div>
  );
}
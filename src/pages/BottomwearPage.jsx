import React from 'react';
import { bottomwearData } from '../data/bottomwearData';
import ProductGrid from '../components/ProductGrid';

export default function BottomwearPage() {
  return (
    <div className="page-container">
      <h1 className="page-title">Bottomwear</h1>
      <ProductGrid products={bottomwearData} />
    </div>
  );
}
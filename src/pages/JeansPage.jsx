import React from "react";
import { bottomwearData } from "../data/bottomwearData";
import ProductGrid from "../components/ProductGrid";

export default function JeansPage() {
  const jeans = bottomwearData.filter(item => item.category === "jeans");

  return (
    <div className="page-container">
      <h1 className="page-title">Jeans</h1>
      <ProductGrid products={jeans} />
    </div>
  );
}

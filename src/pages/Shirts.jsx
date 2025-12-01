import { topwearData } from "../data/topwearData";
import ProductGrid from "../components/ProductGrid";
import { allProducts } from "../data/allProducts";

export default function Shirts() {
  // filter only shirts
  const shirtProducts = topwearData.filter(
    (item) => item.subcategory === "shirt"
  );

  return (
    <div className="page-container">
      <h1 className="page-title">Shirts</h1>
      <ProductGrid products={shirtProducts} />
    </div>
  );
}

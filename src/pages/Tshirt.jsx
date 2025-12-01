import { topwearData } from "../data/topwearData";
import ProductGrid from "../components/ProductGrid";

export default function Tshirt() {
  // filter only tshirts
  const tshirtProducts = topwearData.filter(
    (item) => item.subcategory === "tshirt"
  );

  return (
    <div className="page-container">
      <h1 className="page-title">T-Shirts</h1>
      <ProductGrid products={tshirtProducts} />
    </div>
  );
}

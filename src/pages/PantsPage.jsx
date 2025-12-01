import { bottomwearData } from "../data/bottomwearData";
import ProductGrid from "../components/ProductGrid";

export default function PantsPage() {
  const pants = bottomwearData.filter(item => item.category === "pants");

  return (
    <div className="page-container">
      <h1 className="page-title">Pants</h1>
      <ProductGrid products={pants} />
    </div>
  );
}

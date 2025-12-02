import { useState } from "react";
import "./Admin.css";

export default function ManageProducts() {
  const [form, setForm] = useState({
    title: "",
    image: "",
    price: "",
    category: "",
    subcategory: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New product:", form);
    alert("Product added (connect to backend later)");
  };

  return (
    <div>
      <h1>Manage Products</h1>

      <form className="admin-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" onChange={(e)=>setForm({...form,title:e.target.value})} />
        <input type="text" placeholder="Image URL" onChange={(e)=>setForm({...form,image:e.target.value})} />
        <input type="number" placeholder="Price" onChange={(e)=>setForm({...form,price:e.target.value})} />
        <input type="text" placeholder="Category" onChange={(e)=>setForm({...form,category:e.target.value})} />
        <input type="text" placeholder="Subcategory" onChange={(e)=>setForm({...form,subcategory:e.target.value})} />

        <button type="submit">Add Product</button>
      </form>

      {/* Product list dynamically */}
      <h2>Existing Products</h2>
      {/* Later: fetch from backend */}
      <p>(Connect to backend here)</p>
    </div>
  );
}

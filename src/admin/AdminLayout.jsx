import { Link, Outlet } from "react-router-dom";
import "./Admin.css";

export default function AdminLayout() {
  return (
    <div className="admin-container">
      
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <h2 className="admin-logo">Admin</h2>

        <nav>
          <Link to="/admin/dashboard">Dashboard</Link>
          <Link to="/admin/products">Manage Products</Link>
          <Link to="/admin/orders">Manage Orders</Link>
          <Link to="/admin/users">Users</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <Outlet />
      </main>

    </div>
  );
}

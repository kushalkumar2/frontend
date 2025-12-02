import { useAuth } from "../pages/AuthContext";
import { Navigate } from "react-router-dom";

export default function AdminProtected({ children }) {
  const { user } = useAuth();

  if (!user || user.role !== "admin") {
    return <Navigate to="/login" />;
  }

  return children;
}

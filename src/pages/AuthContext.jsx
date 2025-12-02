import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  // Persist login
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  // COMPLETE WORKING ADMIN + USER LOGIN LOGIC
  const login = ({ email, password }) => {
    // ADMIN LOGIN
    if (email === "admin@test.com" && password === "admin123") {
      const adminUser = { email, role: "admin" };
      setUser(adminUser);
      return { success: true, role: "admin" };
    }

    // NORMAL USER LOGIN
    if (email === "test@gmail.com" && password === "123456") {
      const normalUser = { email, role: "user" };
      setUser(normalUser);
      return { success: true, role: "user" };
    }

    return { success: false, message: "Invalid Credentials" };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

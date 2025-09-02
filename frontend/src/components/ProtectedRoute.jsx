// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { isAuthenticated, userRole, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!isAuthenticated) return <Navigate to="/login" />;

  if (!allowedRoles.includes(userRole)) {
    toast.error("You don't have permission to access this page.", {
      autoClose: 3000,
    });
    return null;
  }

  return children;
};

export default ProtectedRoute;

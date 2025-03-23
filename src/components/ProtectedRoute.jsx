import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ userData, children }) => {
  if (!userData) {
    // Redirect to the sign-in page when not signed in
    return <Navigate to="/signin" />;
  }
  return children;
};

export default ProtectedRoute;

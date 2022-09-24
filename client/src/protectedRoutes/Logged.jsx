import React from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Logged = ({ children }) => {
  const { user } = UserAuth();

  if (user !== null) {
    return <Navigate to="/workspace" />;
  }

  return children;
};

export default Logged;

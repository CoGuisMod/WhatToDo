import React from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const NoLogged = ({ children }) => {
  const { user } = UserAuth();

  if (user === null) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default NoLogged;

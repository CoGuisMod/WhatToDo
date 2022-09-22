import React from "react";
import { Link } from "react-router-dom";

/* Context import */
import { UserAuth } from "../../context/AuthContext";

/* Style import */
import "./style.css";

const index = () => {
  const { user, logOut } = UserAuth();

  const handleLogOut = async () => {
    await logOut();
  };

  return (
    <header className="absolute w-full px-4 pt-2">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link to="/" className="brand">
          <span className="brand-one">What</span>
          <span className="brand-two">To</span>Do
          <span className="brand-three">?</span>
        </Link>
        {user ? (
          <span onClick={handleLogOut}>Salir</span>
        ) : (
          <div className="flex items-center gap-4 font-medium">
            <Link to="/login" className="header_nav-link-normal">
              Sign in
            </Link>
            <Link to="/signup" className="header_nav-link-styled">
              Sign up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default index;

import React from "react";
import { Link } from "react-router-dom";

import { UserAuth } from "../../context/AuthContext";

const index = () => {
  const { user } = UserAuth();

  console.log(user);

  return (
    <section className=" pt-16 h-screen">
      <Link to="/login">LogIn</Link>
    </section>
  );
};

export default index;

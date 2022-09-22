import React, { useState } from "react";
import { Link } from "react-router-dom";

/* Context import */
import { UserAuth } from "../../context/AuthContext";

/* Style import */
import "./style.css";

const LogIn = () => {
  /* Context data */
  const { logIn } = UserAuth();

  /* Log in data */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "") {
      console.log("Debe ingresar el email.");
      return;
    }
    if (password === "") {
      console.log("Debe ingresar la contraseña.");
      return;
    }

    await logIn(email, password);
    setEmail("");
    setPassword("");
  };

  return (
    <section className="flex justify-center items-center w-full h-screen">
      <div className="flex flex-col ">
        <h1 className="text-2xl mx-auto mb-8">
          Sign in to{" "}
          <Link to="/" className="brand">
            <span className="brand-one">What</span>
            <span className="brand-two">To</span>Do
            <span className="brand-three">?</span>
          </Link>
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col border border-slate-800 rounded-3xl mb-4 px-8 py-6"
        >
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-form_input"
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-form_input"
          />

          <button className="mt-2 auth-form_button">Sign in</button>
        </form>
        <p className="text-slate-300">
          Don't have an account?{" "}
          <Link to="/signup" className="text-slate-50  hover:text-purple-300">
            Register here
          </Link>
          !
        </p>
      </div>
    </section>
  );
};

export default LogIn;

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/* Context import */
import { UserAuth } from "../../context/AuthContext";

/* Message card import */
import MessageCard from "../../components/MessageCard";

/* Style import */
import "./style.css";

const LogIn = () => {
  /* Context data */
  const { logIn } = UserAuth();

  const navigate = useNavigate();

  /* Log in data */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /* Message data */
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (email === "") {
      setMessage("Debe ingresar el email.");
      return;
    }
    if (password === "") {
      setMessage("Debe ingresar la contraseña.");
      return;
    }

    try {
      await logIn(email, password);

      setEmail("");
      setPassword("");

      navigate("/workspace");
    } catch (e) {
      setMessage(e.message);
      if (e.message === "Firebase: Error (auth/user-not-found).") {
        setMessage("The email doesn't exist.");
      }
      if (e.message === "Firebase: Error (auth/wrong-password).") {
        setMessage("The password is incorrect.");
      }
    }
  };

  useEffect(() => {
    if (message !== "") {
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  }, [message]);

  return (
    <section className="flex justify-center items-center w-full h-screen">
      <MessageCard message={message} />
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

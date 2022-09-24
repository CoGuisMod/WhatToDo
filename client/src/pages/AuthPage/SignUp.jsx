import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/* Context import */
import { UserAuth } from "../../context/AuthContext";

/* Message card import */
import MessageCard from "../../components/MessageCard";

/* Style import */
import "./style.css";

const SignUp = () => {
  /* Context data */
  const { signUp } = UserAuth();

  const navigate = useNavigate();

  /* Log in data */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  /* Message card data */
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (email === "") {
      setMessage("The email is required.");
      return;
    }
    if (password === "") {
      setMessage("The password is required.");
      return;
    }
    if (password.length < 6) {
      setMessage("The password should be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      await signUp(email, password);

      setEmail("");
      setPassword("");
      setConfirmPassword("");

      navigate("/workspace");
    } catch (e) {
      setMessage(e.message);
      if (e.message === "Firebase: Error (auth/email-already-in-use).") {
        setMessage("The email already exist.");
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
          Register to{" "}
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

          <label className="-mt-2">Confirm password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="auth-form_input"
          />

          <button className="mt-2 auth-form_button">Sign up</button>
        </form>
        <p className="text-slate-300">
          Already have an account?{" "}
          <Link to="/login" className="text-slate-50  hover:text-purple-300">
            Sign in here
          </Link>
          !
        </p>
      </div>
    </section>
  );
};

export default SignUp;

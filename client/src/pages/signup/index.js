import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { UserAuth } from "../../context/AuthContext";

import Logo from "../../components/Logo";
import Message from "../../components/MessageCard";

import Style from "./Signup.module.css";

const index = () => {
  /* Singing up user data */
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  /* Message card data */
  const [message, setMessage] = useState("");

  /* Context function */
  const { signUp } = UserAuth();

  /* Router function */
  const router = useRouter();

  /* Submit function */
  const handleSubmit = async (e) => {
    e.preventDefault();

    /* Makes sure that all the fields have content */
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      setMessage("All the field are required.");
      return;
    }

    /* Makes sure that the password is atleast 6 characters */
    if (password.length < 6) {
      setMessage("Password should have atleast 6 characters.");
      return;
    }

    /* Makes sure that the passwords match */
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    /* Sends the info to firebase auth to create the user */
    try {
      await signUp(firstName, lastName, email, password);
      router.push("/workspace");
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
      }, "2500");
    }
  }, [message]);

  return (
    /* Main container code section */
    <section className={Style.container_main}>
      {message ? <Message message={message} /> : null}
      <div className={Style.container_sub}>
        {/* Title code section */}
        <h2 className={Style.title}>
          Register to <Logo />
        </h2>

        {/* Form code section */}
        <form onSubmit={handleSubmit} className={Style.form_container}>
          {/* Names code section */}
          <div className={Style.form_container_sub}>
            <label>First name</label>
            <label>Last name</label>
            <input
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
              className={Style.form_input}
            />
            <input
              type="text"
              onChange={(e) => setLastName(e.target.value)}
              className={Style.form_input}
            />
          </div>
          <div className={Style.divider} />

          {/* Email code section */}
          <label>Email</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            className={Style.form_input}
          />
          <div className={Style.divider} />

          {/* Password code section */}
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className={Style.form_input}
          />
          <div className={Style.divider} />

          {/* Confirm password code section */}
          <label>Confirm password</label>
          <input
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={Style.form_input}
          />
          <div className={Style.divider_two} />

          {/* Button code section */}
          <button className={Style.form_button}>Sign up</button>
        </form>

        {/* Already an account code section */}
        <p className={Style.aha_text}>
          Already have an account?{" "}
          <Link href="/login">
            <span className={Style.aha_link}>Sign in here!</span>
          </Link>
        </p>
      </div>

      <div className="py-8" />

      {/* Testing account code section */}

      <div className="text-center text-slate-50/50 mt-auto mb-4">
        <p>If you only want to test the application user the next account.</p>
        <p className="mt-4">
          email:{" "}
          <span className="font-semibold text-slate-50/80">
            test_one@whattodo.com
          </span>
        </p>
        <p>
          password:{" "}
          <span className="font-semibold text-slate-50/80">testonepass</span>
        </p>
      </div>
    </section>
  );
};

export default index;

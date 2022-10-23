import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { UserAuth } from "../../context/AuthContext";

import Logo from "../../components/Logo";

import Style from "./Signup.module.css";

const index = () => {
  /* Singing up user data */
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  /* Context function */
  const { signUp } = UserAuth();

  /* Router function */
  const router = useRouter();

  /* Submit function */
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signUp(firstName, lastName, email, password);

    router.push("/workspace");
  };

  return (
    /* Main container code section */
    <section className={Style.container_main}>
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

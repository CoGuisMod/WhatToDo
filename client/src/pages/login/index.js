import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { UserAuth } from "../../context/AuthContext";

import Logo from "../../components/Logo";

import Style from "./Login.module.css";

const index = () => {
  /* Logging in user data */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /* Context function */
  const { logIn } = UserAuth();

  /* Router function */
  const router = useRouter();

  /* Submit function */
  const handleSubmit = async (e) => {
    e.preventDefault();

    await logIn(email, password);

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

          <div className={Style.divider_two} />

          {/* Button code section */}
          <button className={Style.form_button}>Sign up</button>
        </form>

        {/* Don't have account code section */}
        <p className={Style.dha_text}>
          Don't have an account?{" "}
          <Link href="/signup">
            <span className={Style.dha_link}>Register here!</span>
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

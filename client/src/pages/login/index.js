import React from "react";
import Link from "next/link";

import Logo from "../../components/Logo";

import Style from "./Login.module.css";

const index = () => {
  const handleSubmit = () => {};

  return (
    <section className={Style.container_main}>
      <div className={Style.container_sub}>
        <h2 className={Style.title}>
          Register to <Logo />
        </h2>

        <form onSubmit={handleSubmit} className={Style.form_container}>
          <label>Email</label>
          <input type="email" className={Style.form_input} />
          <div className={Style.divider} />
          <label>Password</label>
          <input type="password" className={Style.form_input} />

          <div className={Style.divider_two} />
          <button className={Style.form_button}>Sign up</button>
        </form>
        <p className={Style.dha_text}>
          Don't have an account?{" "}
          <Link href="/signup">
            <span className={Style.dha_link}>Register here!</span>
          </Link>
        </p>
      </div>

      <div className="py-8" />

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

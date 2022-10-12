import React from "react";
import Link from "next/link";

import Logo from "../Logo";

import Style from "./Navbar.module.css";

const index = () => {
  return (
    <div className={Style.navbar_container}>
      <div className={Style.navbar_main}>
        <div className={Style.navbar_logo_container}>
          <Logo />
        </div>
        <div className={Style.navbar_auth_links}>
          <Link href="/login">
            <span className={Style.navbar_login_link}>Sign in</span>
          </Link>
          <Link href="/signup">
            <span className={Style.navbar_signup_link}>Sign up</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default index;

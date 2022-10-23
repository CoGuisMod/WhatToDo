import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { UserAuth } from "../../context/AuthContext";

import Logo from "../Logo";

import Style from "./Navbar.module.css";

const index = () => {
  /* Context functions */
  const { user, logOut } = UserAuth();

  /* Router function */
  const router = useRouter();

  /* Log out button */
  const logOutButton = async () => {
    await logOut();

    router.push("/");
  };

  return (
    <div className={Style.navbar_container}>
      <div className={Style.navbar_main}>
        <div className={Style.navbar_logo_container}>
          <Logo />
        </div>

        {/* Auth code section */}
        <div className={Style.navbar_auth_links}>
          {user ? (
            /* If the user IS logged code section */
            <button onClick={logOutButton}>Log out</button>
          ) : (
            /* If the user IS NOT logged code section */
            <>
              <Link href="/login">
                <span className={Style.navbar_login_link}>Sign in</span>
              </Link>
              <Link href="/signup">
                <span className={Style.navbar_signup_link}>Sign up</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default index;

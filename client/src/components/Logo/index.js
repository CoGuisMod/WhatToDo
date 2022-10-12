import React from "react";
import Link from "next/link";

import Style from "./Logo.module.css";

const index = () => {
  return (
    <Link href="/">
      <span className={Style.logo}>
        What
        <span>To</span>
        <span>Do</span>?
      </span>
    </Link>
  );
};

export default index;

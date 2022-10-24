import React from "react";

import Style from "./MessageCard.module.css";

const index = ({ message }) => {
  return <div className={Style.card_container}>{message}</div>;
};

export default index;

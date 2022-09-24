import React, { useEffect, useState } from "react";

/* Context imports */
import { UserAuth } from "../../context/AuthContext";
import { UserData } from "../../context/DataContext";

/* Aside import */
import Aside from "../../components/Aside";

/* Board import */
import Board from "../../components/Board";

const index = () => {
  return (
    <main className="flex w-full h-screen pt-24 pb-16 px-8">
      {/* <Aside /> */}
      <Board />
    </main>
  );
};

export default index;

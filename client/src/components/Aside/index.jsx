import React from "react";
import { Link } from "react-router-dom";

/* Context import */
import { UserAuth } from "../../context/AuthContext";

/* Import icons */
import { FaPlus } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

const index = () => {
  const { logOut } = UserAuth();

  const handleLogOut = async () => {
    await logOut();
  };

  return (
    <aside className="h-full py-4">
      <div className="flex flex-col justify-between items-center border-r border-slate-700 h-full px-4 py-2">
        <Link to="/" className="font-bold text-xl text-purple-300">
          W<span className="text-cyan-300">T</span>
          <span className="text-red-300">D</span>?
        </Link>
        <div className="bg-slate-700 w-4/5 h-px my-4"></div>
        <div>
          <FaPlus className="text-2xl hover:text-purple-300 hover:cursor-pointer" />
        </div>
        <FiLogOut
          onClick={handleLogOut}
          className="text-2xl hover:text-purple-300 mt-auto hover:cursor-pointer"
        />
      </div>
    </aside>
  );
};

export default index;

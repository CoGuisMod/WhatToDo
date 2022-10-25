import React from "react";

import { UserAuth } from "../../context/AuthContext";
import { GeneralState } from "../../context/GeneralContext";

import Style from "./Aside.module.css";
import { HiHome, HiPlus } from "react-icons/hi";

const index = ({ boardList }) => {
  const { user } = UserAuth();
  const { addBoard, getBoards, getCurrentBoard } = GeneralState();

  const addNewBoard = async () => {
    await addBoard(user.email);
    await getBoards(user.email);
  };

  const setCurrentBoard = async (board_id) => {
    await getCurrentBoard(user.email, board_id);
  };

  return (
    <aside className={Style.container}>
      <div className={Style.sub_container}>
        <div className={Style.home_button}>
          <HiHome />
        </div>

        <div className={Style.divider_one} />

        <div className={Style.boards_icons_container}>
          {boardList?.map((board, index) => (
            <div
              key={index}
              onClick={() => setCurrentBoard(board.board_id)}
              className={Style.board_icon}
            >
              {board?.board_title[0]}
            </div>
          ))}
        </div>

        <div className={Style.divider_two} />

        <div onClick={() => addNewBoard()} className={Style.add_button}>
          <HiPlus />
        </div>
      </div>
    </aside>
  );
};

export default index;

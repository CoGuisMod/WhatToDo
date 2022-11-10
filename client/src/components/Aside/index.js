import React, { useEffect, useState } from "react";

import { UserAuth } from "../../context/AuthContext";
import { GeneralState } from "../../context/GeneralContext";

import Style from "./Aside.module.css";
import ClipLoader from "react-spinners/ClipLoader";
import { HiHome, HiPlus } from "react-icons/hi";

const index = ({ boardList }) => {
  const { user } = UserAuth();
  const { addBoard, getBoards, getCurrentBoard, setCurrentBoard } =
    GeneralState();

  const [isLoading, setIsLoading] = useState(true);

  const addNewBoard = async () => {
    await addBoard(user.email);
    await getBoards(user.email);
  };

  const changeCurrentBoard = async (board_id) => {
    await getCurrentBoard(user.email, board_id);
  };

  useEffect(() => {
    if (boardList !== null) {
      setIsLoading(false);
    }
  }, [boardList]);

  return (
    <aside className={Style.container}>
      <div className={Style.sub_container}>
        <div
          onClick={() => setCurrentBoard(null)}
          className={Style.home_button}
        >
          <HiHome />
        </div>

        <div className={Style.divider_one} />

        <div className={Style.boards_icons_container}>
          {isLoading ? (
            <ClipLoader color="slate-50" />
          ) : (
            boardList?.map((board, index) => (
              <div
                key={index}
                onClick={() => changeCurrentBoard(board.board_id)}
                className={Style.board_icon}
              >
                {board?.board_title[0]}
              </div>
            ))
          )}
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

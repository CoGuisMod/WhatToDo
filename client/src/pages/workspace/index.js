import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import { DragDropContext } from "react-beautiful-dnd";

import { UserAuth } from "../../context/AuthContext";
import { GeneralState } from "../../context/GeneralContext";

import Aside from "../../components/Aside";

import { BsGearFill } from "react-icons/bs";

const Column = dynamic(() => import("../../components/Column"), { ssr: false });

const reorderColumnList = (sourceCol, startIndex, endIndex) => {
  const newTaskIds = Array.from(sourceCol.taskIds);
  const [removed] = newTaskIds.splice(startIndex, 1);
  newTaskIds.splice(endIndex, 0, removed);

  const newColumn = {
    ...sourceCol,
    taskIds: newTaskIds,
  };

  return newColumn;
};

const index = () => {
  const [boardsList, setBoardsList] = useState(null);
  const [boardData, setBoardData] = useState(null);

  /* Context functions */
  const { user } = UserAuth();
  const { boards, getBoards, getCurrentBoard, currentBoard, updateBoard } =
    GeneralState();

  const onDragEnd = (result) => {
    const { destination, source } = result;

    /* When the user drops on unknown destination */
    if (!destination) {
      return;
    }

    /* When the user drops on the same position */
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    /* When the user drops on another position in the same list */
    const sourceCol = boardData.columns[source.droppableId];
    const destinationCol = boardData.columns[destination.droppableId];

    if (sourceCol.id === destinationCol.id) {
      const newColumn = reorderColumnList(
        sourceCol,
        source.index,
        destination.index
      );

      const newData = {
        ...boardData,
        columns: {
          ...boardData.columns,
          [newColumn.id]: newColumn,
        },
      };

      setBoardData(newData);
      return;
    }

    /* When the user drops on another list */
    const startTaskIds = Array.from(sourceCol.taskIds);
    const [removed] = startTaskIds.splice(source.index, 1);
    const newStartCol = {
      ...sourceCol,
      taskIds: startTaskIds,
    };

    const endTaskIds = Array.from(destinationCol.taskIds);
    endTaskIds.splice(destination.index, 0, removed);
    const newEndCol = {
      ...destinationCol,
      taskIds: endTaskIds,
    };

    const newData = {
      ...boardData,
      columns: {
        ...boardData.columns,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      },
    };

    setBoardData(newData);
  };

  const showBoardOptions = () => {};

  useEffect(() => {
    if (boardData !== null && boardData !== currentBoard.board_data) {
      updateBoard(user.email, boardData);
    }
  }, [boardData]);

  useEffect(() => {
    if (currentBoard !== null) {
      setBoardData(currentBoard.board_data);
    }
  }, [currentBoard]);

  /* Once the boards are called sets the state with them */
  useEffect(() => {
    if (boards !== null) {
      setBoardsList(boards);
    }
  }, [boards]);

  /* When the user is logged gets the boards */
  useEffect(() => {
    if (user !== null) {
      const fetchData = async () => {
        await getBoards(user.email);
      };

      fetchData().catch(console.error);
    }
  }, [user]);

  return (
    <main className="flex h-screen">
      <Aside boardList={boardsList} />
      {currentBoard ? (
        <section className="flex flex-col w-full h-full px-4 md:px-10 pt-16">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl">{currentBoard.board_title}</h2>
            <div
              onClick={() => showBoardOptions()}
              className="text-xl hover:text-slate-50/80 transition-colors duration-200 ease-in-out cursor-pointer"
            >
              <BsGearFill />
            </div>
          </div>
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-flow-col gap-x-4 justify-start items-start w-full h-full mt-4 overflow-x-scroll">
              {boardData?.columnOrder?.map((columnId) => {
                const column = boardData.columns[columnId];
                const items = column.taskIds.map(
                  (taskId) => boardData.tasks[taskId]
                );

                return (
                  <Column
                    key={column.id}
                    columnData={column}
                    itemsData={items}
                  />
                );
              })}
            </div>
          </DragDropContext>
        </section>
      ) : (
        <section className="flex flex-col w-full h-full px-4 md:px-10 pt-16">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl">
              Hey! {user?.first_name}, you got something to do?
            </h2>
            <div className="text-xl hover:text-slate-50/80 transition-colors duration-200 ease-in-out cursor-pointer">
              <BsGearFill />
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default index;

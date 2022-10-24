import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { DragDropContext } from "react-beautiful-dnd";

import { UserAuth } from "../../context/AuthContext";
import { GeneralState } from "../../context/GeneralContext";

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
  const [boardData, setBoardData] = useState(null);

  /* Context functions */
  const { user } = UserAuth();
  const { getCurrentBoard, currentBoard, updateBoard } = GeneralState();

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

  useEffect(() => {
    if (user !== null) {
      const fetchData = async () => {
        await getCurrentBoard(user.email);
      };

      fetchData().catch(console.error);
    }
  }, [user]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <section className="w-full">
        <div className="grid grid-flow-col gap-x-4 px-8 md:px-16 pt-16 w-full overflow-x-scroll">
          {boardData?.columnOrder?.map((columnId) => {
            const column = boardData.columns[columnId];
            const items = column.taskIds.map(
              (taskId) => boardData.tasks[taskId]
            );

            return (
              <Column key={column.id} columnData={column} itemsData={items} />
            );
          })}
        </div>
      </section>
    </DragDropContext>
  );
};

export default index;

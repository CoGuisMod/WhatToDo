import React, { useState } from "react";
import dynamic from "next/dynamic";
import { DragDropContext } from "react-beautiful-dnd";

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
  const [boardData, setBoardData] = useState(initialData);

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

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <section>
        <div className="flex gap-4 px-8 md:px-16 pt-16">
          {boardData.columnOrder.map((columnId) => {
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

const initialData = {
  tasks: {
    1: { id: 1, content: "Configure Next.js application" },
    2: { id: 2, content: "Configure Next.js and tailwind " },
    3: { id: 3, content: "Create sidebar navigation menu" },
    4: { id: 4, content: "Create page footer" },
    5: { id: 5, content: "Create page navigation menu" },
    6: { id: 6, content: "Create page layout" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "TO-DO",
      taskIds: [1, 2, 3, 4, 5, 6],
    },
    "column-2": {
      id: "column-2",
      title: "IN-PROGRESS",
      taskIds: [],
    },
    "column-3": {
      id: "column-3",
      title: "COMPLETED",
      taskIds: [],
    },
  },
  // Facilitate reordering of the columns
  columnOrder: ["column-1", "column-2", "column-3"],
};

export default index;

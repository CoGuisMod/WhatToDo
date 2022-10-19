import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

const index = ({ columnData, itemsData }) => {
  return (
    <div className="border border-slate-50">
      <div className="bg-slate-50 text-slate-900">{columnData.title}</div>
      <Droppable droppableId={columnData.id}>
        {(droppableProvided, droppableSnapshot) => (
          <div
            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps}
            className="flex flex-col gap-3 p-4"
          >
            {itemsData.map((item, index) => (
              <Draggable key={item.id} draggableId={`${item.id}`} index={index}>
                {(draggableProvided, draggableSnapshot) => (
                  <div
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}
                    {...draggableProvided.dragHandleProps}
                    className="bg-slate-800"
                  >
                    <p>{item.content}</p>
                  </div>
                )}
              </Draggable>
            ))}
            {droppableProvided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default index;

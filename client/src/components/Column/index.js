import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

import Style from "./Column.module.css";

const index = ({ columnData, itemsData }) => {
  return (
    <div className={Style.column_container}>
      {/* Column title */}
      <div className={Style.column_title_container}>
        <span className={Style.column_title_text}>{columnData.title}</span>
      </div>

      {/* Droppable Column area */}
      <Droppable droppableId={columnData.id}>
        {(droppableProvided, droppableSnapshot) => (
          <div
            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps}
            className={Style.column_items_container}
          >
            {/* Draggable items */}
            {itemsData.map((item, index) => (
              <Draggable key={item.id} draggableId={`${item.id}`} index={index}>
                {(draggableProvided, draggableSnapshot) => (
                  <div
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}
                    {...draggableProvided.dragHandleProps}
                    className={Style.item_container}
                  >
                    <p className={Style.item_text}>{item.content}</p>
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

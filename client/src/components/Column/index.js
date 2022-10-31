import React, { useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

import Style from "./Column.module.css";
import { FaEdit } from "react-icons/fa";

const index = ({ columnData, itemsData }) => {
  const [isEditing, setIsEditing] = useState(false);

  const editItem = (index, id, content) => {
    itemsData[index].content = content;
    console.log(itemsData[index]);
  };

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
                    <p className={Style.item_text}>
                      {isEditing ? (
                        <input
                          type="text"
                          defaultValue={item.content}
                          onChange={(e) =>
                            editItem(index, item.id, e.target.value)
                          }
                          className={Style.item_input}
                        />
                      ) : (
                        item.content
                      )}
                    </p>
                    <div
                      onClick={() => setIsEditing(!isEditing)}
                      className={Style.item_edit_button}
                    >
                      <FaEdit />
                    </div>
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

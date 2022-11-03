import React, { useEffect, useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

import Style from "./Column.module.css";
import { FaEdit } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";

const index = ({ columnData, itemsData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isEditingColumnTitle, setIsEditingColumnTitle] = useState(false);
  const [isEditingBoardTitle, setIsEditingBoardTitle] = useState(false);

  const [showColumnOptions, setShowColumnOptions] = useState(false);

  const editColumn = (newTitle) => {
    columnData.title = newTitle;
    console.log(columnData.title);
  };

  const editItem = (index, id, content) => {
    itemsData[index].content = content;
    console.log(itemsData[index]);
  };

  const toggleEdit = (id) => {
    if (isEditing === false) {
      setIsEditing(true);
      setEditingItem(id);
      return;
    }

    if (isEditing === true) {
      setIsEditing(false);
      setEditingItem(null);
      return;
    }
  };

  useEffect(() => {
    console.log("Ha cambiado");
  }, [columnData]);

  return (
    <div className={Style.column_container}>
      {/* Column title */}
      <div className={Style.column_title_container}>
        {isEditingColumnTitle ? (
          <input
            type="text"
            defaultValue={columnData.title}
            onChange={(e) => editColumn(e.target.value)}
            onKeyUp={(e) =>
              e.key === "Enter" || e.key === "Escape"
                ? setIsEditingColumnTitle(false)
                : null
            }
            autoFocus
            className={Style.column_title_input}
          />
        ) : (
          <span
            onClick={() => setIsEditingColumnTitle(true)}
            className={Style.column_title_text}
          >
            {columnData.title}
          </span>
        )}

        <div className="relative">
          <HiDotsHorizontal
            className={Style.column_options}
            onClick={() => setShowColumnOptions(!showColumnOptions)}
          />
          <ul
            className={
              showColumnOptions
                ? Style.column_options_shown
                : Style.column_options_hidden
            }
          >
            <li
              onClick={() => {
                setIsEditingColumnTitle(true);
                setShowColumnOptions(false);
              }}
              className={Style.column_option_item}
            >
              Rename column
            </li>
            <li className={Style.column_option_item}>Delete column</li>
          </ul>
        </div>
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
                      {isEditing && editingItem === item.id ? (
                        <input
                          type="text"
                          defaultValue={item.content}
                          onChange={(e) =>
                            editItem(index, item.id, e.target.value)
                          }
                          onKeyUp={(e) =>
                            e.key === "Enter" || e.key === "Escape"
                              ? toggleEdit(item.id)
                              : null
                          }
                          autoFocus
                          className={Style.item_input}
                        />
                      ) : (
                        item.content
                      )}
                    </p>
                    <FaEdit
                      onClick={() => toggleEdit(item.id)}
                      className={Style.item_edit_button}
                    />
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

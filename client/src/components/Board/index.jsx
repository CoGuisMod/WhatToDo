import React, { useEffect, useState } from "react";

/* Context imports */
import { UserAuth } from "../../context/AuthContext";
import { UserData } from "../../context/DataContext";

/* Icons imports */
import { FaPlus } from "react-icons/fa";
import Item from "./Item";

const index = () => {
  const { user } = UserAuth();
  const { addItem, getItems, itemsList, updateList, setUpdateList } =
    UserData();

  const [newItemContent, setNewItemContent] = useState("");

  const [items, setItems] = useState([]);

  const handleAdd = async () => {
    await addItem(user?.email, newItemContent);
    setUpdateList(!updateList);
  };

  useEffect(() => {
    if (itemsList !== null) {
      setItems(itemsList);
    }
  }, [itemsList]);

  useEffect(() => {
    getItems(user?.email);
  }, [updateList]);

  return (
    <div className="flex flex-col bg-slate-800 rounded-xl max-w-lg w-full mx-auto p-4">
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          onChange={(e) => setNewItemContent(e.target.value)}
          className="rounded-lg text-slate-900 w-full px-2 py-1"
        />
        <button onClick={handleAdd} className="text-xl hover:text-slate-50/90">
          <FaPlus />
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {items?.map((item, index) => (
          <Item key={index} data={item} />
        ))}
      </div>
      <p className="mx-auto mt-auto">You have {items?.length} items</p>
    </div>
  );
};

export default index;

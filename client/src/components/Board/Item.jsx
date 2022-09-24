import React, { useEffect, useState } from "react";

/* Context imports */
import { UserAuth } from "../../context/AuthContext";
import { UserData } from "../../context/DataContext";

/* Icons imports */
import { FaTrash } from "react-icons/fa";

const Item = ({ data }) => {
  const { user } = UserAuth();
  const { updateItem, deleteItem, updateList, setUpdateList } = UserData();

  const [itemCompleted, setitemCompleted] = useState(data.completed);

  const handleDelete = async () => {
    await deleteItem(user.email, data.id);
    setUpdateList(!updateList);
  };

  useEffect(() => {
    updateItem(user.email, data.id, itemCompleted, data.content);
    setUpdateList(!updateList);
  }, [itemCompleted]);

  return (
    <div className="flex justify-between items-center gap-4 bg-slate-50 rounded text-slate-900 px-2 py-1">
      <input
        type="checkbox"
        checked={data.completed}
        onChange={(e) => setitemCompleted(e.target.checked)}
      />
      <p className="flex-grow">{data.content}</p>
      <button onClick={handleDelete}>
        <FaTrash className="text-xl hover:text-slate-800" />
      </button>
    </div>
  );
};

export default Item;

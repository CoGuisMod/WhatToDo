import { createContext, useContext, useEffect, useState } from "react";
import { firebaseFirestore } from "../firebase/config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

const GeneralContext = createContext();

export const GeneralContextProvider = ({ children }) => {
  const [boards, setBoards] = useState(null);
  const [currentBoard, setCurrentBoard] = useState(null);

  /* Adds a new board */
  const addBoard = async (user) => {
    const docuRef = collection(firebaseFirestore, "users", user, "boards");
    await addDoc(docuRef, {
      board_title: "New board",
      board_data: {
        tasks: {
          1: { id: 1, content: "New item" },
        },
        columns: {
          "column-1": {
            id: "column-1",
            title: "New column",
            taskIds: [1],
          },
        },
        columnOrder: ["column-1"],
      },
    });
  };

  /* Gets all the boards of the logged user */
  const getBoards = async (user) => {
    const collRef = collection(firebaseFirestore, "users", user, "boards");
    const initialData = await getDocs(collRef);
    const finalData = initialData.docs.map((doc) => ({
      board_id: doc.id,
      ...doc.data(),
    }));
    setBoards(finalData);
  };

  const getCurrentBoard = async (user, board) => {
    const docuRef = doc(firebaseFirestore, "users", user, "boards", board);
    const initialData = await getDoc(docuRef);
    const finalData = initialData.data();
    setCurrentBoard(finalData);
  };

  const updateBoard = async (user, boardData) => {
    const docuRef = doc(firebaseFirestore, "users", user);
    await updateDoc(docuRef, {
      board_data: boardData,
    });
  };

  /* const addProduct = async (imgUrl, name, color, price, stock, category) => {
    const docuRef = collection(firebaseFirestore, "products");
    await addDoc(docuRef, {
      img_url: imgUrl,
      name: name,
      color: color,
      price: price,
      stock: stock,
      category: category,
    });
  };

  const deleteProduct = async (id) => {
    const docuRef = doc(firebaseFirestore, `products`, id);
    await deleteDoc(docuRef);
  };

  const editProduct = async (id, name, color, price, stock, category) => {
    const docuRef = doc(firebaseFirestore, "products", id);
    await updateDoc(docuRef, {
      name: name,
      color: color,
      price: price,
      stock: stock,
      category: category,
    });
  };

  const getProducts = async () => {
    const docuRef = collection(firebaseFirestore, "products");
    const initialData = await getDocs(docuRef);
    const finalData = initialData.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProducts(finalData);
  }; */

  return (
    <GeneralContext.Provider
      value={{
        addBoard,
        boards,
        setBoards,
        getBoards,
        currentBoard,
        setCurrentBoard,
        getCurrentBoard,
        updateBoard,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export function GeneralState() {
  return useContext(GeneralContext);
}

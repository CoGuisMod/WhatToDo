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

  const getCurrentBoard = async (user) => {
    const docuRef = doc(firebaseFirestore, "users", user);
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
        boards,
        setBoards,
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

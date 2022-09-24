import { createContext, useContext, useEffect, useState } from "react";
import { firebaseFirestore } from "../firebase/config";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

const DataContext = createContext();

export function DataContextProvider({ children }) {
  /* Items data */
  const [itemsList, setItemsList] = useState(null);
  const [updateList, setUpdateList] = useState(false);

  /* Items functions */
  const addItem = async (email, content) => {
    const docuRef = collection(firebaseFirestore, "users", email, "items");
    await addDoc(docuRef, {
      completed: false,
      content: content,
    });
  };

  const getItems = async (email) => {
    const docuRef = collection(firebaseFirestore, "users", email, "items");
    const initialData = await getDocs(docuRef);
    const finalData = initialData.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setItemsList(finalData);
  };

  const updateItem = async (email, id, completed, content) => {
    const docuRef = doc(firebaseFirestore, "users", email, "items", id);
    await updateDoc(docuRef, {
      completed: completed,
      content: content,
    });
  };

  const deleteItem = async (email, id) => {
    const docuRef = doc(firebaseFirestore, "users", email, "items", id);
    await deleteDoc(docuRef);
  };

  /* Boards functions */
  /* const getBoards = async (email) => {
      const docuRef = doc(firebaseFirestore, "users", email);
      const initialData = await getDoc(docuRef);
      const finalData = initialData.data();
      setUserBoards(finalData);
    }; */

  return (
    <DataContext.Provider
      value={{
        addItem,
        getItems,
        updateItem,
        deleteItem,
        itemsList,
        setItemsList,
        updateList,
        setUpdateList,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function UserData() {
  return useContext(DataContext);
}

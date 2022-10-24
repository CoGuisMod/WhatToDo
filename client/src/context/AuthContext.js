import { createContext, useContext, useEffect, useState } from "react";
import { firebaseAuth, firebaseFirestore } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

  const signUp = async (firstName, lastName, email, password) => {
    await createUserWithEmailAndPassword(firebaseAuth, email, password);

    /* Add the user data */
    await setDoc(doc(firebaseFirestore, "users", email), {
      first_name: firstName,
      last_name: lastName,
    });

    /* Adds a default board */
    await addDoc(collection(firebaseFirestore, "users", email, "boards"), {
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
        // Facilitate reordering of the columns
        columnOrder: ["column-1"],
      },
    });
  };

  const logIn = async (email, password) => {
    await signInWithEmailAndPassword(firebaseAuth, email, password);
  };

  const logOut = async () => {
    await signOut(firebaseAuth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  });

  return (
    <AuthContext.Provider value={{ signUp, logIn, logOut, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function UserAuth() {
  return useContext(AuthContext);
}

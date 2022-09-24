import { createContext, useContext, useEffect, useState } from "react";
import { firebaseAuth, firebaseFirestore } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  /* User auth data */
  const [user, setUser] = useState(null);

  /* Auth functions */
  const signUp = async (email, password) => {
    await createUserWithEmailAndPassword(firebaseAuth, email, password);
    await addDoc(collection(firebaseFirestore, "users", email, "items"), {
      completed: false,
      content: "Learn react js.",
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

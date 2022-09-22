import { createContext, useContext, useEffect, useState } from "react";
import { firebaseAuth, firebaseFirestore } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

  const signUp = async (email, password) => {
    await createUserWithEmailAndPassword(firebaseAuth, email, password);
    setDoc(doc(firebaseFirestore, "users", email), {
      bookmarks: [],
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

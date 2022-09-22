import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAX0A8neHZISJ0CRG6xIXMtUBUIK8ZxdbA",
  authDomain: "todoapp-d0363.firebaseapp.com",
  projectId: "todoapp-d0363",
  storageBucket: "todoapp-d0363.appspot.com",
  messagingSenderId: "363844960112",
  appId: "1:363844960112:web:7afeeabf76f80e6e75d9b5",
  measurementId: "G-KK8P358XLZ",
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firebaseAnalytics = getAnalytics(firebaseApp);
const firebaseFirestore = getFirestore(firebaseApp);

export { firebaseApp, firebaseAnalytics, firebaseAuth, firebaseFirestore };

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAX0A8neHZISJ0CRG6xIXMtUBUIK8ZxdbA",
  authDomain: "todoapp-d0363.firebaseapp.com",
  projectId: "todoapp-d0363",
  storageBucket: "todoapp-d0363.appspot.com",
  messagingSenderId: "363844960112",
  appId: "1:363844960112:web:7afeeabf76f80e6e75d9b5",
  measurementId: "G-KK8P358XLZ",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAnalytics = getAnalytics(firebaseApp);
const firebaseStorage = getStorage(firebaseApp);

export default { firebaseAnalytics, firebaseStorage };

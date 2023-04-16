import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';


const firebaseConfig = {
  apiKey: "AIzaSyBp--iRJpmtOcEXPO5R91wV9cL7YgwgcHI",
  authDomain: "react-diario-d5727.firebaseapp.com",
  projectId: "react-diario-d5727",
  storageBucket: "react-diario-d5727.appspot.com",
  messagingSenderId: "1084002699407",
  appId: "1:1084002699407:web:1c78c7e0319346c8b308fa",
  measurementId: "G-VYZWWGPZDK"
};

export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp)
export const FirebaseDB = getFirestore(FirebaseApp)

export const analytics = getAnalytics(FirebaseApp);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB3pstZvq7Gl4WDBF_XNCeLwCmozgD1BtU",
  authDomain: "treasure-hunt-eff8a.firebaseapp.com",
  projectId: "treasure-hunt-eff8a",
  storageBucket: "treasure-hunt-eff8a.appspot.com",
  messagingSenderId: "351928709608",
  appId: "1:351928709608:web:2418a8b4e223ffb422345d",
  measurementId: "G-06L5LT861Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth()
export {db,auth}

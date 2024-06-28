// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCgGYV-pkI15r2EhJf_t4FmjIiviT7XRBU",
    authDomain: "teacher-toolbox-db684.firebaseapp.com",
    projectId: "teacher-toolbox-db684",
    storageBucket: "teacher-toolbox-db684.appspot.com",
    messagingSenderId: "517390534049",
    appId: "1:517390534049:web:388937d21a0a92e666f7e0",
    measurementId: "G-TV30ECCSGC"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };

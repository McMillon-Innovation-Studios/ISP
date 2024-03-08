// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOxIMI0I1Zd6vHKKzR272l7JTGEgeZS5o",
  authDomain: "nextjs-firebase-28992.firebaseapp.com",
  projectId: "nextjs-firebase-28992",
  storageBucket: "nextjs-firebase-28992.appspot.com",
  messagingSenderId: "311705795275",
  appId: "1:311705795275:web:8971a20d4b0569d740394e",
  measurementId: "G-NWL6SKVWCK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);

export {app, firestore, auth};
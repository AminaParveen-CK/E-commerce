// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCA5-qi5qtH0MLHRisT_OCQmJqoZnSAOYY",
  authDomain: "e-commerce-230ea.firebaseapp.com",
  projectId: "e-commerce-230ea",
  storageBucket: "e-commerce-230ea.firebasestorage.app",
  messagingSenderId: "839457021723",
  appId: "1:839457021723:web:12f7895ddb54c4a425bdbe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore(app)
export default app;
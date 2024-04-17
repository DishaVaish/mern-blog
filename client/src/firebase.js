// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "mern-blog-ce725.firebaseapp.com",
  projectId: "mern-blog-ce725",
  storageBucket: "mern-blog-ce725.appspot.com",
  messagingSenderId: "810377323035",
  appId: "1:810377323035:web:69b2674f0050cc01e80ebe"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
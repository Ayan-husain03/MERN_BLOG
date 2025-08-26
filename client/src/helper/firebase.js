// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "mern-blog-7dc14.firebaseapp.com",
  projectId: "mern-blog-7dc14",
  storageBucket: "mern-blog-7dc14.firebasestorage.app",
  messagingSenderId: "1047403727169",
  appId: "1:1047403727169:web:e1e4de8cf4d3216df739c0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBT3TuvawrVYHIOOxcqHk1MkawyixyyVkU",
  authDomain: "board-2f7a9.firebaseapp.com",
  projectId: "board-2f7a9",
  storageBucket: "board-2f7a9.appspot.com",
  messagingSenderId: "517826493650",
  appId: "1:517826493650:web:8c2143a858274a189dc10b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
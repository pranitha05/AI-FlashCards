// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTbBHH7PEm8Dp6bm7NGxuXfbBCatsHXPw",
  authDomain: "ai-flashcard-51756.firebaseapp.com",
  projectId: "ai-flashcard-51756",
  storageBucket: "ai-flashcard-51756.appspot.com",
  messagingSenderId: "1001213127561",
  appId: "1:1001213127561:web:7813ad11a5fc03ccbf8f58",
  measurementId: "G-8S395WNDH5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebase = getFirestore(app);

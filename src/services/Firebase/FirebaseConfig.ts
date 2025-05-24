// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCvNmXdYn3xpTSUrI8kIWKUwWnuZTToik",
  authDomain: "danielr-labauthtasks.firebaseapp.com",
  projectId: "danielr-labauthtasks",
  storageBucket: "danielr-labauthtasks.firebasestorage.app",
  messagingSenderId: "557493107458",
  appId: "1:557493107458:web:3c3cd6ddea3aff422c601b",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
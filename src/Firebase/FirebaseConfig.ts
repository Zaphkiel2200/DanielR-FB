import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
  } from "firebase/auth";

  const firebaseConfig = {
  apiKey: "AIzaSyCCvNmXdYn3xpTSUrI8kIWKUwWnuZTToik",
  authDomain: "danielr-labauthtasks.firebaseapp.com",
  projectId: "danielr-labauthtasks",
  storageBucket: "danielr-labauthtasks.firebasestorage.app",
  messagingSenderId: "557493107458",
  appId: "1:557493107458:web:3c3cd6ddea3aff422c601b",
  measurementId: "G-1KBDC3J8B8"
  };
  
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); 
const auth = getAuth(app);

const registerUser = async (email: string, password: string) => {
	try {
    console.log("Registering user with email:", email);
		const userCredential = await createUserWithEmailAndPassword(auth, email, password);
		console.log(userCredential.user);
		return { isRegistered: true, user: userCredential };
	} catch (error) {
		console.error(error);
		return { isRegistered: false, error: error };
	}
};

const loginUser = async (email: string, password: string) => {
  try {
    console.log("Logging in user with email:", email);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log(userCredential.user);
    return { isLoggedIn: true, user: userCredential };
  } catch (error) {
    console.error(error);
    return { isLoggedIn: false, error: error };
  }
}

export { app, db, auth, registerUser, loginUser};
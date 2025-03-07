import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBNvMAr_4Z5sDfGExYYDYbn--3V2ePFQxM",
  authDomain: "gomining-b1d2b.firebaseapp.com",
  projectId: "gomining-b1d2b",
  storageBucket: "gomining-b1d2b.firebasestorage.app",
  messagingSenderId: "65339520107",
  appId: "1:65339520107:web:afc8cacf30fe92a795ed2e",
  measurementId: "G-WP4SZ4LCRD"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider };

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrCwSrcO5QzM1ArONV68UZc10bbHTz1Lk",
  authDomain: "rybachok-e4844.firebaseapp.com",
  projectId: "rybachok-e4844",
  storageBucket: "rybachok-e4844.firebasestorage.app",
  messagingSenderId: "832664817493",
  appId: "1:832664817493:web:9d69a34af13c87e695a9dc",
  measurementId: "G-7LDT4MTGFX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;

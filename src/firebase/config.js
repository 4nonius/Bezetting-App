// Firebase configuration
// Replace these values with your Firebase project configuration
// Get these from: Firebase Console > Project Settings > General > Your apps

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyCDCUY6zk3DWA1vCkc71UwE2HXiJmh4a54",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "mealapp-70aae.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "mealapp-70aae",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "mealapp-70aae.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "1096256305429",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:1096256305429:web:7633683d9f6a5a0c8c911c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth (for future use if needed)
export const auth = getAuth(app);

export default app;


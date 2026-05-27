import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = 
  getApps().length > 0 
    ? getApp() 
    : firebaseConfig.apiKey 
      ? initializeApp(firebaseConfig) 
      : null;

// Initialize Services
const db = app ? getFirestore(app) : null as any;
const auth = app ? getAuth(app) : null as any;

// Analytics (Server-side rendering check)
const analytics = (typeof window !== "undefined" && app) ? isSupported().then((yes) => yes ? getAnalytics(app) : null) : null;

export { app, db, auth, analytics };

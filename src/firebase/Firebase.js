// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// console.log(import.meta.env.VITE_FIREBASE_API_KEY)

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app)

// Initialize Firestore
// const firebaseDb = getFirestore(firebaseApp)

// Set up providers
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();


// Initialize Firebase Auth
const auth = getAuth(app);

export const firebase = {
    app,
    analytics,
    // firebaseDb,
    auth,
    googleProvider,
    facebookProvider,
};
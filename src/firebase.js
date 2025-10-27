// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDwF3Mi8kA3RH4KOsPOAPr3J3YTVP9RYHI",
  authDomain: "mb-chat-io.firebaseapp.com",
  projectId: "mb-chat-io",
  storageBucket: "mb-chat-io.firebasestorage.app",
  messagingSenderId: "301106519007",
  appId: "1:301106519007:web:1845269cdcac9a2595026a",
  measurementId: "G-1Z7QLGKJWQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services with error handling
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Configure Google Auth Provider
export const provider = new GoogleAuthProvider();
provider.addScope('email');
provider.addScope('profile');
provider.setCustomParameters({
  prompt: 'select_account'
});

// Initialize Analytics only if available
let analytics;
try {
  analytics = getAnalytics(app);
} catch (error) {
  console.warn('Analytics not available:', error);
}

export default app;

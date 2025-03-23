import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGlnmLSwf7WWWUDFFG0X9lXICBUNdzQ4o",
  authDomain: "the-spot-d263b.firebaseapp.com",
  databaseURL: "https://the-spot-d263b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "the-spot-d263b",
  storageBucket: "the-spot-d263b.firebasestorage.app",
  messagingSenderId: "639996727754",
  appId: "1:639996727754:web:97885802183fdef154ff33",
  measurementId: "G-RLNPG764GF"
};

// Initialize Firebase and return instances
export const initializeFirebase = () => {
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);
  const database = getDatabase(app);

  return {
    app,
    analytics,
    auth,
    database
  };
}; 
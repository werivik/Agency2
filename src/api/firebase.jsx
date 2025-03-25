import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);

export { app, analytics, auth, database }; 
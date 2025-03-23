import React from 'react';
import ReactDOM from 'react-dom/client';
import { initializeFirebase } from './api/firebase.js';
import App from './App';

// Initialize Firebase when the application starts
initializeFirebase();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
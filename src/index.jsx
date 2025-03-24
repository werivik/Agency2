<<<<<<< HEAD
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { app } from './api/firebase.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  React.createElement(React.StrictMode, null,
    React.createElement(App, null)
  )
); 
=======
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from './App';
import './index.css';

createRoot(document.getElementById('root')).render(< App />);
>>>>>>> origin/main

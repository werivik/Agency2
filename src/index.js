import { initializeFirebase } from './api/firebase.js';
import { createEvent, getEvents, updateEvent, deleteEvent } from '../api/events.js';
import { getAuth } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

// Initialize Firebase when the application starts
initializeFirebase();
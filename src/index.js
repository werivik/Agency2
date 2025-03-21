  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";
  import { getAuth } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
  import { getDatabase, ref, push, set, get, update, remove, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";
  
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// events collection
{
  "events": {
    "event_id_1": {
      "title": "Community Meetup",
      "description": "Join us for a community gathering",
      "location": "City Park",
      "date": timestamp,
      "organizer": "user_id_1",
      "attendees": {
        "user_id_2": true,
        "user_id_3": true
      },
      "isPublic": true,
      "createdAt": timestamp,
      "maxAttendees": 50
    },
    // more events...
  }
}
import { ref, push, set, get, update, remove, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";
import { database, auth } from './firebase.jsx';
import { getDatabase } from 'firebase/database';

const db = getDatabase();

// Create a new event
export const createEvent = async (eventData) => {
  try {
    const eventsRef = ref(database, 'events');
    const newEventRef = push(eventsRef);
    await set(newEventRef, {
      ...eventData,
      createdAt: serverTimestamp(),
      createdBy: auth.currentUser?.uid
    });
    return newEventRef.key;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};

// Get all events
export const getEvents = async () => {
  try {
    const eventsRef = ref(db, 'events');
    const snapshot = await get(eventsRef);
    if (snapshot.exists()) {
      const events = [];
      snapshot.forEach((childSnapshot) => {
        events.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
      return events;
    }
    return [];
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

// Get a single event by ID
export const getEventById = async (eventId) => {
  try {
    const eventRef = ref(db, `events/${eventId}`);
    const snapshot = await get(eventRef);
    if (snapshot.exists()) {
      return {
        id: snapshot.key,
        ...snapshot.val()
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching event:', error);
    throw error;
  }
};

// Update an event
export const updateEvent = async (eventId, eventData) => {
  try {
    const eventRef = ref(database, `events/${eventId}`);
    await update(eventRef, {
      ...eventData,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
};

// Delete an event
export const deleteEvent = async (eventId) => {
  try {
    const eventRef = ref(database, `events/${eventId}`);
    await remove(eventRef);
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
}; 
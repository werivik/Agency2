import { ref, push, set, get, update, remove, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";
import { initializeFirebase } from './firebase.js';

const { database, auth } = initializeFirebase();

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
    const eventsRef = ref(database, 'events');
    const snapshot = await get(eventsRef);
    if (snapshot.exists()) {
      return Object.entries(snapshot.val()).map(([key, value]) => ({
        id: key,
        ...value
      }));
    }
    return [];
  } catch (error) {
    console.error('Error fetching events:', error);
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
import { ref, push, set, get, update, remove, serverTimestamp } from 'firebase/database';
import { database, auth } from './firebase.jsx';

// Create a new event
export const createEvent = async (eventData) => {
  try {
    // Check if user is authenticated
    if (!auth.currentUser) {
      throw new Error('User must be authenticated to create an event');
    }

    const eventsRef = ref(database, 'events');
    const newEventRef = push(eventsRef);
    
    // Combine date and time fields
    const dateTime = new Date(`${eventData.date}T${eventData.time}`);
    
    await set(newEventRef, {
      ...eventData,
      dateTime: dateTime.toISOString(),
      createdAt: serverTimestamp(),
      createdBy: auth.currentUser.uid
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
    const eventRef = ref(database, `events/${eventId}`);
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
    if (!auth.currentUser) {
      throw new Error('User must be authenticated to update an event');
    }
    
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
    if (!auth.currentUser) {
      throw new Error('User must be authenticated to delete an event');
    }
    
    const eventRef = ref(database, `events/${eventId}`);
    await remove(eventRef);
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
}; 
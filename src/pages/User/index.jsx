import React, { useState, useEffect } from 'react';
import { getEvents } from '../../api/events';

function User() {
  const [userEvents, setUserEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserEvents = async () => {
      try {
        const events = await getEvents();
        // TODO: Filter events for current user
        setUserEvents(events);
      } catch (err) {
        setError('Failed to fetch user events');
        console.error('Error fetching user events:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserEvents();
  }, []);

  const containerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '2rem'
  };

  const eventCardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '1rem',
    marginBottom: '1rem',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  const titleStyle = {
    margin: '0 0 1rem 0',
    color: '#333'
  };

  const infoStyle = {
    color: '#666',
    marginBottom: '0.5rem'
  };

  if (loading) {
    return React.createElement('div', null, 'Loading user events...');
  }

  if (error) {
    return React.createElement('div', { style: { color: 'red' } }, error);
  }

  return React.createElement('div', { style: containerStyle },
    React.createElement('h1', null, 'My Events'),
    React.createElement('div', { className: 'user-events' },
      userEvents.map(event => 
        React.createElement('div', { key: event.id, style: eventCardStyle },
          React.createElement('h2', { style: titleStyle }, event.title),
          React.createElement('p', { style: infoStyle }, event.description),
          React.createElement('p', { style: infoStyle }, `Location: ${event.location}`),
          React.createElement('p', { style: infoStyle }, `Date: ${new Date(event.date).toLocaleString()}`),
          React.createElement('p', { style: infoStyle }, `Status: ${event.isPublic ? 'Public' : 'Private'}`)
        )
      )
    )
  );
}

export default User; 
import React, { useState, useEffect } from 'react';
import { getEvents } from '../../api/events';

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsData = await getEvents();
        setEvents(eventsData);
      } catch (err) {
        setError('Failed to fetch events');
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '2rem',
    marginTop: '2rem'
  };

  const cardStyle = {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    overflow: 'hidden'
  };

  const imageStyle = {
    width: '100%',
    height: '200px',
    objectFit: 'cover'
  };

  const contentStyle = {
    padding: '1.5rem'
  };

  const titleStyle = {
    margin: '0 0 1rem 0',
    fontSize: '1.5rem',
    color: '#333'
  };

  const textStyle = {
    color: '#666',
    marginBottom: '1rem'
  };

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block'
  };

  if (loading) {
    return React.createElement('div', { style: containerStyle },
      React.createElement('p', null, 'Loading events...')
    );
  }

  if (error) {
    return React.createElement('div', { style: containerStyle },
      React.createElement('p', { style: { color: 'red' } }, error)
    );
  }

  return React.createElement('div', { style: containerStyle },
    React.createElement('h1', null, 'Events'),
    React.createElement('div', { style: gridStyle },
      events.map(event => 
        React.createElement('div', { key: event.id, style: cardStyle },
          React.createElement('img', {
            src: event.imageUrl || 'https://via.placeholder.com/300x200',
            alt: event.title,
            style: imageStyle
          }),
          React.createElement('div', { style: contentStyle },
            React.createElement('h2', { style: titleStyle }, event.title),
            React.createElement('p', { style: textStyle }, event.description),
            React.createElement('p', { style: textStyle },
              `Date: ${new Date(event.date).toLocaleDateString()}`
            ),
            React.createElement('p', { style: textStyle },
              `Location: ${event.location}`
            ),
            React.createElement('p', { style: textStyle },
              `Attendees: ${event.attendees?.length || 0}/${event.maxAttendees}`
            ),
            React.createElement('a', {
              href: `/events/${event.id}`,
              style: buttonStyle
            }, 'View Details')
          )
        )
      )
    )
  );
}

export default Events; 
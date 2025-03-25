import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getEventById } from '../../api/events';

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventData = await getEventById(id);
        setEvent(eventData);
      } catch (err) {
        setError('Failed to fetch event details');
        console.error('Error fetching event:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const containerStyle = {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '2rem'
  };

  const headerStyle = {
    marginBottom: '2rem'
  };

  const imageStyle = {
    width: '100%',
    height: '400px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '2rem'
  };

  const titleStyle = {
    fontSize: '2.5rem',
    color: '#333',
    marginBottom: '1rem'
  };

  const infoStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem',
    padding: '1rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px'
  };

  const infoItemStyle = {
    display: 'flex',
    flexDirection: 'column'
  };

  const labelStyle = {
    fontSize: '0.9rem',
    color: '#666',
    marginBottom: '0.5rem'
  };

  const valueStyle = {
    fontSize: '1.1rem',
    color: '#333',
    fontWeight: '500'
  };

  const descriptionStyle = {
    fontSize: '1.1rem',
    lineHeight: '1.6',
    color: '#444',
    marginBottom: '2rem'
  };

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '1rem 2rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500'
  };

  if (loading) {
    return React.createElement('div', { style: containerStyle },
      React.createElement('p', null, 'Loading event details...')
    );
  }

  if (error) {
    return React.createElement('div', { style: containerStyle },
      React.createElement('p', { style: { color: 'red' } }, error)
    );
  }

  if (!event) {
    return React.createElement('div', { style: containerStyle },
      React.createElement('p', null, 'Event not found')
    );
  }

  return React.createElement('div', { style: containerStyle },
    React.createElement('div', { style: headerStyle },
      React.createElement('img', {
        src: event.imageUrl || 'https://via.placeholder.com/1000x400',
        alt: event.title,
        style: imageStyle
      }),
      React.createElement('h1', { style: titleStyle }, event.title),
      React.createElement('div', { style: infoStyle },
        React.createElement('div', { style: infoItemStyle },
          React.createElement('span', { style: labelStyle }, 'Date'),
          React.createElement('span', { style: valueStyle },
            new Date(event.date).toLocaleDateString()
          )
        ),
        React.createElement('div', { style: infoItemStyle },
          React.createElement('span', { style: labelStyle }, 'Location'),
          React.createElement('span', { style: valueStyle }, event.location)
        ),
        React.createElement('div', { style: infoItemStyle },
          React.createElement('span', { style: labelStyle }, 'Attendees'),
          React.createElement('span', { style: valueStyle },
            `${event.attendees?.length || 0}/${event.maxAttendees}`
          )
        ),
        React.createElement('div', { style: infoItemStyle },
          React.createElement('span', { style: labelStyle }, 'Status'),
          React.createElement('span', { style: valueStyle },
            event.isPublic ? 'Public' : 'Private'
          )
        )
      )
    ),
    React.createElement('div', { style: descriptionStyle },
      React.createElement('h2', { style: { marginBottom: '1rem' } }, 'Description'),
      React.createElement('p', null, event.description)
    ),
    React.createElement('button', { style: buttonStyle }, 'Register for Event')
  );
}

export default EventDetails; 
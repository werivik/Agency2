import React, { useState } from 'react';
import { createEvent } from '../../../api/events';

function CreateEvent() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    date: '',
    maxAttendees: '',
    isPublic: true
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEvent(formData);
      // Reset form
      setFormData({
        title: '',
        description: '',
        location: '',
        date: '',
        maxAttendees: '',
        isPublic: true
      });
      alert('Event created successfully!');
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Failed to create event. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const formStyle = {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  const inputStyle = {
    width: '100%',
    padding: '0.5rem',
    marginBottom: '1rem',
    borderRadius: '4px',
    border: '1px solid #ddd'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    color: '#333'
  };

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '0.8rem 2rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem'
  };

  const checkboxContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1rem'
  };

  const checkboxStyle = {
    marginRight: '0.5rem'
  };

  return React.createElement('form', { onSubmit: handleSubmit, style: formStyle },
    React.createElement('div', null,
      React.createElement('label', { htmlFor: 'title', style: labelStyle }, 'Event Title'),
      React.createElement('input', {
        type: 'text',
        id: 'title',
        name: 'title',
        value: formData.title,
        onChange: handleChange,
        required: true,
        style: inputStyle
      })
    ),
    React.createElement('div', null,
      React.createElement('label', { htmlFor: 'description', style: labelStyle }, 'Description'),
      React.createElement('textarea', {
        id: 'description',
        name: 'description',
        value: formData.description,
        onChange: handleChange,
        required: true,
        style: { ...inputStyle, minHeight: '100px', resize: 'vertical' }
      })
    ),
    React.createElement('div', null,
      React.createElement('label', { htmlFor: 'location', style: labelStyle }, 'Location'),
      React.createElement('input', {
        type: 'text',
        id: 'location',
        name: 'location',
        value: formData.location,
        onChange: handleChange,
        required: true,
        style: inputStyle
      })
    ),
    React.createElement('div', null,
      React.createElement('label', { htmlFor: 'date', style: labelStyle }, 'Date'),
      React.createElement('input', {
        type: 'datetime-local',
        id: 'date',
        name: 'date',
        value: formData.date,
        onChange: handleChange,
        required: true,
        style: inputStyle
      })
    ),
    React.createElement('div', null,
      React.createElement('label', { htmlFor: 'maxAttendees', style: labelStyle }, 'Maximum Attendees'),
      React.createElement('input', {
        type: 'number',
        id: 'maxAttendees',
        name: 'maxAttendees',
        value: formData.maxAttendees,
        onChange: handleChange,
        required: true,
        min: '1',
        style: inputStyle
      })
    ),
    React.createElement('div', { style: checkboxContainerStyle },
      React.createElement('input', {
        type: 'checkbox',
        id: 'isPublic',
        name: 'isPublic',
        checked: formData.isPublic,
        onChange: handleChange,
        style: checkboxStyle
      }),
      React.createElement('label', { htmlFor: 'isPublic', style: labelStyle }, 'Public Event')
    ),
    React.createElement('button', { type: 'submit', style: buttonStyle }, 'Create Event')
  );
}

export default CreateEvent; 
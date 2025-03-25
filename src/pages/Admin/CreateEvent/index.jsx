import React, { useState } from 'react';
import { createEvent } from '../../../api/events';
import { auth } from '../../../api/firebase';
import { useNavigate } from 'react-router-dom';
import styles from '../Admin.module.css';
import { DEFAULT_EVENT_IMAGE } from '../../../constants/images';

function CreateEvent() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    date: '',
    time: '',
    image: '',
    tags: [''],
    maxAttendees: '',
    isPublic: true
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (!auth.currentUser) {
        setError('You must be logged in to create an event. Please log in first.');
        navigate('/login');
        return;
      }

      // Use default image if no image URL is provided
      const eventDataWithImage = {
        ...formData,
        image: formData.image || DEFAULT_EVENT_IMAGE
      };

      await createEvent(eventDataWithImage);
      // Reset form
      setFormData({
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        image: '',
        tags: [''],
        maxAttendees: '',
        isPublic: true
      });
      alert('Event created successfully!');
    } catch (error) {
      console.error('Error creating event:', error);
      setError(error.message || 'Failed to create event. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div style={{ color: 'red', marginBottom: '1rem', padding: '0.5rem', backgroundColor: '#ffebee' }}>
          {error}
        </div>
      )}
      
      <div className={styles.formGrid}>
        <div className={styles.imageSection}>
          <img 
            src={formData.image || DEFAULT_EVENT_IMAGE}
            alt="Event preview" 
            style={{
              width: '100%',
              height: '400px',
              objectFit: 'cover',
              borderRadius: '4px'
            }}
          />
        </div>

        <div className={styles.formSection}>
          <div className={styles.formField}>
            <label className={styles.formLabel}>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className={styles.formInput}
            />
          </div>

          <div className={styles.formField}>
            <label className={styles.formLabel}>Date & Time</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className={styles.formInput}
              />
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className={styles.formInput}
              />
            </div>
          </div>

          <div className={styles.formField}>
            <label className={styles.formLabel}>Event Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className={styles.formTextarea}
            />
          </div>

          <div className={styles.formField}>
            <label className={styles.formLabel}>Tags</label>
            <input
              type="text"
              name="tags"
              value={formData.tags[0]}
              onChange={(e) => setFormData(prev => ({ ...prev, tags: [e.target.value] }))}
              className={styles.formInput}
            />
          </div>

          <div className={styles.formField}>
            <label className={styles.formLabel}>Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className={styles.formInput}
            />
          </div>

          <div className={styles.formField}>
            <label className={styles.formLabel}>Image URL</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className={styles.formInput}
            />
          </div>

          <div className={styles.formField}>
            <label className={styles.formLabel}>Maximum Attendees</label>
            <input
              type="number"
              name="maxAttendees"
              value={formData.maxAttendees}
              onChange={handleChange}
              min="1"
              required
              className={styles.formInput}
              placeholder="Enter maximum number of attendees"
            />
          </div>

          <div className={styles.formField}>
            <label className={styles.formLabel} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="checkbox"
                name="isPublic"
                checked={formData.isPublic}
                onChange={handleChange}
                style={{ width: 'auto', margin: 0 }}
              />
              Public Event
            </label>
          </div>
        </div>
      </div>

      <div className={styles.buttonContainer}>
        <button type="button" className={styles.deleteButton}>
          Delete
        </button>
        <button type="submit" className={styles.saveButton}>
          Save Changes
        </button>
      </div>
    </form>
  );
}

export default CreateEvent; 
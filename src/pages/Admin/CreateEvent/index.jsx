import React, { useState } from 'react';
import { createEvent } from '../../../api/events';
import { convertToBase64 } from '../../../api/imageUpload';
import { auth } from '../../../api/firebase';
import { useNavigate } from 'react-router-dom';
import styles from '../Admin.module.css';
import { DEFAULT_EVENT_IMAGE } from '../../../constants/images';
import { checkStorageLimit } from '../../../utils/storageTracker';

function CreateEvent() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    date: '',
    time: '',
    image: '',
    imageUrl: '',
    tags: [''],
    maxAttendees: '',
    isPublic: true
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const navigate = useNavigate();

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setSelectedFile(file);
        // Create a preview URL for the selected image
        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);
        
        // Convert to base64
        const base64 = await convertToBase64(file);
        
        // Check storage limits
        const storageCheck = await checkStorageLimit(base64);
        
        if (!storageCheck.canUpload) {
          setError(storageCheck.error);
          setSelectedFile(null);
          setPreviewUrl('');
          return;
        }

        setFormData(prev => ({
          ...prev,
          image: base64,
          imageUrl: ''
        }));
      } catch (error) {
        console.error('Error processing image:', error);
        setError(error.message || 'Failed to process image');
      }
    }
  };

  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setFormData(prev => ({
      ...prev,
      imageUrl: url,
      image: ''
    }));
    setPreviewUrl(url);
    setSelectedFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setUploading(true);

    try {
      // Check if user is logged in
      if (!auth.currentUser) {
        setError('You must be logged in to create an event. Please log in first.');
        setUploading(false);
        navigate('/login');
        return;
      }

      // Validate required fields
      if (!formData.title || !formData.description || !formData.location || !formData.date || !formData.time) {
        setError('Please fill in all required fields');
        setUploading(false);
        return;
      }

      // Prepare event data
      const eventDataWithImage = {
        ...formData,
        image: formData.imageUrl || formData.image || DEFAULT_EVENT_IMAGE,
        maxAttendees: parseInt(formData.maxAttendees) || null,
        tags: formData.tags.filter(tag => tag.trim() !== '')
      };

      delete eventDataWithImage.imageUrl;

      console.log('Creating event with data:', eventDataWithImage);
      
      // Create the event
      const eventId = await createEvent(eventDataWithImage);
      console.log('Event created successfully with ID:', eventId);
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        image: '',
        imageUrl: '',
        tags: [''],
        maxAttendees: '',
        isPublic: true
      });
      setSelectedFile(null);
      setPreviewUrl('');
      
      // Show success message
      alert('Event created successfully!');
      
      // Navigate to events page
      navigate('/events');
    } catch (error) {
      console.error('Error creating event:', error);
      setError(error.message || 'Failed to create event. Please try again.');
    } finally {
      setUploading(false);
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
    <>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>Create New Event</h1>
      <form onSubmit={handleSubmit}>
        {error && (
          <div style={{ color: 'red', marginBottom: '1rem', padding: '0.5rem', backgroundColor: '#ffebee' }}>
            {error}
          </div>
        )}
        
        <div className={styles.formGrid}>
          <div className={styles.imageSection}>
            <img 
              src={previewUrl || formData.image || formData.imageUrl || DEFAULT_EVENT_IMAGE}
              alt="Event preview" 
              style={{
                width: '100%',
                height: '400px',
                objectFit: 'cover',
                borderRadius: '4px'
              }}
            />
            <div className={styles.imageUpload}>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
                id="image-upload"
              />
              <label 
                htmlFor="image-upload"
                className={styles.uploadButton}
                style={{
                  display: 'inline-block',
                  padding: '0.5rem 1rem',
                  backgroundColor: '#4a4a8a',
                  color: 'white',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  marginTop: '1rem'
                }}
              >
                Choose Image
              </label>
              <span style={{ marginLeft: '1rem', color: '#666' }}>
                {selectedFile ? selectedFile.name : 'No file chosen'}
              </span>
            </div>
            <div className={styles.formField} style={{ marginTop: '1rem' }}>
              <label className={styles.formLabel}>Or enter image URL</label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleImageUrlChange}
                placeholder="https://example.com/image.jpg"
                className={styles.formInput}
              />
            </div>
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
              <label className={styles.formLabel}>Maximum Attendees</label>
              <input
                type="number"
                name="maxAttendees"
                value={formData.maxAttendees}
                onChange={handleChange}
                min="1"
                required
                className={styles.formInput}
              />
            </div>

            <div className={styles.formField}>
              <label className={styles.formLabel}>Tags (comma-separated)</label>
              <input
                type="text"
                name="tags"
                value={formData.tags.join(', ')}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  tags: e.target.value.split(',').map(tag => tag.trim()) 
                }))}
                className={styles.formInput}
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
          <button 
            type="submit" 
            className={styles.saveButton}
            disabled={uploading}
          >
            {uploading ? 'Creating Event...' : 'Create Event'}
          </button>
        </div>
      </form>
    </>
  );
}

export default CreateEvent; 
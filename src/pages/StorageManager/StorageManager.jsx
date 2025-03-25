import React, { useState, useEffect } from 'react';
import { ref, get, remove } from 'firebase/database';
import { database, auth } from '../../api/firebase';
import { calculateTotalStorageSize } from '../../utils/storageTracker';
import { Link } from 'react-router-dom';
import styles from './StorageManager.module.css';
import { DEFAULT_EVENT_IMAGE } from '../../constants/images';

const StorageManager = () => {
  const [storageData, setStorageData] = useState({
    usedSpace: 0,
    remainingSpace: 0,
    usedSpaceMB: '0',
    remainingSpaceMB: '0',
    percentUsed: 0
  });
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [sortBy, setSortBy] = useState('size');

  const MAX_STORAGE = 900 * 1024 * 1024; // 900MB

  useEffect(() => {
    fetchStorageData();
  }, []);

  const fetchStorageData = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Get storage usage
      const currentSize = await calculateTotalStorageSize();
      const remainingSpace = MAX_STORAGE - currentSize;
      const percentUsed = (currentSize / MAX_STORAGE) * 100;
      
      setStorageData({
        usedSpace: currentSize,
        remainingSpace,
        usedSpaceMB: (currentSize / (1024 * 1024)).toFixed(2),
        remainingSpaceMB: (remainingSpace / (1024 * 1024)).toFixed(2),
        percentUsed: percentUsed.toFixed(1)
      });

      // Get all events
      const eventsRef = ref(database, 'events');
      const snapshot = await get(eventsRef);
      
      if (snapshot.exists()) {
        const eventsData = snapshot.val();
        const eventsList = Object.entries(eventsData).map(([id, data]) => {
          // Calculate image size if it's base64
          let imageSize = 0;
          if (data.image && data.image.startsWith('data:image')) {
            const base64Data = data.image.split(',')[1] || data.image;
            imageSize = Math.ceil((base64Data.length * 3) / 4);
          }

          return {
            id,
            ...data,
            imageSize,
            imageSizeMB: (imageSize / (1024 * 1024)).toFixed(2),
            createdAt: data.createdAt || 0,
            isUrlImage: data.image && !data.image.startsWith('data:image'),
            isDefaultImage: !data.image || data.image === DEFAULT_EVENT_IMAGE
          };
        });

        // Sort by image size by default
        const sortedEvents = sortEvents(eventsList, sortBy);
        setEvents(sortedEvents);
      } else {
        setEvents([]);
      }
    } catch (err) {
      setError('Failed to load storage data: ' + err.message);
      console.error('Error fetching storage data:', err);
    } finally {
      setLoading(false);
    }
  };

  const sortEvents = (eventsList, sortType) => {
    switch (sortType) {
      case 'size':
        return [...eventsList].sort((a, b) => b.imageSize - a.imageSize);
      case 'date':
        return [...eventsList].sort((a, b) => b.createdAt - a.createdAt);
      case 'name':
        return [...eventsList].sort((a, b) => a.title.localeCompare(b.title));
      default:
        return eventsList;
    }
  };

  const handleSort = (type) => {
    setSortBy(type);
    setEvents(sortEvents(events, type));
  };

  const removeImage = async (eventId) => {
    if (!auth.currentUser) {
      setError('You must be logged in to manage storage');
      return;
    }

    try {
      const eventRef = ref(database, `events/${eventId}`);
      const snapshot = await get(eventRef);
      
      if (snapshot.exists()) {
        const eventData = snapshot.val();
        
        // Update the event to use default image
        await remove(ref(database, `events/${eventId}/image`));
        
        setSuccess(`Image removed from event "${eventData.title}"`);
        
        // Refresh data
        fetchStorageData();
        
        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err) {
      setError('Failed to remove image: ' + err.message);
    }
  };

  const getStatusColor = (percentUsed) => {
    if (percentUsed < 70) return '#2196f3'; // Blue - healthy
    if (percentUsed < 85) return '#ff9800'; // Orange - warning
    return '#f44336'; // Red - critical
  };

  return (
    <div className={styles.storageManager}>
      <h1>The Secret Dev Storage Menu</h1>
      
      {error && (
        <div className={styles.errorMessage}>
          {error}
        </div>
      )}
      
      {success && (
        <div className={styles.successMessage}>
          {success}
        </div>
      )}
      
      {loading ? (
        <div className={styles.loading}>Loading storage data...</div>
      ) : (
        <>
          <div className={styles.storageOverview}>
            <h2>Storage Overview</h2>
            <div className={styles.storageInfo}>
              <div className={styles.progressContainer}>
                <div 
                  className={styles.progressBar} 
                  style={{ 
                    width: `${storageData.percentUsed}%`,
                    backgroundColor: getStatusColor(storageData.percentUsed)
                  }}
                ></div>
              </div>
              <div className={styles.storageText}>
                {storageData.percentUsed}% Used ({storageData.usedSpaceMB}MB / 900MB)
              </div>
              <div className={styles.storageDetails}>
                <div>
                  <strong>Used Space:</strong> {storageData.usedSpaceMB}MB
                </div>
                <div>
                  <strong>Remaining Space:</strong> {storageData.remainingSpaceMB}MB
                </div>
              </div>
            </div>
          </div>

          <div className={styles.eventsList}>
            <h2>Events with Images</h2>
            
            <div className={styles.sortControls}>
              Sort by: 
              <button 
                className={`${styles.sortButton} ${sortBy === 'size' ? styles.active : ''}`}
                onClick={() => handleSort('size')}
              >
                Size
              </button>
              <button 
                className={`${styles.sortButton} ${sortBy === 'date' ? styles.active : ''}`}
                onClick={() => handleSort('date')}
              >
                Date
              </button>
              <button 
                className={`${styles.sortButton} ${sortBy === 'name' ? styles.active : ''}`}
                onClick={() => handleSort('name')}
              >
                Name
              </button>
            </div>

            <div className={styles.eventsTable}>
              <div className={styles.tableHeader}>
                <div className={styles.tableCol}>Event</div>
                <div className={styles.tableCol}>Image</div>
                <div className={styles.tableCol}>Size</div>
                <div className={styles.tableCol}>Actions</div>
              </div>
              
              {events.length === 0 ? (
                <div className={styles.noEvents}>No events found</div>
              ) : (
                events.map(event => (
                  <div key={event.id} className={styles.eventRow}>
                    <div className={styles.tableCol}>
                      <Link to={`/events/${event.id}`} className={styles.eventLink}>
                        {event.title}
                      </Link>
                    </div>
                    <div className={styles.tableCol}>
                      <div className={styles.imagePreview}>
                        <img 
                          src={event.image || DEFAULT_EVENT_IMAGE}
                          alt={event.title}
                        />
                        {event.isUrlImage && <span className={styles.badge}>URL</span>}
                        {event.isDefaultImage && <span className={styles.badge}>Default</span>}
                      </div>
                    </div>
                    <div className={styles.tableCol}>
                      {event.isUrlImage ? 
                        'External URL' : 
                        (event.isDefaultImage ? 
                          'Default Image' : 
                          `${event.imageSizeMB} MB`
                        )
                      }
                    </div>
                    <div className={styles.tableCol}>
                      {!event.isDefaultImage && !event.isUrlImage && (
                        <button 
                          className={styles.removeButton}
                          onClick={() => removeImage(event.id)}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StorageManager; 
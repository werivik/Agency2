import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db, database, ref, get, set } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import styles from './EventDetails.module.css';

import defaultImage from '/media/gallery/bergensentrum.jpg';

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [user, setUser] = useState(null);
  const [dataSource, setDataSource] = useState(null); // 'firestore' or 'realtime'

  const auth = getAuth();

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        // First try Firestore
        let eventData = null;
        let source = null;

        try {
          const docRef = doc(db, "events", id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            eventData = docSnap.data();
            source = 'firestore';
            console.log("Event found in Firestore:", eventData);
          }
        } catch (firestoreErr) {
          console.error("Error fetching from Firestore:", firestoreErr);
        }

        // If not found in Firestore, try Realtime Database
        if (!eventData) {
          try {
            const eventRef = ref(database, `events/${id}`);
            const snapshot = await get(eventRef);
            
            if (snapshot.exists()) {
              eventData = snapshot.val();
              source = 'realtime';
              console.log("Event found in Realtime Database:", eventData);
            }
          } catch (realtimeErr) {
            console.error("Error fetching from Realtime Database:", realtimeErr);
          }
        }

        if (eventData) {
          setEvent({
            ...eventData,
            comments: eventData.comments || []
          });
          setDataSource(source);
        } else {
          setError("Event not found in either database");
        }
      } catch (err) {
        console.error("General error:", err);
        setError("Error fetching event details");
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = auth.onAuthStateChanged(setUser);
    fetchEventDetails();

    return () => unsubscribe();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!newComment.trim() || !dataSource) return;

    try {
      const commentData = {
        user: user?.displayName || "Anonymous",
        text: newComment,
        timestamp: new Date().toISOString()
      };

      if (dataSource === 'firestore') {
        // Update in Firestore
        const eventRef = doc(db, "events", id);
        const updatedComments = [...(event.comments || []), commentData];

        await updateDoc(eventRef, {
          comments: updatedComments,
        });

        setEvent((prevEvent) => ({
          ...prevEvent,
          comments: updatedComments,
        }));
      } else if (dataSource === 'realtime') {
        // Update in Realtime Database
        const eventRef = ref(database, `events/${id}/comments`);
        const updatedComments = [...(event.comments || []), commentData];
        
        // Use set for Realtime Database
        await get(eventRef).then(async (snapshot) => {
          if (snapshot.exists()) {
            // Append to existing comments
            const existingComments = snapshot.val();
            const combinedComments = Array.isArray(existingComments) 
              ? [...existingComments, commentData]
              : [commentData];
            
            await set(eventRef, combinedComments);
          } else {
            // Create new comments array
            await set(eventRef, [commentData]);
          }
        });
        
        setEvent((prevEvent) => ({
          ...prevEvent,
          comments: updatedComments,
        }));
      }

      setNewComment("");
    } catch (error) {
      console.error("Error submitting comment:", error);
      alert("Failed to submit comment. Please try again.");
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "Date not available";
    
    // Handle different date formats
    let date;
    if (typeof timestamp === 'string') {
        date = new Date(timestamp);
    } else if (timestamp.toDate) {
        // Handle Firestore timestamp
        date = timestamp.toDate();
    } else {
        // Handle numeric timestamp
        date = new Date(timestamp);
    }
    
    if (isNaN(date.getTime())) return "Invalid date";

    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) return (
    <div className={styles.loadingContainer}>
      <div className={styles.loader}></div>
      <p>Loading event details...</p>
    </div>
  );
  
  if (error) return (
    <div className={styles.errorContainer}>
      <p>{error}</p>
      <Link to="/events" className={styles.backLink}>Back to Events</Link>
    </div>
  );

  return (
    <section className={styles.eventDetailsSection}>
      {event && (
        <div className={styles.edBorder}>
          {/* Event Box (Image, Description, Map, etc.) */}
          <div className={styles.edContent}>
            <div className={styles.edLeft}>
              <img src={event.image || defaultImage} alt="Event" className={styles.edImage} />
            </div>

            <div className={styles.edRight}>
              <div className={styles.edInfo}>
                <h1 className={styles.edTitle}>{event.title}</h1>
                
                <div className={styles.eventMeta}>
                  <div className={styles.eventDate}>
                    <strong>Date:</strong> {formatDate(event.dateTime || event.date)}
                  </div>
                  {event.location && (
                    <div className={styles.eventLocation}>
                      <strong>Location:</strong> {event.location}
                    </div>
                  )}
                </div>

                <div className={styles.edDesc}>
                  <p>{event.description}</p>
                </div>

                <button className={styles.signUp}>Sign up for Event!</button>

                {/* Dynamic Map with plassering */}
                <div className={styles.edMap}>
                  {event.plassering && Array.isArray(event.plassering) && event.plassering.length === 2 ? (
                    <iframe
                      width="100%"
                      height="300"
                      style={{ border: 0 }}
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                      src={`https://www.google.com/maps?q=${event.plassering[0]},${event.plassering[1]}&z=15&output=embed`}
                    ></iframe>
                  ) : event.plassering && event.plassering.latitude ? (
                    <iframe
                      width="100%"
                      height="300"
                      style={{ border: 0 }}
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                      src={`https://www.google.com/maps?q=${event.plassering.latitude},${event.plassering.longitude}&z=15&output=embed`}
                    ></iframe>
                  ) : (
                    <p>No location data available</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Comments Section moved OUTSIDE the edContent */}
          <div className={styles.edComments}>
            {user ? (
              <form onSubmit={handleCommentSubmit} className={styles.writeComment}>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a comment..."
                  className={styles.commentInput}
                />
                <button type="submit" className={styles.publishComment}>Publish</button>
              </form>
            ) : (
              <p><Link to="/login">Login</Link> to Comment</p>
            )}

            {event.comments && event.comments.length > 0 ? (
              <div className={styles.commentsContainer}>
                <h2 className={styles.commentsTitle}>Comments</h2>
                {event.comments.map((comment, index) => (
                  <div key={index} className={styles.commentContainer}>
                    <h4 className={styles.commentUser}>{comment.user}</h4>
                    <p className={styles.commentText}>{comment.text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No comments yet.</p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default EventDetails;

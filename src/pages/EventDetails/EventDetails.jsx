import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../../firebase";
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

  const auth = getAuth();

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const docRef = doc(db, "events", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const eventData = docSnap.data();
          setEvent({
            ...eventData,
            comments: eventData.comments || []
          });
        } else {
          setError("Event not found");
        }
      } catch (err) {
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

    if (newComment.trim()) {
      const commentData = {
        user: user.displayName || "Anonymous",
        text: newComment,
      };

      const eventRef = doc(db, "events", id);
      const updatedComments = [...(event.comments || []), commentData];

      await updateDoc(eventRef, {
        comments: updatedComments,
      });

      setNewComment("");
      setEvent((prevEvent) => ({
        ...prevEvent,
        comments: updatedComments,
      }));
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className={styles.eventDetailsSection}>
      {event && (
        <div className={styles.edBorder}>
          {/* ✅ Event Box (Image, Description, Map, etc.) */}
          <div className={styles.edContent}>
            <div className={styles.edLeft}>
              <img src={event.image || defaultImage} alt="Event" className={styles.edImage} />
            </div>

            <div className={styles.edRight}>
              <div className={styles.edInfo}>
                <h1 className={styles.edTitle}>{event.title}</h1>

                <div className={styles.edDesc}>
                  <p>{event.description}</p>
                </div>

                <button className={styles.signUp}>Sign up for Event!</button>

                {/* ✅ Dynamic Map with plassering */}
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

          {/* ✅ Comments Section moved OUTSIDE the edContent */}
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

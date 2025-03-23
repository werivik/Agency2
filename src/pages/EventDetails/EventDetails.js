import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import styles from './EventDetails.module.css';

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const docRef = doc(db, "events", id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setEvent(docSnap.data());
        } else {
          setError("Event not found");
        }
      } catch (err) {
        setError("Error fetching event details");
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className={styles.eventDetailsSection}>
      {event && (
        <div className={styles.edBorder}>
          <div className={styles.edContent}>
            <div className={styles.edLeft}>
              <img src={event.image || '/media/gallery/bergensentrum.jpg'} alt="Event" className={styles.edImage} />
            </div>
            <div className={styles.edRight}>
              <div className={styles.edInfo}>
                <h1 className={styles.edTitle}>{event.title}</h1>
                <div className={styles.edTimeLocation}>
                  <p><strong>Date:</strong> {new Date(event.date?.toDate()).toLocaleDateString()}</p>
                  <p><strong>Location:</strong> {event.location}</p>
                </div>
                <div className={styles.edDesc}>
                  <p>{event.description}</p>
                </div>
                <button>Sign up for Event!</button>
                <div className={styles.edMap}></div>
                <div className={styles.edComments}>
                  <h3>Comments</h3>
                  {event.comments && event.comments.length > 0 ? (
                    <ul>
                      {event.comments.map((comment, index) => (
                        <li key={index}>
                          <p><strong>{comment.user}</strong>: {comment.text}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No comments yet.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default EventDetails;

/* This is the All Events Page, here anybody can view all Events*/

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./Events.module.css";
import peImage from "/media/gallery/party.jpeg";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

const Home = () => {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "events"));
                const eventsList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setEvents(eventsList);
                setFilteredEvents(eventsList.slice(0, 6));
            } 
            
            catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();
    }, []);

    const formatDate = (timestamp) => {
        const date = timestamp?.toDate();
        if (!date) return "No date available";
    
        const formattedDate = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    
        const monthAbbreviations = {
            January: "Jan",
            February: "Feb",
            August: "Aug",
            September: "Sept",
            November: "Nov",
            December: "Dec"
        };
    
        return formattedDate.replace(
            /\b(January|February|August|September|November|December)\b/,
            (match) => monthAbbreviations[match]
        );
    };
  return (
    <div>
      <section>
        <div>
          <section className={styles.mainText}>
            <h1>Explore Events</h1>
            <button className={styles.filterButton}>Filters</button>
          </section>
          <div className={styles.eventContainer}>
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <div key={event.id} className={styles.eventWeekCard}>
                  <Link to={`/events/${event.id}`} className={styles.eventLink}>
                    <div className={styles.eventWeekDetails}>
                      <div className={styles.eventWeekInfo}>
                        <h3>{event.title}</h3>
                        <p>{event.description}</p>
                      </div>
                      <div className={styles.eventWeekDate}>
                        {formatDate(event.date)}
                      </div>
                    </div>
                    <img
                      src={event.image || peImage}
                      alt="Event"
                      className={styles.eventImage}
                    />
                  </Link>
                </div>
              ))
            ) : (
              <p>No events available</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

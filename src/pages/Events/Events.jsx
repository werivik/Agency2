/* This is the All Events Page, here anybody can view all Events*/

import { Link } from "react-router-dom";
import { useEffect, useState, useRef, useCallback } from "react";
import styles from "./Events.module.css";
import peImage from "/media/gallery/party.jpeg";
import { database, ref, get } from "../../firebase";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

const Home = () => {
    const [events, setEvents] = useState([]);
    const [displayedEvents, setDisplayedEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [sortOption, setSortOption] = useState("newest"); // Default sort: newest
    const [showSortOptions, setShowSortOptions] = useState(false);
    const loaderRef = useRef(null);
    const EVENTS_PER_PAGE = 6;

    const fetchEvents = async () => {
        try {
            setLoading(true);
            let allEvents = [];
            
            // Fetch from Realtime Database
            try {
                const eventsRef = ref(database, 'events');
                const snapshot = await get(eventsRef);
                
                if (snapshot.exists()) {
                    snapshot.forEach((childSnapshot) => {
                        allEvents.push({
                            id: childSnapshot.key,
                            source: 'realtime',
                            ...childSnapshot.val()
                        });
                    });
                }
            } catch (error) {
                console.error("Error fetching from Realtime Database:", error);
            }
            
            // Fetch from Firestore
            try {
                const querySnapshot = await getDocs(collection(db, "events"));
                const firestoreEvents = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    source: 'firestore',
                    ...doc.data(),
                }));
                allEvents = [...allEvents, ...firestoreEvents];
            } catch (error) {
                console.error("Error fetching from Firestore:", error);
            }
            
            // Apply sorting based on current sort option
            sortEvents(allEvents, sortOption);
            
            console.log("All events:", allEvents);
            setEvents(allEvents);
            setDisplayedEvents(allEvents.slice(0, EVENTS_PER_PAGE));
            setHasMore(allEvents.length > EVENTS_PER_PAGE);
            setLoading(false);
        } 
        catch (error) {
            console.error("Error fetching events:", error);
            setLoading(false);
        }
    };

    // Function to sort events
    const sortEvents = (eventsList, option) => {
        switch(option) {
            case "newest":
                eventsList.sort((a, b) => {
                    const dateA = a.dateTime || a.date;
                    const dateB = b.dateTime || b.date;
                    
                    if (!dateA && !dateB) return 0;
                    if (!dateA) return 1;
                    if (!dateB) return -1;
                    
                    return new Date(dateB) - new Date(dateA);
                });
                break;
            case "oldest":
                eventsList.sort((a, b) => {
                    const dateA = a.dateTime || a.date;
                    const dateB = b.dateTime || b.date;
                    
                    if (!dateA && !dateB) return 0;
                    if (!dateA) return 1;
                    if (!dateB) return -1;
                    
                    return new Date(dateA) - new Date(dateB);
                });
                break;
            case "alphabetical":
                eventsList.sort((a, b) => {
                    if (!a.title && !b.title) return 0;
                    if (!a.title) return 1;
                    if (!b.title) return -1;
                    
                    return a.title.localeCompare(b.title);
                });
                break;
            default:
                // Default to newest
                eventsList.sort((a, b) => {
                    const dateA = a.dateTime || a.date;
                    const dateB = b.dateTime || b.date;
                    
                    if (!dateA && !dateB) return 0;
                    if (!dateA) return 1;
                    if (!dateB) return -1;
                    
                    return new Date(dateB) - new Date(dateA);
                });
        }
        return eventsList;
    };

    // Handle sorting change
    const handleSortChange = (option) => {
        setSortOption(option);
        setPage(1);
        
        // Re-sort the existing events
        const sortedEvents = [...events];
        sortEvents(sortedEvents, option);
        
        // Reset pagination
        setDisplayedEvents(sortedEvents.slice(0, EVENTS_PER_PAGE));
        setHasMore(sortedEvents.length > EVENTS_PER_PAGE);
        
        // Close the sort panel
        setShowSortOptions(false);
    };

    // Toggle sort options visibility
    const toggleSortOptions = () => {
        setShowSortOptions(!showSortOptions);
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const loadMoreEvents = useCallback(() => {
        if (loading || !hasMore) return;
        
        const nextPage = page + 1;
        const startIndex = (nextPage - 1) * EVENTS_PER_PAGE;
        const endIndex = startIndex + EVENTS_PER_PAGE;
        
        setDisplayedEvents(prev => [...prev, ...events.slice(startIndex, endIndex)]);
        setPage(nextPage);
        setHasMore(endIndex < events.length);
    }, [loading, hasMore, page, events]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && hasMore) {
                    loadMoreEvents();
                }
            },
            { threshold: 0.1 }
        );

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => {
            if (loaderRef.current) {
                observer.unobserve(loaderRef.current);
            }
        };
    }, [loaderRef, hasMore, loadMoreEvents]);

    const formatDate = (timestamp) => {
        if (!timestamp) return "No date available";
        
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
    <div className={styles.pageContainer}>
      <section className={styles.eventsSection}>
        <section className={styles.mainText}>
          <h1>Explore Events</h1>
          <div className={styles.sortContainer}>
            <button 
              className={styles.sortButton} 
              onClick={toggleSortOptions}
            >
              Sort
            </button>
            
            {showSortOptions && (
              <div className={styles.sortPanel}>
                <div className={styles.sortOptions}>
                  <label className={styles.sortOption}>
                    <input 
                      type="radio" 
                      name="sortOption"
                      checked={sortOption === "newest"}
                      onChange={() => handleSortChange("newest")}
                    />
                    <span>Newest First</span>
                  </label>
                  <label className={styles.sortOption}>
                    <input 
                      type="radio" 
                      name="sortOption"
                      checked={sortOption === "oldest"}
                      onChange={() => handleSortChange("oldest")}
                    />
                    <span>Oldest First</span>
                  </label>
                  <label className={styles.sortOption}>
                    <input 
                      type="radio" 
                      name="sortOption"
                      checked={sortOption === "alphabetical"}
                      onChange={() => handleSortChange("alphabetical")}
                    />
                    <span>Alphabetical (A-Z)</span>
                  </label>
                </div>
              </div>
            )}
          </div>
        </section>
        
        <div className={styles.eventContainer}>
          {displayedEvents.length > 0 ? (
            displayedEvents.map((event) => (
              <div key={event.id} className={styles.eventWeekCard}>
                <Link to={`/events/${event.id}`} className={styles.eventLink}>
                  <div className={styles.eventWeekDetails}>
                    <div className={styles.eventWeekInfo}>
                      <h3>{event.title}</h3>
                      <p>{event.description}</p>
                    </div>
                    <div className={styles.eventWeekDate}>
                      {formatDate(event.dateTime || event.date)}
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
            <p className={styles.noEventsMessage}>No events available</p>
          )}
        </div>
        {loading && (
          <div className={styles.loadingContainer}>
            <div className={styles.loader}></div>
            <p>Loading events...</p>
          </div>
        )}
        {!loading && hasMore && <div ref={loaderRef} className={styles.loaderTrigger}></div>}
      </section>
    </div>
  );
};

export default Home;

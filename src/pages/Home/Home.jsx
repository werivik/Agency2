import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './Home.module.css';
import bannerImage from '/media/gallery/bergensentrum.jpg';
import bannerLogo from '/media/logo/Logo.png';
import mapImage from '/media/gallery/bergenmap.png';
import peImage from '/media/gallery/party.jpeg';
import { database } from '../../api/firebase';
import { ref, onValue, get } from 'firebase/database';
import { DEFAULT_EVENT_IMAGE } from '../../constants/images';

const isValidImageUrl = (url) => {
    if (!url) return false;
    return url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:image');
};

const Home = () => {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);

    useEffect(() => {
        console.log('Starting to fetch events...');
        const fetchEvents = async () => {
            try {
                const eventsRef = ref(database, 'events');
                console.log('Events reference created:', eventsRef);
                
                // First, try to get the current data
                const snapshot = await get(eventsRef);
                console.log('Initial snapshot:', snapshot.val());

                // Then set up real-time listener
                onValue(eventsRef, (snapshot) => {
                    console.log('Received real-time update:', snapshot.val());
                    if (snapshot.exists()) {
                        const eventsData = snapshot.val();
                        console.log('Events data:', eventsData);
                        const eventsList = Object.entries(eventsData).map(([id, data]) => ({
                            id,
                            ...data,
                            // Handle both URL and base64 images
                            image: isValidImageUrl(data.image) ? data.image : DEFAULT_EVENT_IMAGE
                        }));
                        console.log('Processed events list:', eventsList);
                        setEvents(eventsList);
                        setFilteredEvents(eventsList.slice(0, 6));
                    } else {
                        console.log('No events found in database');
                        setEvents([]);
                        setFilteredEvents([]);
                    }
                }, (error) => {
                    console.error('Error in onValue listener:', error);
                });
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();

        // Cleanup function
        return () => {
            const eventsRef = ref(database, 'events');
            // Remove the listener when component unmounts
            onValue(eventsRef, () => {}, { onlyOnce: true });
        };
    }, []);

    const formatDate = (dateTimeString) => {
        if (!dateTimeString) return "No date available";
        const date = new Date(dateTimeString);
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
        <div className={styles.homeSections}>
            <section className={styles.bannerSection}>
                <div className={styles.bannerBorder}>
                    <div className={styles.bannerContent}>
                        <div className={styles.bannerLeft}>
                            <img src={bannerLogo} alt="The Spot Logo" className={styles.bannerLogo}></img>
                        </div>
                        <div className={styles.bannerRight}>
                            <h3>Upcoming Events</h3>
                            <div className={styles.eventWeekContainer}>
                                <div className={styles.eventWeekWrapper}>
                                    {filteredEvents.length > 0 ? (
                                        filteredEvents.map(event => (
                                            <div key={event.id} className={styles.eventWeekCard}>
                                                <Link to={`/events/${event.id}`} className={styles.eventLink}>
                                                    <div className={styles.eventWeekDetails}>
                                                        <div className={styles.eventWeekInfo}>
                                                            <h3>{event.title}</h3>
                                                            <p>{event.description}</p>
                                                        </div>
                                                        <div className={styles.eventWeekDate}>
                                                            {formatDate(event.dateTime)}
                                                        </div>
                                                    </div>
                                                    <img src={event.image} alt="Event" className={styles.eventImage} />
                                                </Link>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No events available</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.bannerImageBlur}>
                        <img src={bannerImage} alt="Bergen Sentrum" className={styles.bannerImage} ></img>
                    </div>
                </div>
            </section>

            <section className={styles.mapSection}>
                <div className={styles.mapBorder}>
                    <div className={styles.mapContent}>
                        <div className={styles.mapLeft}>
                            <img src={mapImage} alt="Bergen Sentrum" className={styles.mapImage} ></img>
                        </div>
                        <div className={styles.mapRight}>
                            <div className={styles.mapRightContect}>
                                <p>The Velvet Barrel <span className={styles.open}>OPEN!</span></p>
                                <p>Moonlit Lounge <span className={styles.close}>CLOSED!</span></p>
                                <p>The Tipsy Toad <span className={styles.close}>CLOSED!</span></p>
                                <p>High Tide Tavern <span className={styles.open}>OPEN!</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.tagSection}>
                <div className={styles.tagTitle}>
                    <h2>Try out New Adventures in <br></br>Bergen City</h2>
                </div>
                <div className={styles.tagContent}>
                    <div className={styles.tagList}>
                        <div className={styles.tagBorder}>
                            <div className={styles.tagInside}>
                            <i className="fa-solid fa-martini-glass-citrus"></i>
                            </div>
                        </div>
                        <div className={styles.tagBorder}>
                            <div className={styles.tagInside}>
                                <i className="fa-solid fa-utensils"></i>
                            </div>
                        </div>
                        <div className={styles.tagBorder}>
                            <div className={styles.tagInside}>
                                <i className="fa-solid fa-masks-theater"></i>
                            </div>
                        </div>
                        <div className={styles.tagBorder}>
                            <div className={styles.tagInside}>
                                <i className="fa-solid fa-gamepad"></i>
                            </div>
                        </div>
                        <div className={styles.tagBorder}>
                            <div className={styles.tagInside}>
                                <i className="fa-solid fa-tree"></i>
                            </div>
                        </div>
                        <div className={styles.tagBorder}>
                            <div className={styles.tagInside}>
                                <i className="fa-solid fa-heart"></i>
                            </div>
                        </div>
                        <div className={styles.tagBorder}>
                            <div className={styles.tagInside}>
                                <i className="fa-solid fa-video"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.eventSection}>
                <div className={styles.eventBorder}>
                    <div className={styles.eventSectionTitle}>
                        <h2>Popular Events</h2>
                    </div>
                    <div className={styles.eventContent}>
                        {events.length > 0 ? (
                            events.map(event => (
                                <div key={event.id} className={styles.popularEvent}>
                                    <Link to={`/events/${event.id}`} className={styles.eventLink}>
                                        <div className={styles.peContent}>
                                            <div className={styles.peInfo}>
                                                <h3>{event.title}</h3>
                                                <p>{event.description}</p>
                                            </div>
                                            <div className={styles.peTime}>
                                                {formatDate(event.dateTime)}
                                            </div>
                                        </div>
                                        <img src={event.image} alt="Event" className={styles.peImage} />
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <p>Loading events...</p>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;

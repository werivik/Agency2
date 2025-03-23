/* This is the Homepage */

import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './Home.module.css';
import bannerImage from '/media/gallery/bergensentrum.jpg';
import bannerLogo from '/media/logo/Logo.png';
import mapImage from '/media/gallery/bergenmap.png';
import peImage from '/media/gallery/party.jpeg';

import { db } from '../../firebase';
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
        return date ? date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }) : "No date available";
    };

    /*
    const filterEventsThisWeek = () => {
        const today = new Date();
        const endOfWeek = new Date();
        endOfWeek.setDate(today.getDate() + 7);
        
        const filtered = events.filter(event => {
            const eventDate = event.date?.toDate();
            return eventDate && eventDate >= today && eventDate <= endOfWeek;
        });

        return filtered;
    };

    const filterUpcomingEvents = () => {
        const sortedEvents = events.sort((a, b) => {
            const dateA = a.date?.toDate();
            const dateB = b.date?.toDate();
            return dateA - dateB;
        });
        return sortedEvents.slice(0,6);
    };
    */

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
                    <div className={styles.eventWeekDetails}>
                        <div className={styles.eventWeekInfo}>
                            <h3>{event.title}</h3>
                            <p>{event.description}</p>
                        </div>
                        <div className={styles.eventWeekDate}>
                            {formatDate(event.date)}
                        </div>
                    </div>
                    <img src={event.image || peImage} alt="Event" className={styles.eventImage} />
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
                                <i class="fa-solid fa-martini-glass-citrus"></i>
                            </div>
                        </div>
                        <div className={styles.tagBorder}>
                            <div className={styles.tagInside}>
                                <i class="fa-solid fa-utensils"></i>
                            </div>
                        </div>
                        <div className={styles.tagBorder}>
                            <div className={styles.tagInside}>
                                <i class="fa-solid fa-masks-theater"></i>
                            </div>
                        </div>
                        <div className={styles.tagBorder}>
                            <div className={styles.tagInside}>
                                <i class="fa-solid fa-gamepad"></i>
                            </div>
                        </div>
                        <div className={styles.tagBorder}>
                            <div className={styles.tagInside}>
                                <i class="fa-solid fa-tree"></i>
                            </div>
                        </div>
                        <div className={styles.tagBorder}>
                            <div className={styles.tagInside}>
                                <i class="fa-solid fa-heart"></i>
                            </div>
                        </div>
                        <div className={styles.tagBorder}>
                            <div className={styles.tagInside}>
                                <i class="fa-solid fa-video"></i>
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
                                    <div className={styles.peContent}>
                                        <div className={styles.peInfo}>
                                            <h3>{event.title}</h3>
                                            <p>{event.description}</p>
                                        </div>
                                        <div className={styles.peTime}>
                                            {formatDate(event.date)}
                                        </div>
                                    </div>
                                    <img src={event.image || peImage} alt="Event" className={styles.peImage} />
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
  
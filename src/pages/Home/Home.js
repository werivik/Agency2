/* This is the Homepage */

import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './Home.module.css';
import bannerImage from '/media/gallery/bergensentrum.jpg';
import bannerLogo from '/media/logo/Logo.png';
import mapImage from '/media/gallery/bergenmap.png';

const Home = () => {
    return (
        <div className={styles.homeSections}>

            <section className={styles.bannerSection}>
                <div className={styles.bannerBorder}>
                    <div className={styles.bannerContent}>
                        <div className={styles.bannerLeft}>
                            <img src={bannerLogo} alt="The Spot Logo" className={styles.bannerLogo}></img>
                        </div>
                        <div className={styles.bannerRight}>
                            <h3>Events This Week</h3>
                            <div></div>
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
                        <div className={styles.popularEvent}>
                            <div className={styles.peTime}></div>
                        </div>
                        <div className={styles.PopularEvent}>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
  };
  
export default Home;
  
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

            <section className={styles.filterSection}>
            </section>

            <section className={styles.eventSection}>
            </section>

        </div>
    );
  };
  
export default Home;
  
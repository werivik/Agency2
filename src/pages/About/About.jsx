import styles from './About.module.css';
import bannerImage from '/media/gallery/bergensentrum.jpg';
import logoImage from '/media/logo/Logo.png';
import { Link } from 'react-router-dom';

function About() {
  return (
    <div className={styles.aboutBackground}>
      <section className={styles.aboutSection}>
        <div className={styles.aboutBorder}>
          <div className={styles.aboutContent}>
            <div className={styles.aboutLeft}>
              <img src={logoImage} alt="Company Logo" className={styles.aboutLogo} />
            </div>
            <div className={styles.aboutRight}>
              <div className={styles.aboutRightContent}>
                <h2>About Us</h2>
                <h3>Our Story</h3>
                <p>
                  Welcome to The Spot! We're a passionate team dedicated to creating a unique
                  experience in Bergen. Our mission is to bring people together, offer great events,
                  and build a vibrant community space.
                </p>
                <div className={styles.aboutOptions}>
                  <p>Want to learn more?</p>
                  <Link to="/contact">Contact Us</Link>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.aboutImageBlur}>
            <img src={bannerImage} alt="Bergen Sentrum" className={styles.backgroundImage} />
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;

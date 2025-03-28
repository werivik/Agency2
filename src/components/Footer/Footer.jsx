import { Link } from "react-router-dom";
import { FaYoutube, FaFacebook, FaTwitter } from "react-icons/fa";
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer>
      <div className={styles.topTextContainer}>        
        <p className={styles.mainText}>Need Help? We’re Here for You</p>
        <hr className={styles.firstLine} />
      </div>
      <div className={styles.textContainer}>
        <p>Having trouble finding an event or managing your bookings? Need assistance with Login / Sign Up – Manage your events, tickets, and preferences.  Help Center – Browse FAQs and guides for quick answers.</p>

        <p>Live Chat – Chat with our support team for real-time assistance.  Email Support – Reach us at support@TheSpot.com for inquiries.</p>
        
        <p>Call Us – Speak directly with our team at (+123) 456-7890.  For urgent issues, visit our Support Page for immediate assistance.</p>
      </div>
      <div className={styles.underTextContainer}>
        <div className={styles.aboutContainer}>
          <p>About The Spot</p>
          <p>Welcome to The Spot! We're a passionate team dedicated to creating a unique experience in Bergen. Our mission is to bring people together, offer great events, and build a vibrant community space.</p>
        </div>
        <div className={styles.aboutContainer}>
          <p>Company</p>
          <p>About Us  Contact Us  Privacy Policy  Terms of Service  FTC Disclosure  Sitemap</p>
        </div>
      </div>
      <hr className={styles.secondLine}/>
      <div className={styles.socialIcons}>
        <div className={styles.iconCircle} ><FaYoutube /></div>
        <div className={styles.iconCircle}><FaFacebook /></div>
        <div className={styles.iconCircle}><FaTwitter /></div>
      </div>
      <div className={styles.copyRight}>
        <p>&copy; {new Date().getFullYear()} The Spot. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
import styles from './Footer.module.css';
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3>The Spot</h3>
          <p>Your go-to platform for events in Bergen</p>
        </div>
        
        <div className={styles.footerSection}>
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        
        <div className={styles.footerSection}>
          <h3>Admin</h3>
          <ul>
            <li><Link to="/admin">Admin Dashboard</Link></li>
            <li><Link to="/storage-manager">Storage Manager</Link></li>
          </ul>
        </div>
      </div>
      
      <div className={styles.footerBottom}>
        <p>&copy; {new Date().getFullYear()} The Spot. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
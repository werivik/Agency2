import { Link } from "react-router-dom";
import { FaYoutube, FaFacebook, FaTwitter } from "react-icons/fa";
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer>
      <p className={styles.MainText}>Need Help? We’re Here for You</p>
      <hr className={styles.FirstLine} />
      <div>
        <p>Having trouble finding an event or managing your bookings? Need assistance with <Link to="/login">Login / Sign Up</Link> – Manage your events, tickets, and preferences.  <Link to="/help-center">Help Center</Link> – Browse FAQs and guides for quick answers.</p>
        <p>Live Chat – Chat with our support team for real-time assistance.  Email Support – Reach us at support@TheSpot.com for inquiries.</p>
        <p>Call Us – Speak directly with our team at (+123) 456-7890.  For urgent issues, visit our <Link to="/support">Support Page</Link> for immediate assistance.</p>
      </div>
      <div>
        <p>About The Spot</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </div>
      <div>
        <p>Company</p>
        <p>About Us  Contact Us  Privacy Policy  Terms of Service  FTC Disclosure  Sitemap</p>
      </div>
      <hr />
      <div className={styles.socialIcons}>
        <div><FaYoutube /></div>
        <div><FaFacebook /></div>
        <div><FaTwitter /></div>
      </div>
      <div>
        <p>&copy; {new Date().getFullYear()} The Spot. All rights reserved.</p>
      </div>
    </footer>
  );
}

// Only one default export allowed here
export default Footer;

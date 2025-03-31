import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";  // Import useLocation hook
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import styles from "./Header.module.css";
import headerLogo from "/media/logo/Logo.png";
import defaultProfile from "/media/gallery/defaultprofile.png";
import { RxHamburgerMenu } from "react-icons/rx";

function Header() {
  const [toggled, setToggled] = useState(false);
  const location = useLocation(); // Access location to detect page changes

  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(defaultProfile);

  const boxRef = useRef(null); // Reference for the menu box

  // Load user authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setProfileImage(currentUser.photoURL || defaultProfile);
      } else {
        setUser(null);
        setProfileImage(defaultProfile);
      }
    });

    return () => unsubscribe();
  }, []);

  // Toggle the menu visibility
  function menuDisplay() {
    setToggled(prevToggled => !prevToggled); // Toggle the state
  }

  // Close the menu when clicking outside of it
  useEffect(() => {
    function handleClickOutside(event) {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        setToggled(false); // Close the menu when clicking outside
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close the menu when the route changes
  useEffect(() => {
    setToggled(false); // Close the menu when route changes
  }, [location]); // Trigger when the location changes (page redirects)

  return (
    <header>
      <nav>
        <Link to="/" className={styles.logo}>
          <img src={headerLogo} alt="The Spot Logo" className={styles.headerLogo} />
        </Link>
        <ul className={styles.desktopNav}>
          <Link to="/">Home</Link>
          <Link to="/events">Events</Link>
          <Link to="/about">About us</Link>
          <Link to="/contact">Contact</Link>
          {user ? (
            <Link to="/user">
              <img src={profileImage} alt="User Profile" className={styles.headerProfile} />
            </Link>
          ) : (
            <Link to="/login-direction" className={styles.headerLoginButton}>
              Login
            </Link>
          )}
        </ul>
      </nav>

      {/* Hamburger Menu */}
      <div className={styles.hamburgerMenu}>
        <i ref={boxRef} onClick={menuDisplay} className={styles.hamburgerIcon}>
          <RxHamburgerMenu />
        </i>

        {/* Conditionally render the menu */}
        <ul
          ref={boxRef}
          className={toggled ? styles.menuActive : styles.menu}
        >
          <Link to="/" onClick={() => setToggled(false)}>Home</Link> {/* Close menu on click */}
          <Link to="/events" onClick={() => setToggled(false)}>Events</Link> {/* Close menu on click */}
          <Link to="/about" onClick={() => setToggled(false)}>About us</Link> {/* Close menu on click */}
          <Link to="/contact" onClick={() => setToggled(false)}>Contact</Link> {/* Close menu on click */}
          {user ? (
            <Link to="/user" onClick={() => setToggled(false)}>
              <img src={profileImage} alt="User Profile" className={styles.headerProfile} />
            </Link>
          ) : (
            <Link to="/login-direction" className={styles.headerLoginButton} onClick={() => setToggled(false)}>
              Login
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Header;

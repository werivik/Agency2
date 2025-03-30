import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import styles from "./Header.module.css";
import headerLogo from "/media/logo/Logo.png";
import defaultProfile from "/media/gallery/defaultprofile.png";
import { RxHamburgerMenu } from "react-icons/rx";


function Header() {
  const [toggled, setToggled] = useState(false);

  // Toggle the menu visibility
  function menuDisplay() {
    setToggled(prevToggled => !prevToggled); // Toggle the state
  }

  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(defaultProfile);

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
        <i onClick={menuDisplay} className={styles.hamburgerIcon}><RxHamburgerMenu /></i>

        {/* Conditionally render the menu */}
        <ul className={toggled ? styles.menuActive : styles.menu}>
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
      </div>
    </header>
  );
}

export default Header;

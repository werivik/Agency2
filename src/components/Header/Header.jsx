import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import styles from "./Header.module.css";
import headerLogo from "/media/logo/Logo.png";
import headerProfile from "/media/gallery/defaultprofile.png";

function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <header>
      <nav>
        <Link to="/" className={styles.logo}>
          <img src={headerLogo} alt="The Spot Logo" className={styles.headerLogo} />
        </Link>
        <ul>
          <Link to="/">Home</Link>
          <Link to="/events">Events</Link>
          <Link to="/about">About us</Link>
          <Link to="/contact">Contact</Link>
          {user ? (
            <Link to="/user">
              <img src={headerProfile} alt="User Profile" className={styles.headerProfile} />
            </Link>
          ) : (
            <Link to="/loginoptions" className={styles.headerLoginButton}>
              Login
            </Link>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;

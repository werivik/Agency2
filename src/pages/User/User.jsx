import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import styles from "./User.module.css";
import defaultProfile from "/media/gallery/defaultprofile.png";

function User() {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/loginoptions");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } 
    
    catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className={styles.userBackground}>
      <section className={styles.profileSection}>
        <div className={styles.profileBorder}>
          <div className={styles.profileInfo}>
            <div className={styles.profileLeft}>
              <div className={styles.profileImage}>
                <img src={defaultProfile} alt="Profile" />
              </div>
              <div className={styles.profileName}>
                <p>Username</p>
              </div>
            </div>
            <div className={styles.profileRight}>
              <p>Events Saved</p>
              <p>Favorite Organisations</p>
            </div>
          </div>

          <div className={styles.profileOptions}>
            <p>Create Event</p>
            <p>Edit Event</p>
            <p>Profile Settings</p>
            <button onClick={handleSignOut} className={styles.signOutButton}>
              Sign Out
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default User;

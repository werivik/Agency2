import styles from './User.module.css';
import { Link } from "react-router-dom";
import defaultProfile from "/media/gallery/defaultprofile.png";

function User() {
  return (
    <div className={styles.userBackground}>
      <section className={styles.profileSection}>
        <div className={styles.profileBorder}>
          <div className={styles.profileInfo}>
            <div className={styles.profileLeft}>
              <div className={styles.profileImage}>
                <img src={defaultProfile}></img>
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
            <p>Sign Out</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default User;
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import styles from "./User.module.css";
import defaultProfile from "/media/gallery/defaultprofile.png";

function User() {
  const navigate = useNavigate();
  const settingsRef = useRef(null);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/loginoptions");
      } 
      
      else {
        setUser(user);
        setUsername(user.displayName || "Username");
        setProfileImage(user.photoURL || defaultProfile);
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

  const handleScrollToSettings = () => {
    settingsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleSaveProfile = async () => {
    if (user) {
      try {
        await updateProfile(user, {
          displayName: username,
          photoURL: profileImage,
        });
        alert("Profile updated successfully!");
      } 
      
      catch (error) {
        console.error("Error updating profile:", error);
      }
    }
  };

  return (
    <div className={styles.userBackground}>
      <section className={styles.profileSection}>
        <div className={styles.profileBorder}>
          <div className={styles.profileInfo}>
            <div className={styles.profileLeft}>
              <div className={styles.profileImage}>
                <img src={profileImage} alt="Profile" />
              </div>
              <div className={styles.profileName}>
                <p>{username}</p>
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
            <p onClick={handleScrollToSettings} className={styles.clickableText}>
              Profile Settings
            </p>
            <button onClick={handleSignOut} className={styles.signOutButton}>
              Sign Out
            </button>
          </div>
        </div>
      </section>

      <section ref={settingsRef} className={styles.profileSettingsSection}>
        <h2>Profile Settings</h2>
        <div className={styles.profileSettingsContent}>
          <label>Change Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter new username"
          />

          <label>Change Profile Picture (URL):</label>
          <input
            type="text"
            value={profileImage}
            onChange={(e) => setProfileImage(e.target.value)}
            placeholder="Paste image URL"
          />

          <button onClick={handleSaveProfile} className={styles.saveButton}>
            Save Changes
          </button>
        </div>
      </section>
    </div>
  );
}

export default User;

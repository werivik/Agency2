import styles from './Register.module.css';
import { Link } from "react-router-dom";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import bannerImage from '/media/gallery/bergensentrum.jpg';
import registerLogo from '/media/logo/Logo.png';

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Registration successful! You can now log in.");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className={styles.registerBackground}>
      <section className={styles.registerSection}>
        <div className={styles.registerBorder}>
          <div className={styles.registerContent}>
            <div className={styles.registerLeft}>
              <img src={registerLogo} alt="The Spot Logo" className={styles.registerLogo} />
            </div>
            <div className={styles.registerRight}>
              <div className={styles.registerRightContent}>
                <h2>Welcome!</h2>
                <h3>Create Your Account</h3>
                <form className={styles.registerForm} onSubmit={handleRegister}>
                  <h3>Sign Up</h3>
                  <div className={styles.inputGroup}>
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      required
                      placeholder="Password123"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      required
                      placeholder="Password123"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <button type="submit" className={styles.registerButton}>Register</button>
                </form>
                <div className={styles.loginOptions}>
                  <p>Already have an account?</p>
                  <Link to="/login">Login Here</Link>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.registerImageBlur}>
            <img src={bannerImage} alt="Bergen Sentrum" className={styles.backgroundImage} />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Register;

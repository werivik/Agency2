/* This is the Login Page, the default user can login to their account through this page. */

import styles from './Login.module.css';
import { Link } from "react-router-dom";
import bannerImage from '/media/gallery/bergensentrum.jpg';
import loginLogo from '/media/logo/Logo.png';

function Login() {
  return (
    <div className={styles.loginBackground}>
      <section className={styles.loginSection}>
        <div className={styles.loginBorder}>
          <div className={styles.loginContent}>
            <div className={styles.loginLeft}>
              <img src={loginLogo} alt="The Spot Logo" className={styles.loginLogo} />
            </div>
            <div className={styles.loginRight}>
              <div className={styles.loginRightContent}>
                <h2>Hello,</h2>
                <h3>Welcome Back!</h3>
                <form className={styles.loginForm}>
                  <h3>Sign in</h3>
                  <div className={styles.inputGroup}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required placeholder='email@example.com' />
                  </div>
                  <div className={styles.inputGroup}>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" required placeholder='Password123' />
                  </div>
                  <button type="submit" className={styles.loginButton}>Login</button>
                </form>
                <div className={styles.loginOptions}>
                  <p>Don't have an account?</p>
                  <Link to="/register" >Create Here</Link>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.loginImageBlur}>
            <img src={bannerImage} alt="Bergen Sentrum" className={styles.backgroundImage} />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;

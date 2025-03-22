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
                            <img src={loginLogo} alt="The Spot Logo" className={styles.loginLogo}></img>
                        </div>
                        <div className={styles.loginRight}>
                          <div className={styles.loginRightContent}>
                            <h2>Hello,</h2>
                            <h3>Welcome Back!</h3>
                          </div>
                        </div>
                    </div>
                    <div className={styles.loginImageBlur}>
                        <img src={bannerImage} alt="Bergen Sentrum" className={styles.backgroundImage} ></img>
                    </div>
                </div>
            </section>
    </div>
  );
}

export default Login;
import styles from './Login.module.css';
import { Link } from "react-router-dom";
import bannerImage from '/media/gallery/bergensentrum.jpg';
import loginLogo from '/media/logo/Logo.png';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
    } 
    
    catch (error) {
      alert(error.message);
    }
  };

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
                <form className={styles.loginForm} onSubmit={handleLogin}>
                  <h3>Sign in</h3>
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
                  <button type="submit" className={styles.loginButton}>Login</button>
                </form>
                <div className={styles.loginOptions}>
                  <p>Don't have an account?</p>
                  <Link to="/register">Create Here</Link>
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

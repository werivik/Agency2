import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './LoginOptions.module.css';
 
const LoginOptions = () => {
    
    return (
        <div className={styles.loginSections}>
            <section className={styles.loginBorder}>
                <div className={styles.loginContent}>
                    <h1>Login Options</h1>
                    <div className={styles.loginUser}>
                        <p>I am a <Link to="/login">User</Link></p>
                    </div>
                    <div className={styles.loginAdmin}>
                        <p>I am a <Link to="/admin">Organisation</Link></p>
                    </div>
                    <div className={styles.loginRegister}>
                        <p>I do not have an <Link to="/register">Account</Link></p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LoginOptions;

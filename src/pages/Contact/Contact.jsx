/* This is the Contact Page, here can anybody contact the fake company*/

import styles from './Contact.module.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Contact() {

  return (
    <section className={styles.contactSection}>
      <div className={styles.contactBorder}>
        <h1>Contact Us</h1>
        <div className={styles.contactContent}>
          <p>If you are having any troubles or questions, do not hesitate to contact us. You can find our contact info below:</p>
          <div className={styles.ContactInfo}>
            <div>
              <p>Email:</p>
              <p>support@thespot.com</p>
            </div>
            <div>
              <p>Location:</p>
              <p>ABC Road, Bergen</p>
            </div>
            <div>
              <p>Tlf:</p>
              <p>(+47) 123 45 678</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
/* This is the Admin Page, here only Admins with special access can view its content*/

import styles from './Admin.module.css';
import { Link } from "react-router-dom";
import CreateEvent from './CreateEvent';

function Admin() {
  return (
    <div className={styles.adminContainer}>
      <h1 className={styles.adminTitle}>Admin Dashboard</h1>
      <div className={styles.adminContent}>
        <section className={styles.adminSection}>
          <h2>Create New Event</h2>
          <CreateEvent />
        </section>
      </div>
    </div>
  );
}

export default Admin;
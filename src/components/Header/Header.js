import styles from './Header.module.css';
import { Link } from "react-router-dom";
import headerLogo from '/media/logo/Logo.png';

function Header() {
  return (
    <header>
      <nav>
        <Link to="/" className={styles.logo}><img src={headerLogo} alt="The Spot Logo" className={styles.headerLogo}></img></Link>
        <ul>
          <Link to="/" className={styles.logo}>Home</Link>
          <Link to="/" className={styles.logo}>Login</Link>
          <Link to="/" className={styles.logo}>About us</Link>
          <Link to="/" className={styles.logo}>Contact</Link>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
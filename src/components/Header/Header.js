import styles from './Header.module.css';
import { Link } from "react-router-dom";
import headerLogo from '/public/media/logo/Logo.png';

function Header() {
  return (
    <header>
      <nav>
        <Link to="/" className={styles.logo}><img src={headerLogo} alt="The Spot Logo" className={styles.headerLogo}></img></Link>
        <ul>
          <Link to="/" >Home</Link>
          <Link to="/login" >Login</Link>
          <Link to="/about" >About us</Link>
          <Link to="/contact" >Contact</Link>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
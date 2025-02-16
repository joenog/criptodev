import { Link } from 'react-router-dom';
import styles from './header.module.css';
import logoCrypto from '../../assets/images/coinana-logo.png';


export function Header() {
  return (
    <header className={styles.container}>
      <div className={styles.logoCrypto}>
        <Link to={'/'}>
          <img className={styles.logo} src={logoCrypto} alt="logo-cripto" />
        </Link>
      </div>
      <div className={styles.menu}>
        <Link className={styles.linksMenu} to={'/'}> home </Link>
        <Link className={styles.linksMenu} to={'/'}> news </Link>
        <Link className={styles.linksMenu} to={'/'}> about </Link>
      </div>
    </header>
  );
}

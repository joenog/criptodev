import { Link } from "react-router-dom"
import styles from "./header.module.css";
import logo from "../../assets/logo.png"

export function Header() {
    return(
        <header className={styles.container}>
            <Link to={'/'}><img className={styles.logo} src={logo} alt="logo-cripto" /></Link>
            <ul>
                <li>Home</li>
                <li></li>
                <li></li>
            </ul>
        </header>
    )
}
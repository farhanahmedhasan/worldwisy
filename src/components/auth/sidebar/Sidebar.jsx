import Logo from "../../../pages/shared/Logo.jsx"
import styles from "./Sidebar.module.css"
import AppNav from "../appNav/AppNav.jsx"
import Footer from "../footer/Footer.jsx"

export default function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <Logo />
            <AppNav />

            <p>List of cities</p>
            <Footer />
        </div>
    )
}

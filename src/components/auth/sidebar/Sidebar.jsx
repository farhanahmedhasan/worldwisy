import Logo from "../../../pages/shared/Logo.jsx"
import styles from "./Sidebar.module.css"
import AppNav from "../appNav/AppNav.jsx"
import Footer from "../footer/Footer.jsx"
import { Outlet } from "react-router-dom"

export default function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <Logo />
            <AppNav />
            <Outlet />
            <Footer />
        </div>
    )
}

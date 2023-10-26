import Sidebar from "../../components/auth/sidebar/Sidebar.jsx"
import User from "../../components/auth/user/User.jsx"
import Map from "../../components/auth/map/Map.jsx"
import styles from "./AppLayout.module.css"

export default function AppLayout() {
    return (
        <div className={styles.app}>
            <Sidebar />
            <Map />
            <User />
        </div>
    )
}

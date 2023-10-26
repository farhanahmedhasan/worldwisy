import Sidebar from "../../components/auth/sidebar/Sidebar.jsx"
import Map from "../../components/auth/map/Map.jsx"
import styles from "./AppLayout.module.css"
import User from "../../components/auth/user/User.jsx"

export default function AppLayout() {
    return (
        <div className={styles.app}>
            <Sidebar />
            <Map />
            <User />
        </div>
    )
}

import Sidebar from "../../components/auth/sidebar/Sidebar.jsx"
import styles from "./AppLayout.module.css"
import Map from "../../components/auth/map/Map.jsx"

export default function AppLayout() {
    return (
        <div className={styles.app}>
            <Sidebar />
            <Map />
        </div>
    )
}

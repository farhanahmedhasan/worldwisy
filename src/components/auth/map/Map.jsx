import { useNavigate, useSearchParams } from "react-router-dom"
import styles from "./Map.module.css"

export default function Map() {
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()

    const lat = searchParams.get("lat")
    const lng = searchParams.get("lat")

    return (
        <div className={styles.mapContainer} onClick={() => navigate("form")}>
            <h1>Map Placeholderr</h1>
            <h1>
                Position: {lat}, {lng}
            </h1>
            <button type="button" onClick={() => setSearchParams({ ...searchParams, lat: 20.65634, lng: 43.5633 })}>
                Change postion
            </button>
        </div>
    )
}

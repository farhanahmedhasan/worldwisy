import Sidebar from "../../components/auth/sidebar/Sidebar.jsx"
import Map from "../../components/auth/map/Map.jsx"
import styles from "./AppLayout.module.css"
import { useEffect, useState } from "react"

const BASE_URL = "http://localhost:3001"

export default function AppLayout() {
    const [cities, setCities] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function fetchCities() {
            setIsLoading(true)
            try {
                const res = await fetch(`${BASE_URL}/cities`)
                const cityData = await res.json()
                setCities(cityData)
                console.log(cityData)
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchCities()
    }, [])

    return (
        <div className={styles.app}>
            <Sidebar />
            <Map />
        </div>
    )
}

import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet"
import { useNavigate, useSearchParams } from "react-router-dom"

import styles from "./Map.module.css"
import { useEffect, useState } from "react"
import { useCitiesContext } from "../../../context/CitiesContext.jsx"

export default function Map() {
    const { cities } = useCitiesContext()
    const [mapPosition, setMapPosition] = useState([23.8051512, 90.3605391])

    const [searchParams] = useSearchParams()

    const mapLat = searchParams.get("lat")
    const mapLng = searchParams.get("lng")

    useEffect(() => {
        if (mapLat && mapLng) setMapPosition([mapLat, mapLng])
    }, [mapLat, mapLng])

    return (
        <div className={styles.mapContainer}>
            <MapContainer center={mapPosition} zoom={6} className={styles.map} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {cities.map((city) => (
                    <Marker key={city.id} position={[city.position.lat, city.position.lng]}>
                        <Popup>
                            <span>{city.emoji}</span> <span>{city.cityName}</span>
                        </Popup>
                    </Marker>
                ))}

                <ChangeCenter position={mapPosition} />
                <DetectClick position={mapPosition} />
            </MapContainer>
        </div>
    )
}

function ChangeCenter({ position }) {
    const map = useMap()
    map.setView(position)
    return null
}

function DetectClick({ position }) {
    const navigate = useNavigate()
    const map = useMapEvents({
        click: (e) => {
            const lat = e.latlng.lat
            const lng = e.latlng.lng
            navigate(`form?lat=${lat}&lng=${lng}`)
        },
        locationfound: (location) => {
            console.log(location)
        }
    })
    return null
}

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import { useSearchParams } from "react-router-dom"

import styles from "./Map.module.css"
import { useState } from "react"

export default function Map() {
    const [mapPosition, setMapPosition] = useState([23.8051512, 90.3605391])

    const [searchParams, setSearchParams] = useSearchParams()

    const lat = searchParams.get("lat")
    const lng = searchParams.get("lat")

    return (
        <div className={styles.mapContainer}>
            <MapContainer center={mapPosition} zoom={11} className={styles.map} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={mapPosition}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}

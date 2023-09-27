import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"

import { useCitiesContext } from "../../../context/CitiesContext.jsx"
import useGeoLocation from "../../../hooks/useGeoLocation.js"
import Button from "../../shared/button/Button.jsx"
import styles from "./Map.module.css"
import useUrlPosition from "../../../hooks/useUrlPosition.js"

export default function Map() {
    const { cities } = useCitiesContext()
    const { position: geoLocationPosition, isLoading: isLoadingLocation, getLocation } = useGeoLocation()
    const [mapPosition, setMapPosition] = useState(["0", "0"])
    const { lat: mapLat, lng: mapLng, setSearchParams } = useUrlPosition()

    useEffect(() => {
        if (mapLat && mapLng) setMapPosition([mapLat, mapLng])
    }, [mapLat, mapLng])

    useEffect(() => {
        if (geoLocationPosition) {
            setSearchParams({ lat: geoLocationPosition.lat, lng: geoLocationPosition.lng })
            setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng])
        }
    }, [geoLocationPosition])

    return (
        <div className={styles.mapContainer}>
            <Button type="position" onClick={getLocation}>
                {isLoadingLocation ? "Loading..." : "Use your location"}
            </Button>
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
                <DetectClick />
            </MapContainer>
        </div>
    )
}

function ChangeCenter({ position }) {
    const map = useMap()
    map.setView(position)
    return null
}

function DetectClick() {
    const navigate = useNavigate()
    useMapEvents({
        click: (e) => {
            const lat = e.latlng.lat
            const lng = e.latlng.lng
            navigate(`form?lat=${lat}&lng=${lng}`)
        }
    })
    return null
}

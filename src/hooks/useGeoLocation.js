import { useState } from "react"

export default function useGeoLocation(defaultPosition = null) {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [position, setPosition] = useState(defaultPosition)

    function getLocation() {
        if (!navigator.geolocation) setError("Your browser doesn't support geoLocation")

        setIsLoading(true)
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setPosition({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                })
                setIsLoading(false)
            },
            (error) => {
                setError(error.message)
                setIsLoading(false)
            }
        )
    }

    return {
        isLoading,
        error,
        position,
        getLocation
    }
}

import { createContext, useContext, useEffect, useState } from "react"
const BASE_URL = "http://localhost:3001"

const CitiesContext = createContext(null)

function CitiesProvider({ children }) {
    const [cities, setCities] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function fetchCities() {
            setIsLoading(true)
            try {
                const res = await fetch(`${BASE_URL}/cities`)
                const cityData = await res.json()
                setCities(cityData)
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchCities()
    }, [])

    const value = { cities, isLoading }

    return <CitiesContext.Provider value={value}>{children}</CitiesContext.Provider>
}

function useCitiesContext() {
    const values = useContext(CitiesContext)
    if (values === undefined) throw new Error("CitiesContext must be used inside CitiesProvider")
    return values
}

export { CitiesProvider, useCitiesContext }

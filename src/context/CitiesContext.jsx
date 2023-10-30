import { createContext, useCallback, useContext, useEffect, useReducer } from "react"
import { citiesReducer, citiesStates } from "../Reducers/CitiesReducer.js"
const BASE_URL = "http://localhost:3001"

const CitiesContext = createContext(null)

function CitiesProvider({ children }) {
    const [{ cities, isLoading, currentCity }, dispatch] = useReducer(citiesReducer, citiesStates)

    const getCity = useCallback(
        async (id) => {
            if (Number(id) === currentCity.id) return

            dispatch({ type: "loading" })
            try {
                const res = await fetch(`${BASE_URL}/cities/${id}`)
                const city = await res.json()
                dispatch({ type: "city/loaded", payload: city })
            } catch (e) {
                dispatch({ type: "rejected", payload: e.message })
            }
        },
        [currentCity.id]
    )

    async function getCities() {
        dispatch({ type: "loading" })
        try {
            const res = await fetch(`${BASE_URL}/cities`)
            const cityData = await res.json()
            dispatch({ type: "cities/loaded", payload: cityData })
        } catch (e) {
            dispatch({ type: "rejected", payload: e.message })
        }
    }
    async function addCity(newCity) {
        dispatch({ type: "loading" })
        try {
            const res = await fetch(`${BASE_URL}/cities`, {
                method: "POST",
                body: JSON.stringify(newCity),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await res.json()
            dispatch({ type: "city/created", payload: data })
        } catch (e) {
            dispatch({ type: "rejected", payload: e.message })
        }
    }
    async function deleteCity(id) {
        dispatch({ type: "loading" })
        try {
            await fetch(`${BASE_URL}/cities/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            dispatch({ type: "city/deleted", payload: id })
        } catch (e) {
            dispatch({ type: "rejected", payload: e.message })
        }
    }

    useEffect(() => {
        getCities()
    }, [])

    const value = { cities, isLoading, currentCity, getCity, addCity, deleteCity }
    return <CitiesContext.Provider value={value}>{children}</CitiesContext.Provider>
}

function useCitiesContext() {
    const values = useContext(CitiesContext)
    if (values === undefined) throw new Error("CitiesContext must be used inside CitiesProvider")
    return values
}

export { CitiesProvider, useCitiesContext }

import { initialStates, reducer } from "../../../Reducers/MapFormGeoReducer.js"
import Message from "../../../pages/shared/message/Message.jsx"
import Spinner from "../../../pages/shared/spinner/Spinner.jsx"
import useUrlPosition from "../../../hooks/useUrlPosition.js"
import ButtonBack from "../../shared/button/ButtonBack.jsx"
import Button from "../../shared/button/Button.jsx"
import styles from "./Form.module.css"

import React, { useEffect, useReducer, useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { useCitiesContext } from "../../../context/CitiesContext.jsx"
import { useNavigate } from "react-router-dom"

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client"

function Form() {
    const [state, dispatch] = useReducer(reducer, initialStates)

    const [date, setDate] = useState(new Date())
    const [notes, setNotes] = useState("")
    const [city, setCity] = useState("")

    const navigate = useNavigate()
    const { lat, lng } = useUrlPosition()
    const { addCity, isLoading } = useCitiesContext()

    async function handleSubmit(e) {
        e.preventDefault()
        if (!city || !date) return

        const newCity = {
            cityName: city,
            country: state.country,
            emoji: state.emoji,
            date,
            notes,
            position: {
                lat,
                lng
            }
        }
        await addCity(newCity)

        navigate("/app/cities")
    }

    useEffect(() => {
        async function fetchCityData() {
            if (!(lat || lng)) return

            dispatch({ type: "mapFormGeo/loadingData" })
            try {
                const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`)
                const data = await res.json()

                if (!data.countryName) {
                    throw new Error(
                        "Please Click somewhere else to select a country. You might be clicking on a sea ⛵"
                    )
                }

                dispatch({
                    type: "mapFormGeo/setData",
                    payload: {
                        country: data.countryName,
                        cityName: data.city || data.locality || "",
                        emoji: data.countryCode
                    }
                })
                setCity(data.city)
            } catch (e) {
                console.log(e)
                dispatch({ type: "mapFormGeo/failedSetData", payload: e.message })
            }
        }

        fetchCityData()
    }, [lat, lng])

    if (state.isLoadingGeoCoding) return <Spinner />
    if (!(lat || lng)) return <Message message="Please start by clicking somewhere on the map" />
    if (state.geoCodingErrorMessage) return <Message message={state.geoCodingErrorMessage} />

    return (
        <form className={`${styles.form} ${isLoading ? styles.loading : ""}`} onSubmit={handleSubmit}>
            <div className={styles.row}>
                <label htmlFor="cityName">City name</label>
                <input id="cityName" onChange={(e) => setCity(e.target.value)} value={city} />
                <span className={styles.flag}>{state.emoji}</span>
            </div>

            <div className={styles.row}>
                <label htmlFor="date">When did you go to {state.cityName}?</label>
                <DatePicker
                    id="date"
                    selected={date}
                    onChange={(date) => setDate(date)}
                    dateFormat="dd/MM/yyyy"
                    fixedHeight={true}
                />
            </div>

            <div className={styles.row}>
                <label htmlFor="notes">Notes about your trip to {state.cityName}</label>
                <textarea id="notes" onChange={(e) => setNotes(e.target.value)} value={notes} />
            </div>

            <div className={styles.buttons}>
                <Button type="primary" disabled={isLoading}>
                    Add
                </Button>
                <ButtonBack />
            </div>
        </form>
    )
}

export default Form

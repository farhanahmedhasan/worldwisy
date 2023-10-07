import { initialStates, reducer } from "../../../Reducers/MapFormGeoReducer.js"
import Message from "../../../pages/shared/message/Message.jsx"
import Spinner from "../../../pages/shared/spinner/Spinner.jsx"
import useUrlPosition from "../../../hooks/useUrlPosition.js"
import ButtonBack from "../../shared/button/ButtonBack.jsx"
import Button from "../../shared/button/Button.jsx"
import styles from "./Form.module.css"

import React, { useEffect, useReducer, useState } from "react"

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client"

function Form() {
    const [state, dispatch] = useReducer(reducer, initialStates)

    const [date, setDate] = useState(new Date())
    const [notes, setNotes] = useState("")
    const [city, setCity] = useState("")

    const { lat, lng } = useUrlPosition()

    useEffect(() => {
        async function fetchCityData() {
            if (!(lat || lng)) return

            dispatch({ type: "mapFormGeo/loadingData" })
            try {
                const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`)
                const data = await res.json()
                console.log(data)

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
        <form className={styles.form}>
            <div className={styles.row}>
                <label htmlFor="cityName">City name</label>
                <input id="cityName" onChange={(e) => setCity(e.target.value)} value={city} />
                <span className={styles.flag}>{state.emoji}</span>
            </div>

            <div className={styles.row}>
                <label htmlFor="date">When did you go to {state.cityName}?</label>
                <input id="date" onChange={(e) => setDate(e.target.value)} value={date} />
            </div>

            <div className={styles.row}>
                <label htmlFor="notes">Notes about your trip to {state.cityName}</label>
                <textarea id="notes" onChange={(e) => setNotes(e.target.value)} value={notes} />
            </div>

            <div className={styles.buttons}>
                <Button type="primary">Add</Button>
                <ButtonBack />
            </div>
        </form>
    )
}

export default Form

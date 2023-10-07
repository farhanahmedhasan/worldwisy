import Message from "../../../pages/shared/message/Message.jsx"
import Spinner from "../../../pages/shared/spinner/Spinner.jsx"
import useUrlPosition from "../../../hooks/useUrlPosition.js"
import ButtonBack from "../../shared/button/ButtonBack.jsx"
import { convertToEmoji } from "../../../utils/helpers.js"
import Button from "../../shared/button/Button.jsx"
import styles from "./Form.module.css"

import React, { useEffect, useState } from "react"

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client"

function Form() {
    const [date, setDate] = useState(new Date())
    const [notes, setNotes] = useState("")

    const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false)
    const [cityName, setCityName] = useState("")
    const [country, setCountry] = useState("")
    const [emoji, setEmoji] = useState("")
    const [geoCodingErrorMessage, setGeoCodingErrorMessage] = useState("")

    const { lat, lng } = useUrlPosition()

    useEffect(() => {
        async function fetchCityData() {
            setIsLoadingGeoCoding(true)
            try {
                const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`)
                const data = await res.json()
                console.log(data)

                if (!data.countryName) {
                    throw new Error(
                        "Please Click somewhere else to select a country. You might be clicking on a sea ⛵"
                    )
                }

                setGeoCodingErrorMessage("")
                setCityName(data.city || data.locality || "")
                setCountry(data.countryName)
                setEmoji(convertToEmoji(data.countryCode))
            } catch (e) {
                console.log(e)
                setGeoCodingErrorMessage(e.message)
            } finally {
                setIsLoadingGeoCoding(false)
            }
        }

        fetchCityData()
    }, [lat, lng])

    if (isLoadingGeoCoding) return <Spinner />
    if (geoCodingErrorMessage) return <Message message={geoCodingErrorMessage} />

    return (
        <form className={styles.form}>
            <div className={styles.row}>
                <label htmlFor="cityName">City name</label>
                <input id="cityName" onChange={(e) => setCityName(e.target.value)} value={cityName} />
                <span className={styles.flag}>{emoji}</span>
            </div>

            <div className={styles.row}>
                <label htmlFor="date">When did you go to {cityName}?</label>
                <input id="date" onChange={(e) => setDate(e.target.value)} value={date} />
            </div>

            <div className={styles.row}>
                <label htmlFor="notes">Notes about your trip to {cityName}</label>
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

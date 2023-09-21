import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import React, { useEffect, useState } from "react"

import Spinner from "../../../pages/shared/spinner/Spinner.jsx"
import styles from "./City.module.css"
import Button from "../../shared/button/Button.jsx"
import { formatDate } from "../../../utils/helpers.js"

const BASE_URL = "http://localhost:3001/cities"
export default function City() {
    const [currentCity, setCurrentCity] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const { emoji, cityName, notes, date } = currentCity

    const params = useParams()
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const lat = searchParams.get("lat")
    const lng = searchParams.get("lat")

    function handleClick() {
        navigate(-1)
    }

    useEffect(() => {
        async function getCity() {
            setIsLoading(true)
            try {
                const res = await fetch(`${BASE_URL}/${params.id}`)
                const city = await res.json()
                setCurrentCity(city)
            } catch (e) {
                console.log(e)
            } finally {
                setIsLoading(false)
            }
        }
        getCity()
    }, [])

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <div className={styles.city}>
                <div className={styles.row}>
                    <h6>City name</h6>
                    <h3>
                        <span>{emoji}</span> {cityName}
                    </h3>
                </div>

                <div className={styles.row}>
                    <h6>You went to {cityName} on</h6>
                    <p>{formatDate(date || null)}</p>
                </div>

                {notes && (
                    <div className={styles.row}>
                        <h6>Your notes</h6>
                        <p>{notes}</p>
                    </div>
                )}

                <div className={styles.row}>
                    <h6>Learn more</h6>
                    <a href={`https://en.wikipedia.org/wiki/${cityName}`} target="_blank" rel="noreferrer">
                        Check out {cityName} on Wikipedia &rarr;
                    </a>
                </div>

                <div>
                    <Button type="back" onClick={handleClick}>
                        &larr; Back
                    </Button>
                </div>
            </div>
        </>
    )
}

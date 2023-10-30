import { useParams } from "react-router-dom"
import React, { useEffect } from "react"

import { useCitiesContext } from "../../../context/CitiesContext.jsx"
import Spinner from "../../shared/spinner/Spinner.jsx"
import ButtonBack from "../../shared/button/ButtonBack.jsx"
import { formatDate } from "../../../utils/helpers.js"
import styles from "./City.module.css"

export default function City() {
    const { isLoading, currentCity, getCity } = useCitiesContext()
    const { emoji, cityName, notes, date } = currentCity

    const params = useParams()

    useEffect(() => {
        getCity(params.id)
    }, [params.id, getCity])

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
                    <ButtonBack />
                </div>
            </div>
        </>
    )
}

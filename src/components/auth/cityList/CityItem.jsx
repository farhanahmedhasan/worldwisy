import { useCitiesContext } from "../../../context/CitiesContext.jsx"
import { formatDate } from "../../../utils/helpers.js"
import styles from "./CityItem.module.css"

import { Link } from "react-router-dom"
import React from "react"

export default function CityItem({ city }) {
    const { currentCity, deleteCity } = useCitiesContext()
    const { emoji, cityName, date, position, id } = city

    function handleDeleteCity(e, id) {
        e.preventDefault()
        deleteCity(id)
    }

    return (
        <li>
            <Link
                to={`${id}?lat=${position.lat}&lng=${position.lng}`}
                className={`${styles.cityItem} ${currentCity.id === id ? styles["cityItem--active"] : ""}`}
            >
                <span className={styles.emoji}>{emoji}</span>
                <h3 className={styles.name}>{cityName}</h3>
                <time className={styles.date}>({formatDate(date)})</time>
                <button className={styles.deleteBtn} type="button" onClick={(e) => handleDeleteCity(e, id)}>
                    &times;
                </button>
            </Link>
        </li>
    )
}

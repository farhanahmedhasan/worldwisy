import { formatDate } from "../../../utils/helpers.js"
import styles from "./CityItem.module.css"
import React from "react"
import { Link } from "react-router-dom"
import { useCitiesContext } from "../../../context/CitiesContext.jsx"

export default function CityItem({ city }) {
    const { currentCity } = useCitiesContext()

    const { emoji, cityName, date, position, id } = city
    return (
        <li>
            <Link
                to={`${id}?lat=${position.lat}&lng=${position.lng}`}
                className={`${styles.cityItem} ${currentCity.id === id ? styles["cityItem--active"] : ""}`}
            >
                <span className={styles.emoji}>{emoji}</span>
                <h3 className={styles.name}>{cityName}</h3>
                <time className={styles.date}>({formatDate(date)})</time>
                <button className={styles.deleteBtn} type="button">
                    &times;
                </button>
            </Link>
        </li>
    )
}

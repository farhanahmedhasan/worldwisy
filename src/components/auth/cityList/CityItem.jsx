import { formatDate } from "../../../utils/helpers.js"
import styles from "./CityItem.module.css"
import React from "react"
import { Link } from "react-router-dom"

export default function CityItem({ city }) {
    const { emoji, cityName, date, position } = city
    return (
        <li>
            <Link to={`${cityName.toLowerCase()}?lat=${position.lat}&lng=${position.lng}`} className={styles.cityItem}>
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

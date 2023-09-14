import { formatDate } from "../../../utils/helpers.js"
import styles from "./CityItem.module.css"
import React from "react"

export default function CityItem({ city }) {
    const { emoji, cityName, date } = city
    return (
        <li className={styles.cityItem}>
            <span className={styles.emoji}>{emoji}</span>
            <h3 className={styles.name}>{cityName}</h3>
            <time className={styles.date}>({formatDate(date)})</time>
            <button className={styles.deleteBtn} type="button">
                &times;
            </button>
        </li>
    )
}

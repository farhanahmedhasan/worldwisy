import styles from "./CountryItem.module.css"

import React from "react"

export default function CountryItem({ country }) {
    return (
        <li className={styles.countryItem}>
            <span>{country.emoji}</span>
            <span>{country.country}</span>
        </li>
    )
}

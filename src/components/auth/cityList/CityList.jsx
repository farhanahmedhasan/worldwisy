import Spinner from "../../../pages/shared/spinner/Spinner.jsx"
import styles from "./CityList.module.css"

import React from "react"

export default function CityList({ cities, isLoading }) {
    if (isLoading) {
        return <Spinner />
    }
    return <ul className={styles.cityList}>List of cities</ul>
}

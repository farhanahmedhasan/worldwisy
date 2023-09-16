import styles from "./Button.module.css"
import React from "react"

export default function Button({ children, onClick, type }) {
    return (
        // eslint-disable-next-line react/button-has-type
        <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
            {children}
        </button>
    )
}

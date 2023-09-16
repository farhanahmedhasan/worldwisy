import { useParams } from "react-router-dom"
import React from "react"

export default function City() {
    const params = useParams()
    console.log(params)

    return (
        <div>
            <h1>City</h1>
        </div>
    )
}

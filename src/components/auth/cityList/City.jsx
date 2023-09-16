import { useParams, useSearchParams } from "react-router-dom"
import React from "react"

export default function City() {
    const params = useParams()
    const [searchParams] = useSearchParams()

    const lat = searchParams.get("lat")
    const lng = searchParams.get("lat")

    return (
        <div>
            <h1>City {params.id}</h1>
            <p>
                position: {lat}, {lng}
            </p>
        </div>
    )
}

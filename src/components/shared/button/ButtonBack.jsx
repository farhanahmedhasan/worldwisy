import { useNavigate } from "react-router-dom"

import Button from "./Button.jsx"

export default function ButtonBack() {
    const navigate = useNavigate()

    function handleNavigate(e) {
        e.preventDefault()
        navigate(-1)
    }

    return (
        <Button type="back" onClick={handleNavigate}>
            &larr; Back
        </Button>
    )
}

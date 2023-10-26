import { useAuthContext } from "../../context/FakeAuthContext.jsx"

import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export default function ProtectedRoute({ children }) {
    const { isUserAuthenticated } = useAuthContext()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isUserAuthenticated) navigate("/")
    }, [isUserAuthenticated])

    return isUserAuthenticated ? children : null
}

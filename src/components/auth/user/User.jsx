import styles from "./User.module.css"
import Button from "../../shared/button/Button.jsx"
import { useAuthContext } from "../../../context/FakeAuthContext.jsx"
import { useNavigate } from "react-router-dom"

function User() {
    const navigate = useNavigate()
    const { user, logout } = useAuthContext()

    function handleLogout(e) {
        e.preventDefault()
        logout()
        navigate("/")
    }

    return (
        <div className={styles.user}>
            <img src={user.avatar} alt={user.name} />
            <span>Welcome, {user.name}</span>
            <Button type="primary" onClick={handleLogout}>
                Logout
            </Button>
        </div>
    )
}

export default User

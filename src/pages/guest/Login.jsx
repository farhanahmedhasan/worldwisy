import { useAuthContext } from "../../context/FakeAuthContext.jsx"
import Button from "../../components/shared/button/Button.jsx"
import PageNav from "../../components/guest/PageNav.jsx"
import styles from "./Login.module.css"

import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Login() {
    // PRE-FILL FOR DEV PURPOSES
    const [email, setEmail] = useState("hasan@gmail.com")
    const [password, setPassword] = useState("hasan")

    const navigate = useNavigate()
    const { login, isUserAuthenticated, error } = useAuthContext()

    function handleLogin(e) {
        e.preventDefault()
        if (email && password) login(email, password)
    }

    useEffect(() => {
        if (isUserAuthenticated) {
            navigate("/app", {
                replace: true
            })
        }
    }, [isUserAuthenticated])

    return (
        <main className={styles.login}>
            <PageNav />
            <form className={styles.form}>
                <div className={styles.row}>
                    <label htmlFor="email">Email address</label>
                    <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                </div>

                <div className={styles.row}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>
                <span className={styles.error}>{error}</span>

                <div>
                    <Button type="primary" onClick={handleLogin}>
                        Login
                    </Button>
                </div>
            </form>
        </main>
    )
}

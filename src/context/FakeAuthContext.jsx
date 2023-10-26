import { createContext, useContext, useReducer } from "react"
import { authReducer, authStates } from "../Reducers/FakeAuthReducer.js"

const AuthContext = createContext(null)

const FAKE_USER = {
    name: "hasan",
    email: "hasan@gmail.com",
    password: "hasan",
    avatar: "https://i.pravatar.cc/100?u=zz"
}

function AuthProvider({ children }) {
    const [{ user, isUserAuthenticated, error }, dispatch] = useReducer(authReducer, authStates)

    function login(email, password) {
        if (email === FAKE_USER.email && password === FAKE_USER.password) {
            dispatch({ type: "auth/loggedIn", payload: FAKE_USER })
        } else {
            dispatch({ type: "auth/rejected", payload: "Credentials are incorrect" })
        }
    }
    function logout() {
        dispatch({ type: "auth/loggedOut" })
    }

    return (
        <AuthContext.Provider value={{ user, isUserAuthenticated, error, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuthContext() {
    const values = useContext(AuthContext)
    if (values === undefined) throw new Error("FakeAuthContext must be used inside FakeAuthProvider")
    return values
}

export { AuthProvider, useAuthContext }

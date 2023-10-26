import { createContext, useContext } from "react"

const AuthContext = createContext(null)

function AuthProvider({ children }) {
    return <AuthContext.Provider value={"yo"}>{children}</AuthContext.Provider>
}

function useAuthContext() {
    const values = useContext(AuthContext)
    if (values === undefined) throw new Error("FakeAuthContext must be used inside FakeAuthProvider")
    return values
}

export { AuthProvider, useAuthContext }

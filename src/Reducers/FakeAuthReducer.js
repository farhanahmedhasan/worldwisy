const authStates = {
    user: null,
    isUserAuthenticated: false,
    error: ""
}

function authReducer(state, action) {
    switch (action.type) {
        case "auth/loggedIn":
            return {
                ...state,
                user: action.payload,
                isUserAuthenticated: true,
                error: ""
            }

        case "auth/loggedOut":
            return {
                ...state,
                user: null,
                isUserAuthenticated: false
            }

        case "auth/rejected":
            return {
                ...state,
                error: action.payload
            }

        default:
            return state
    }
}

export { authReducer, authStates }

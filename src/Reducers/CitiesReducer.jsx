export const citiesStates = {
    cities: [],
    isLoading: false,
    currentCity: {},
    error: ""
}

export function citiesReducer(state, action) {
    switch (action.type) {
        case "loading":
            return {
                ...state,
                isLoading: true
            }

        case "cities/loaded":
            return {
                ...state,
                cities: action.payload,
                isLoading: false
            }

        case "city/loaded":
            return {
                ...state,
                currentCity: action.payload,
                isLoading: false
            }

        case "city/created":
            return {
                ...state,
                isLoading: false,
                cities: [...state.cities, action.payload],
                currentCity: action.payload
            }

        case "city/deleted":
            return {
                ...state,
                isLoading: false,
                cities: state.cities.filter((city) => city.id !== action.payload),
                currentCity: {}
            }

        case "rejected":
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }

        default:
            return state
    }
}

import { convertToEmoji } from "../utils/helpers.js"

export const initialStates = {
    isLoadingGeoCoding: false,
    country: "",
    cityName: "",
    emoji: "",
    geoCodingErrorMessage: ""
}

export function reducer(state, action) {
    switch (action.type) {
        case "mapFormGeo/loadingData":
            return {
                ...state,
                isLoadingGeoCoding: true
            }

        case "mapFormGeo/setData":
            return {
                ...state,
                geoCodingErrorMessage: "",
                isLoadingGeoCoding: false,
                cityName: action.payload.cityName,
                country: action.payload.country,
                emoji: convertToEmoji(action.payload.emoji)
            }

        case "mapFormGeo/failedSetData":
            return {
                ...state,
                isLoadingGeoCoding: false,
                geoCodingErrorMessage: action.payload,
                country: "",
                cityName: "",
                emoji: ""
            }

        default:
            return state
    }
}

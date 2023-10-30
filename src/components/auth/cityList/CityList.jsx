import Spinner from "../../shared/spinner/Spinner.jsx"
import styles from "./CityList.module.css"

import { useCitiesContext } from "../../../context/CitiesContext.jsx"
import Message from "../../../pages/shared/message/Message.jsx"
import CityItem from "./CityItem.jsx"

export default function CityList() {
    const { cities, isLoading } = useCitiesContext()

    if (isLoading) {
        return <Spinner />
    }

    if (!cities.length) {
        return <Message message="Add your first city by clicking on a city on the map" />
    }

    return (
        <ul className={styles.cityList}>
            {cities.map((city) => (
                <CityItem key={city.id} city={city} />
            ))}
        </ul>
    )
}

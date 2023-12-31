import { useCitiesContext } from "../../../context/CitiesContext.jsx"
import Message from "../../../pages/shared/message/Message.jsx"
import Spinner from "../../shared/spinner/Spinner.jsx"
import styles from "./CountryList.module.css"
import CountryItem from "./CountryItem.jsx"

export default function CountryList() {
    const { cities, isLoading } = useCitiesContext()

    if (isLoading) {
        return <Spinner />
    }

    if (!cities.length) {
        return <Message message="Add your first country by clicking on a country on the map" />
    }

    // here accumulator is the whole array and cur is the current item of the array
    const countries = cities.reduce((acc, cur) => {
        if (acc.map((el) => el.country).includes(cur.country)) {
            return acc
        } else {
            return [...acc, { country: cur.country, emoji: cur.emoji, id: cur.id }]
        }
    }, [])

    return (
        <ul className={styles.countryList}>
            {countries.map((country) => (
                <CountryItem key={country.id} country={country} />
            ))}
        </ul>
    )
}

import CountryList from "./components/auth/countryList/CountryList.jsx"
import CityList from "./components/auth/cityList/CityList.jsx"
import City from "./components/auth/cityList/City.jsx"
import Form from "./components/auth/form/Form.jsx"
import AppLayout from "./pages/auth/AppLayout.jsx"
import Error404 from "./pages/shared/Error404.jsx"
import Product from "./pages/guest/Product.jsx"
import Pricing from "./pages/guest/Pricing.jsx"
import Login from "./pages/guest/Login.jsx"
import Home from "./pages/guest/Home.jsx"
import "./index.css"

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import React, { useEffect, useState } from "react"

const BASE_URL = "http://localhost:3001"

export default function App() {
    const [cities, setCities] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function fetchCities() {
            setIsLoading(true)
            try {
                const res = await fetch(`${BASE_URL}/cities`)
                const cityData = await res.json()
                setCities(cityData)
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchCities()
    }, [])
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/product" element={<Product />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/app" element={<AppLayout />}>
                    <Route index element={<Navigate replace to="cities" />} />
                    <Route path="cities" element={<CityList cities={cities} isLoading={isLoading} />} />
                    <Route path="cities/:id" element={<City />} />
                    <Route path="countries" element={<CountryList cities={cities} isLoading={isLoading} />} />
                    <Route path="form" element={<Form />} />
                </Route>
                <Route path="*" element={<Error404 />} />
            </Routes>
        </BrowserRouter>
    )
}

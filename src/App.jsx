import { BrowserRouter, Route, Routes } from "react-router-dom"

import CityList from "./components/auth/cityList/CityList.jsx"
import AppLayout from "./pages/auth/AppLayout.jsx"
import Error404 from "./pages/shared/Error404.jsx"
import Product from "./pages/guest/Product.jsx"
import Pricing from "./pages/guest/Pricing.jsx"
import Login from "./pages/guest/Login.jsx"
import Home from "./pages/guest/Home.jsx"

import React, { useEffect, useState } from "react"
import "./index.css"

const BASE_URL = "http://localhost:3001"

export default function App() {
    const [cities, setCities] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function fetchCities() {
            setIsLoading(true)
            try {
                const res = await fetch(`${BASE_URL}/cities`)
                const cityData = await res.json()
                setCities(cityData)
                console.log(cityData)
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
                    <Route index element={<CityList cities={cities} isLoading={isLoading} />} />
                    <Route path="cities" element={<CityList />} />
                    <Route path="countries" element={<p>List of countries</p>} />
                    <Route path="form" element={<form>Just a form</form>} />
                </Route>
                <Route path="*" element={<Error404 />} />
            </Routes>
        </BrowserRouter>
    )
}

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
import { CitiesProvider } from "./context/CitiesContext.jsx"
import { AuthProvider } from "./context/FakeAuthContext.jsx"
import ProtectedRoute from "./pages/auth/ProtectedRoute.jsx"

export default function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <CitiesProvider>
                    <Routes>
                        <Route path="/" exact element={<Home />} />
                        <Route path="/product" element={<Product />} />
                        <Route path="/pricing" element={<Pricing />} />
                        <Route path="/login" element={<Login />} />
                        <Route
                            path="/app"
                            element={
                                <ProtectedRoute>
                                    <AppLayout />
                                </ProtectedRoute>
                            }
                        >
                            <Route index element={<Navigate replace to="cities" />} />
                            <Route path="cities" element={<CityList />} />
                            <Route path="cities/:id" element={<City />} />
                            <Route path="countries" element={<CountryList />} />
                            <Route path="form" element={<Form />} />
                        </Route>
                        <Route path="*" element={<Error404 />} />
                    </Routes>
                </CitiesProvider>
            </AuthProvider>
        </BrowserRouter>
    )
}

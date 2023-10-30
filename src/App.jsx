import SpinnerFullPage from "./components/shared/SpinnerFullPage/SpinnerFullPage.jsx"
import CountryList from "./components/auth/countryList/CountryList.jsx"
import CityList from "./components/auth/cityList/CityList.jsx"
import { AuthProvider } from "./context/FakeAuthContext.jsx"
import { CitiesProvider } from "./context/CitiesContext.jsx"
import ProtectedRoute from "./pages/auth/ProtectedRoute.jsx"
import City from "./components/auth/cityList/City.jsx"
import Form from "./components/auth/form/Form.jsx"
import "./index.css"

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { lazy, Suspense } from "react"

const Home = lazy(() => import("./pages/guest/Home.jsx"))
const Login = lazy(() => import("./pages/guest/Login.jsx"))
const Product = lazy(() => import("./pages/guest/Product.jsx"))
const Pricing = lazy(() => import("./pages/guest/Pricing.jsx"))
const Error404 = lazy(() => import("./pages/shared/Error404.jsx"))
const AppLayout = lazy(() => import("./pages/auth/AppLayout.jsx"))

export default function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <CitiesProvider>
                    <Suspense fallback={<SpinnerFullPage />}>
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
                    </Suspense>
                </CitiesProvider>
            </AuthProvider>
        </BrowserRouter>
    )
}

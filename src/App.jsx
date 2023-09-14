import { BrowserRouter, Route, Routes } from "react-router-dom"

import AppLayout from "./pages/auth/AppLayout.jsx"
import Error404 from "./pages/shared/Error404.jsx"
import Product from "./pages/guest/Product.jsx"
import Pricing from "./pages/guest/Pricing.jsx"
import Login from "./pages/guest/Login.jsx"
import Home from "./pages/guest/Home.jsx"

import React from "react"
import "./index.css"

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/product" element={<Product />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/app" element={<AppLayout />}>
                    <Route index element={<p>List of cities</p>} />
                    <Route path="cities" element={<p>List of cities</p>} />
                    <Route path="countries" element={<p>List of countries</p>} />
                    <Route path="form" element={<form>Just a form</form>} />
                </Route>
                <Route path="*" element={<Error404 />} />
            </Routes>
        </BrowserRouter>
    )
}

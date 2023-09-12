import { BrowserRouter, Route, Routes } from "react-router-dom"

import Error404 from "./pages/Error404.jsx"
import Product from "./pages/Product.jsx"
import Pricing from "./pages/Pricing.jsx"
import Login from "./pages/Login.jsx"
import Home from "./pages/Home.jsx"

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
                <Route path="*" element={<Error404 />} />
            </Routes>
        </BrowserRouter>
    )
}

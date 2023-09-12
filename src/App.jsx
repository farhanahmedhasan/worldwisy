import { BrowserRouter, Route, Routes } from "react-router-dom"

import Error404 from "./pages/Error404.jsx"
import Product from "./pages/Product.jsx"
import Pricing from "./pages/Pricing.jsx"
import Home from "./pages/Home.jsx"
import React from "react"
import PageNav from "./components/PageNav.jsx"

export default function App() {
    return (
        <BrowserRouter>
            <PageNav />
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/product" element={<Product />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="*" element={<Error404 />} />
            </Routes>
        </BrowserRouter>
    )
}

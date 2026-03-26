import { Routes, Route } from "react-router-dom"

import Layout from "../components/layout/Layout"
import Home from "../pages/Home"
import About from "../pages/About"
import Products from "../pages/Products"
import ProductDetail from "../pages/ProductDetail"
import Infrastructure from "../pages/Infrastructure"
import Certifications from "../pages/Certifications"
import Gallery from "../pages/Gallery"
import Contact from "../pages/Contact"

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:slug" element={<ProductDetail />} />
        <Route path="/infrastructure" element={<Infrastructure />} />
        <Route path="/certifications" element={<Certifications />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  )
}

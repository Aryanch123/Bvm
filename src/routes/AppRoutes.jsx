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

// Admin Panel
import AdminLogin from "../pages/admin/AdminLogin"
import AdminLayout from "../pages/admin/AdminLayout"
import Dashboard from "../pages/admin/Dashboard"
import AdminCategories from "../pages/admin/AdminCategories"
import AdminProducts from "../pages/admin/AdminProducts"
import AdminProductForm from "../pages/admin/AdminProductForm"
import AdminSiteImages from "../pages/admin/AdminSiteImages"
import AdminCertificates from "../pages/admin/AdminCertificates"

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public website */}
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

      {/* Admin Panel — standalone layout, no navbar/footer */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="categories" element={<AdminCategories />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="products/new" element={<AdminProductForm />} />
        <Route path="products/:id/edit" element={<AdminProductForm />} />
        <Route path="site-images" element={<AdminSiteImages />} />
        <Route path="certificates" element={<AdminCertificates />} />
      </Route>
    </Routes>
  )
}


import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/navbar";
import Home from "./components/pages/home.js";
import About from "./components/pages/about.js";
import Contact from "./components/pages/contact.js";
import DashboardLayout from "./components/dashboard";
import Category from "./components/admin/category.js";
import Sub from './components/admin/subcategory.js'
import Product from "./components/admin/products.js";
import Getproduct from "./components/admin/mangaeproducts.js";
import Cart from './components/pages/cart.js'

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />

        {/* Admin Dashboard Routes */}
        <Route path="/admin" element={<DashboardLayout />}>
          <Route path="category" element={<Category />} />
          <Route path="subcategory" element={<Sub />} />
          <Route path="product" element={<Product />} />
          <Route path="manageproducts" element={<Getproduct />} />
        </Route>
      // </Routes>
    </Router>
  );
}

export default App;


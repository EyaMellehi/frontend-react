import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import "./App.css";
import Categories from "./components/Categories"; // Create this file
import Products from "./components/Products"; // Create this file
import CategoryDetails from "./components/CategoryDetails"; // Create this file
import AddEditCategory from "./components/AddEditCategory";
import AddEditProduct from "./components/AddEditProduct"; // Import AddEditProduct
import ProductDetails from "./components/ProductDetails"; // Import ProductDetails

function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <h1>Welcome to Our Shop</h1>
          {/* Navigation Links */}
          <nav>
            <Link to="/categories" className="App-link">
              Categories
            </Link>
            {" | "}
            <Link to="/products" className="App-link">
              Products
            </Link>
          </nav>
        </header>
        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<Navigate to="/categories" />} />  {/* Redirect root to categories */}
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/add" element={<AddEditCategory />} />
          <Route path="/categories/edit/:id" element={<AddEditCategory />} />
          <Route path="/categories/:id" element={<CategoryDetails />} />
          <Route path="/products/add" element={<AddEditProduct />} />
        <Route path="/products/edit/:id" element={<AddEditProduct />} />
        <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

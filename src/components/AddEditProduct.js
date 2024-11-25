import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../css/AddEditProduct.css'; // Import the external CSS file

function AddEditProduct() {
  const [product, setProduct] = useState({
    desg: "", // Corrected attribute name to "desg"
    prix: "",
    photo: "",
    categorie: { id: "" }, // Initially no category selected, with id
  });
  const [categories, setCategories] = useState([]); // To store the categories list
  const [isEdit, setIsEdit] = useState(false);
  const { id } = useParams(); // Get the product ID from the URL
  const navigate = useNavigate();

  // Fetch categories when the component mounts
  useEffect(() => {
    fetch("http://localhost:8383/Ecommerce/api/categories")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  // Fetch product data if we're editing an existing product
  useEffect(() => {
    if (id) {
      setIsEdit(true); // Set isEdit to true if we are editing
      // Fetch the product data by ID
      fetch(`http://localhost:8383/Ecommerce/api/produits/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setProduct(data);
        })
        .catch((error) => console.error("Error fetching product:", error));
    }
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const method = isEdit ? "PUT" : "POST";
    const url = isEdit
      ? `http://localhost:8383/Ecommerce/api/produits/${id}`
      : "http://localhost:8383/Ecommerce/api/produits";

    // Ensure category is correctly structured with the id
    const productData = {
      desg: product.desg, // Corrected attribute name here
      prix: product.prix,
      photo: product.photo,
      categorie: { id: product.categorie.id }, // Sending category as an object with id
    };

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    })
      .then((response) => {
        if (response.ok) {
          alert(isEdit ? "Product updated!" : "Product added!");
          navigate("/products");
        } else {
          alert("Error saving product!");
        }
      })
      .catch((error) => console.error("Error saving product:", error));
  };

  return (
    <div className="add-edit-product-container">
      <h2>{isEdit ? "Edit Product" : "Add Product"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Designation:</label>
          <input
            type="text"
            value={product.desg} // Corrected value binding
            onChange={(e) => setProduct({ ...product, desg: e.target.value })} // Corrected change handler
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={product.prix}
            onChange={(e) => setProduct({ ...product, prix: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Photo URL:</label>
          <input
            type="text"
            value={product.photo}
            onChange={(e) => setProduct({ ...product, photo: e.target.value })}
          />
        </div>
        <div>
          <label>Category:</label>
          <select
            value={product.categorie.id}
            onChange={(e) =>
              setProduct({ ...product, categorie: { id: e.target.value } }) // Set category id correctly
            }
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.nom}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">{isEdit ? "Save Changes" : "Add Product"}</button>
      </form>
    </div>
  );
}

export default AddEditProduct;

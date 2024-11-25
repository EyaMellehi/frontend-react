import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import '../css/AddEditCategory.css'; // Import the external CSS file

function AddEditCategory() {
  const { id } = useParams(); // Get category ID if editing
  const [nom, setNom] = useState(""); // For category name
  const [photo, setPhoto] = useState(""); // For category photo URL
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      // Fetch category details for editing
      fetch(`http://localhost:8383/Ecommerce/api/categories/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setNom(data.nom);
          setPhoto(data.photo || ""); // Default to empty if no photo
        })
        .catch((error) => console.error("Error fetching category:", error));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nom.trim()) {
      alert("The field 'nom' (name) is required.");
      return;
    }

    const url = id
      ? `http://localhost:8383/Ecommerce/api/categories/${id}`
      : "http://localhost:8383/Ecommerce/api/categories";
    const method = id ? "PUT" : "POST";

    // Payload includes 'nom' and 'photo'
    const payload = { nom, photo };

    fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (response.ok) {
          navigate("/categories");
        } else {
          alert("Failed to save category.");
        }
      })
      .catch((error) => console.error("Error saving category:", error));
  };

  return (
    <div className="add-edit-category-container">
      <h2>{id ? "Edit Category" : "Add Category"}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name (Nom):
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />
        </label>
        <br />
        <label>
          Photo URL:
          <input
            type="text"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">{id ? "Update" : "Add"}</button>
      </form>
    </div>
  );
}

export default AddEditCategory;

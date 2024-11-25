import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Categories.css"; // Import the CSS file for styling

function Categories() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8383/Ecommerce/api/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  const handleAddCategory = () => {
    navigate("/categories/add");
  };

  const handleEditCategory = (id) => {
    navigate(`/categories/edit/${id}`);
  };

  const handleDeleteCategory = (id) => {
    console.log(`Attempting to delete category with ID: ${id}`);
  
    if (window.confirm("Are you sure you want to delete this category?")) {
      fetch(`http://localhost:8383/Ecommerce/api/categories/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          console.log("Response status:", response.status); // Log the response status
          if (response.ok) {
            console.log(`Category with ID ${id} deleted successfully.`);
            setCategories(categories.filter((category) => category.id !== id));
          } else {
            response.text().then((text) => {
              console.error("Failed to delete category. Response:", text);
              alert(`Failed to delete category: ${text}`);
            });
          }
        })
        .catch((error) => {
          console.error("There was a problem with the delete operation:", error);
        });
    }
  };
  
  

  const handleViewDetails = (id) => {
    navigate(`/categories/${id}`);
  };

  return (
    <div className="categories-container">
      <h2>Categories</h2>
      <button className="add-category-btn" onClick={handleAddCategory}>
        Add Category
      </button>
      <table className="categories-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.nom}</td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => handleEditCategory(category.id)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteCategory(category.id)}
                >
                  Delete
                </button>
                <button
                  className="details-btn"
                  onClick={() => handleViewDetails(category.id)}
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Categories;

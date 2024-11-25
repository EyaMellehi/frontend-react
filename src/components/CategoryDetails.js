import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import '../css/CategoryDetails.css'; // Import the external CSS file

function CategoryDetails() {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8383/Ecommerce/api/categories/${id}`)
      .then((response) => response.json())
      .then((data) => setCategory(data))
      .catch((error) => console.error("Error fetching category details:", error));
  }, [id]);

  return (
    <div className="category-details-container">
      <h2>Category Details</h2>
      {category ? (
        <div>
          <p>ID: {category.id}</p>
          <p>Name: {category.nom}</p>
          {/* Display the image using src */}
          <p>
            <img
              src={`http://localhost:8383/Ecommerce/images/${category.photo}`} // Adjust the URL as necessary
              alt={category.nom} // Add alt text for accessibility
              style={{ width: "200px", height: "auto" }} // Adjust the image size
            />
          </p>
          <button onClick={() => navigate("/categories")}>Back to Categories</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default CategoryDetails;

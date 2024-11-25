import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../css/ProductDetails.css'; // Import the external CSS file

function ProductDetails() {
  const [product, setProduct] = useState(null);
  const { id } = useParams(); // Get the product ID from the URL

  useEffect(() => {
    // Fetch product details by ID
    fetch(`http://localhost:8383/Ecommerce/api/produits/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error("Error fetching product details:", error));
  }, [id]);

  if (!product) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="product-details">
      <h2>Product Details</h2>
      <div>
        <strong>ID:</strong> {product.id}
      </div>
      <div>
        <strong>Designation:</strong> {product.desg || "No Designation"}
      </div>
      <div>
        <strong>Price:</strong> {product.prix || "No Price"}
      </div>
      <div>
        <strong>Photo:</strong>
        {product.photo ? (
          <img src={product.photo} alt={product.desg} width="100" />
        ) : (
          <span>No Image</span>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;

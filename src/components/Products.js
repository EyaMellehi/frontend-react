import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/produit.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8383/Ecommerce/api/produits")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  const handleAddProduct = () => {
    navigate("/products/add");
  };

  const handleEditProduct = (id) => {
    navigate(`/products/edit/${id}`);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      fetch(`http://localhost:8383/Ecommerce/api/produits/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            setProducts(products.filter((product) => product.id !== id));
            alert("Product deleted successfully!");
          } else {
            alert("Failed to delete product.");
          }
        })
        .catch((error) => {
          console.error("There was a problem with the delete operation:", error);
        });
    }
  };

  const handleViewDetails = (id) => {
    navigate(`/products/${id}`);
  };

  if (loading) {
    return <div>Loading products...</div>;
  }

  return (
    <div className="products-container">
      <h2>Products</h2>
      <button className="add-product-btn" onClick={handleAddProduct}>
        Add Product
      </button>
      <table className="products-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Designation</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.desg || 'No Designation'}</td>
              <td>{product.prix || 'No Price'}</td>
              <td>{product.categorie ? product.categorie.nom : 'No Category'}</td> {/* Display Category */}
              
              <td>
                <button className="details-btn" onClick={() => handleViewDetails(product.id)}>
                  View Details
                </button>
                <button className="edit-btn" onClick={() => handleEditProduct(product.id)}>
                  Edit
                </button>
                <button className="delete-btn" onClick={() => handleDeleteProduct(product.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products;

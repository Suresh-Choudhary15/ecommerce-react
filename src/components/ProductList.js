// ProductList.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getProducts, deleteProduct } from "../services/productService";
import ErrorAlert from "./ErrorAlert";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setError(err.message || "Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteConfirm(id);
  };

  const handleDeleteConfirm = async (id) => {
    try {
      setLoading(true);
      await deleteProduct(id);
      setProducts(products.filter((product) => product.id !== id));
      setDeleteConfirm(null);
    } catch (err) {
      setError(err.message || "Failed to delete product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirm(null);
  };

  if (loading && products.length === 0) {
    return <div className="loading">Loading products...</div>;
  }

  return (
    <div className="product-list-container">
      <div className="product-list-header">
        <h2>My Products</h2>
        <button
          className="btn-primary"
          onClick={() => navigate("/products/new")}
        >
          Add New Product
        </button>
      </div>

      {error && <ErrorAlert message={error} onClose={() => setError(null)} />}

      {products.length === 0 && !loading ? (
        <div className="no-products">
          <p>
            No products found. Click the button above to add your first product.
          </p>
        </div>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                {product.image_url ? (
                  <img src={product.image_url} alt={product.name} />
                ) : (
                  <div className="no-image">No Image</div>
                )}
              </div>

              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="product-price">
                  ${parseFloat(product.price).toFixed(2)}
                </p>
                <p className="product-description">{product.description}</p>
              </div>

              <div className="product-actions">
                <button
                  className="btn-secondary"
                  onClick={() => navigate(`/products/edit/${product.id}`)}
                >
                  Edit
                </button>

                {deleteConfirm === product.id ? (
                  <div className="delete-confirm">
                    <p>Are you sure?</p>
                    <div>
                      <button
                        className="btn-danger"
                        onClick={() => handleDeleteConfirm(product.id)}
                      >
                        Yes
                      </button>
                      <button
                        className="btn-secondary"
                        onClick={handleDeleteCancel}
                      >
                        No
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    className="btn-danger"
                    onClick={() => handleDeleteClick(product.id)}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;

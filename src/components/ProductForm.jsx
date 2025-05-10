import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createProduct,
  getProduct,
  updateProduct,
} from "../services/productService";
import ErrorAlert from "./ErrorAlert";

const ProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // For edit mode
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image_url: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      const fetchProduct = async () => {
        try {
          setLoading(true);
          const product = await getProduct(id);
          setFormData({
            name: product.name || "",
            price: product.price || "",
            description: product.description || "",
            image_url: product.image_url || "",
          });
        } catch (err) {
          setError(err.message || "Failed to fetch product details");
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [id, isEditMode]);

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Product name is required";
    }

    if (!formData.price) {
      errors.price = "Price is required";
    } else if (
      isNaN(parseFloat(formData.price)) ||
      parseFloat(formData.price) <= 0
    ) {
      errors.price = "Price must be a positive number";
    }

    if (!formData.description.trim()) {
      errors.description = "Description is required";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear validation error when user types
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const productData = {
        ...formData,
        price: parseFloat(formData.price),
      };

      if (isEditMode) {
        await updateProduct(id, productData);
      } else {
        await createProduct(productData);
      }

      setSubmitSuccess(true);

      // Redirect after short delay to show success
      setTimeout(() => {
        navigate("/products");
      }, 1500);
    } catch (err) {
      console.error("Form submission error:", err);

      if (err.status === 400 && Array.isArray(err.data?.errors)) {
        // Handle validation errors from server
        const serverErrors = {};
        err.data.errors.forEach((error) => {
          serverErrors[error.param] = error.msg;
        });
        setValidationErrors(serverErrors);
      } else {
        setError(err.message || "Failed to save product. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditMode) {
    return <div className="loading">Loading product data...</div>;
  }

  return (
    <div className="product-form-container">
      <h2>{isEditMode ? "Edit Product" : "Add a New Product"}</h2>

      {error && <ErrorAlert message={error} onClose={() => setError(null)} />}

      {submitSuccess && (
        <div className="success-message">
          Product successfully {isEditMode ? "updated" : "created"}!
        </div>
      )}

      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label htmlFor="name">Product Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={validationErrors.name ? "input-error" : ""}
          />
          {validationErrors.name && (
            <div className="error-text">{validationErrors.name}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="price">Price ($) *</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            step="0.01"
            className={validationErrors.price ? "input-error" : ""}
          />
          {validationErrors.price && (
            <div className="error-text">{validationErrors.price}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className={validationErrors.description ? "input-error" : ""}
          />
          {validationErrors.description && (
            <div className="error-text">{validationErrors.description}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="image_url">Image URL (optional)</label>
          <input
            type="text"
            id="image_url"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate("/products")}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading
              ? "Saving..."
              : isEditMode
              ? "Update Product"
              : "Create Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;

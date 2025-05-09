import React, { useState } from "react";

const ProductForm = ({ onSubmit, isSubmitting }) => {
  const initialFormState = {
    name: "",
    price: "",
    description: "",
    imageUrl: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when field is edited
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Product name is required";
    }

    if (!formData.price) {
      errors.price = "Price is required";
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      errors.price = "Price must be a positive number";
    }

    if (!formData.description.trim()) {
      errors.description = "Description is required";
    }

    // imageUrl is optional, but if provided, should be a valid URL
    if (formData.imageUrl && !isValidUrl(formData.imageUrl)) {
      errors.imageUrl = "Image URL must be a valid URL";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Format the price as a number
      const formattedData = {
        ...formData,
        price: Number(formData.price),
      };

      const success = await onSubmit(formattedData);

      if (success) {
        // Reset form after successful submission
        setFormData(initialFormState);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Product Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            formErrors.name ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter product name"
          disabled={isSubmitting}
        />
        {formErrors.name && (
          <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Price ($) *
        </label>
        <input
          type="number"
          id="price"
          name="price"
          step="0.01"
          min="0"
          value={formData.price}
          onChange={handleChange}
          className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            formErrors.price ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="0.00"
          disabled={isSubmitting}
        />
        {formErrors.price && (
          <p className="text-red-500 text-xs mt-1">{formErrors.price}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Description *
        </label>
        <textarea
          id="description"
          name="description"
          rows="4"
          value={formData.description}
          onChange={handleChange}
          className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            formErrors.description ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter product description"
          disabled={isSubmitting}
        ></textarea>
        {formErrors.description && (
          <p className="text-red-500 text-xs mt-1">{formErrors.description}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="imageUrl"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Image URL (optional)
        </label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            formErrors.imageUrl ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="https://example.com/image.jpg"
          disabled={isSubmitting}
        />
        {formErrors.imageUrl && (
          <p className="text-red-500 text-xs mt-1">{formErrors.imageUrl}</p>
        )}
        <p className="text-xs text-gray-500 mt-1">
          Leave blank to use a default image.
        </p>
      </div>

      <div>
        <button
          type="submit"
          className={`w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            isSubmitting ? "opacity-75 cursor-not-allowed" : ""
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Submitting...
            </span>
          ) : (
            "Submit Product"
          )}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;

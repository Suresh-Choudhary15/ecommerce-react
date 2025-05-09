import React, { useContext, useState } from "react";
import ProductForm from "../components/ProductForm";
import { ProductContext } from "../context/ProductContext";

const SubmitProduct = () => {
  const { addProduct } = useContext(ProductContext);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (productData) => {
    setSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      await addProduct(productData);
      setSubmitSuccess(true);

      // Reset success message after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);

      return true; // Return true to indicate successful submission
    } catch (error) {
      setSubmitError(
        error.message || "Failed to add product. Please try again."
      );
      return false; // Return false to indicate failed submission
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Add a New Product
      </h2>

      {submitError && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6"
          role="alert"
        >
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">{submitError}</span>
        </div>
      )}

      {submitSuccess && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6"
          role="alert"
        >
          <strong className="font-bold">Success! </strong>
          <span className="block sm:inline">
            Your product has been added successfully.
          </span>
        </div>
      )}

      <ProductForm onSubmit={handleSubmit} isSubmitting={submitting} />
    </div>
  );
};

export default SubmitProduct;

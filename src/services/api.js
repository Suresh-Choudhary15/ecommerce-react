// Place this file in src/services/api.js
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

/**
 * Handles HTTP errors and returns appropriate error messages
 */
const handleErrors = async (response) => {
  if (!response.ok) {
    // Try to get error message from response
    try {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error ${response.status}`);
    } catch (error) {
      throw new Error(`HTTP error: ${response.status} ${response.statusText}`);
    }
  }
  return response.json();
};

/**
 * Fetch all products from the API
 */
export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/products`);
    return handleErrors(response);
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

/**
 * Add a new product to the API
 */
export const addProduct = async (productData) => {
  try {
    const response = await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });
    return handleErrors(response);
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

// Add more API functions as needed

export default {
  fetchProducts,
  addProduct,
};

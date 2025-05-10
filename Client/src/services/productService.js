// client/src/services/productService.js
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

/**
 * Service for handling product-related API calls
 */
const productService = {
  /**
   * Get all products
   * @returns {Promise<Array>} Promise with products array
   */
  getAllProducts: async () => {
    try {
      const response = await axios.get(`${API_URL}/products`);
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },

  /**
   * Get a product by ID
   * @param {number} id - Product ID
   * @returns {Promise<Object>} Promise with product object
   */
  getProductById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/products/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching product:", error);
      throw error;
    }
  },

  /**
   * Create a new product
   * @param {Object} product - Product object with name, price, description, and image_url
   * @returns {Promise<Object>} Promise with created product
   */
  createProduct: async (product) => {
    try {
      const response = await axios.post(`${API_URL}/products`, product);
      return response.data;
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  },

  /**
   * Update an existing product
   * @param {number} id - Product ID
   * @param {Object} product - Updated product data
   * @returns {Promise<Object>} Promise with updated product
   */
  updateProduct: async (id, product) => {
    try {
      const response = await axios.put(`${API_URL}/products/${id}`, product);
      return response.data;
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  },

  /**
   * Delete a product
   * @param {number} id - Product ID
   * @returns {Promise<Object>} Promise with success message
   */
  deleteProduct: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/products/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  },

  /**
   * Search products by keyword
   * @param {string} query - Search query
   * @param {boolean} advanced - Whether to use advanced search
   * @returns {Promise<Array>} Promise with matching products
   */
  searchProducts: async (query, advanced = false) => {
    try {
      const response = await axios.get(`${API_URL}/products/search`, {
        params: { query, advanced },
      });
      return response.data;
    } catch (error) {
      console.error("Error searching products:", error);
      throw error;
    }
  },
};

export default productService;

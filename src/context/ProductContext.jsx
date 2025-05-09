import React, { createContext, useState, useCallback } from "react";
import {
  fetchProducts as apiFetchProducts,
  addProduct as apiAddProduct,
} from "../services/api";

// Create the context
export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all products
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await apiFetchProducts();

      // Transform backend data to match frontend field expectations
      const transformedProducts = data.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description,
        // Handle the image_url to imageUrl field name inconsistency
        imageUrl: product.imageUrl || product.image_url || "",
      }));

      setProducts(transformedProducts);
    } catch (error) {
      console.error("Error in fetchProducts:", error);
      setError(error.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  }, []);

  // Add a new product
  const addProduct = async (productData) => {
    setLoading(true);
    setError(null);

    try {
      const newProduct = await apiAddProduct(productData);

      // Make sure the received product has consistent field names
      const formattedProduct = {
        id: newProduct.id,
        name: newProduct.name,
        price: newProduct.price,
        description: newProduct.description,
        imageUrl: newProduct.imageUrl || newProduct.image_url || "",
      };

      // Update the products state with the new product
      setProducts((prevProducts) => [...prevProducts, formattedProduct]);

      return formattedProduct;
    } catch (error) {
      console.error("Error in addProduct:", error);
      setError(error.message || "Failed to add product");
      throw error; // Re-throw to handle in the component
    } finally {
      setLoading(false);
    }
  };

  // Create a fallback function to handle API errors and still display UI
  const handleApiError = () => {
    // If we've already attempted to fetch from the API but got an error,
    // provide some sample data so the UI isn't empty
    if (error && products.length === 0) {
      return [
        {
          id: 1,
          name: "Sample Product",
          price: 19.99,
          description:
            "This is a sample product since we couldn't connect to the API.",
          imageUrl: "https://via.placeholder.com/300",
        },
      ];
    }
    return products;
  };

  // Value object to be provided to consumers
  const value = {
    products: handleApiError(),
    loading,
    error,
    fetchProducts,
    addProduct,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

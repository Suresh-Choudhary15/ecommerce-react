// client/src/pages/MyProducts.jsx
import React, { useState, useEffect } from "react";
import productService from "../services/productService";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [useAdvancedSearch, setUseAdvancedSearch] = useState(false);

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Update filtered products when products or search query changes
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProducts(products);
    } else {
      handleSearch(searchQuery);
    }
  }, [products]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getAllProducts();
      setProducts(data);
      setFilteredProducts(data);
      setError("");
    } catch (err) {
      setError("Failed to fetch products. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);

    if (query.trim() === "") {
      setFilteredProducts(products);
      return;
    }

    try {
      const results = await productService.searchProducts(
        query,
        useAdvancedSearch
      );
      setFilteredProducts(results);
    } catch (err) {
      console.error("Search error:", err);
      // Fallback to client-side filtering if API search fails
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          (product.description &&
            product.description.toLowerCase().includes(query.toLowerCase()))
      );
      setFilteredProducts(filtered);
    }
  };

  const handleSearchTypeChange = (event) => {
    setUseAdvancedSearch(event.target.checked);
    if (searchQuery.trim() !== "") {
      handleSearch(searchQuery);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await productService.deleteProduct(id);
      setProducts(products.filter((product) => product.id !== id));
      setFilteredProducts(
        filteredProducts.filter((product) => product.id !== id)
      );
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Failed to delete product. Please try again.");
    }
  };

  if (loading && products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Products</h1>

      {/* Search Bar */}
      <div className="mb-8">
        <SearchBar
          onSearch={handleSearch}
          searchQuery={searchQuery}
          useAdvancedSearch={useAdvancedSearch}
          onSearchTypeChange={handleSearchTypeChange}
        />
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Product List */}
      {filteredProducts.length === 0 ? (
        <div className="text-gray-500 text-center py-12">
          {searchQuery.trim() !== ""
            ? "No products match your search criteria."
            : "No products available. Add your first product!"}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onDelete={() => handleDeleteProduct(product.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProducts;

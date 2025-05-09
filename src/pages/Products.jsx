import React, { useState, useContext, useEffect } from "react";
import ProductList from "../components/ProductList";
import Search from "../components/Search";
import { ProductContext } from "../context/ProductContext";

const Products = () => {
  const { products, loading, error, fetchProducts } =
    useContext(ProductContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Fetch products when component mounts
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Filter products based on search term
  useEffect(() => {
    if (!products) return;

    if (searchTerm.trim() === "") {
      setFilteredProducts(products);
    } else {
      const searchTermLower = searchTerm.toLowerCase();
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTermLower) ||
          product.description.toLowerCase().includes(searchTermLower)
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6"
        role="alert"
      >
        <strong className="font-bold">Error! </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div className="py-6">
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {filteredProducts.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-600 text-lg">
            {products && products.length > 0
              ? "No products match your search criteria."
              : "No products found. Add some products to see them here!"}
          </p>
        </div>
      ) : (
        <ProductList products={filteredProducts} />
      )}
    </div>
  );
};

export default Products;

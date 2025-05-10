// server/controllers/productController.js
const Product = require("../models/Product");

/**
 * Controller for product-related operations
 */
const productController = {
  /**
   * Get all products
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.findAll();
      res.status(200).json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Server error while fetching products" });
    }
  },

  /**
   * Get a single product by ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  getProductById: async (req, res) => {
    const { id } = req.params;

    try {
      const product = await Product.findById(id);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json(product);
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      res.status(500).json({ message: "Server error while fetching product" });
    }
  },

  /**
   * Create a new product
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  createProduct: async (req, res) => {
    const { name, price, description, image_url } = req.body;

    // Validate required fields
    if (!name || !price) {
      return res.status(400).json({ message: "Name and price are required" });
    }

    try {
      const product = await Product.create({
        name,
        price,
        description: description || "",
        image_url: image_url || "",
      });

      res.status(201).json(product);
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ message: "Server error while creating product" });
    }
  },

  /**
   * Update an existing product
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  updateProduct: async (req, res) => {
    const { id } = req.params;
    const { name, price, description, image_url } = req.body;

    // Validate required fields
    if (!name || !price) {
      return res.status(400).json({ message: "Name and price are required" });
    }

    try {
      const product = await Product.update(id, {
        name,
        price,
        description: description || "",
        image_url: image_url || "",
      });

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json(product);
    } catch (error) {
      console.error(`Error updating product ${id}:`, error);
      res.status(500).json({ message: "Server error while updating product" });
    }
  },

  /**
   * Delete a product
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  deleteProduct: async (req, res) => {
    const { id } = req.params;

    try {
      const deleted = await Product.delete(id);

      if (!deleted) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error(`Error deleting product ${id}:`, error);
      res.status(500).json({ message: "Server error while deleting product" });
    }
  },

  /**
   * Search products by keyword
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  searchProducts: async (req, res) => {
    const { query, advanced } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    try {
      let products;

      // Use advanced search if requested, otherwise use basic search
      if (advanced === "true") {
        products = await Product.advancedSearch(query);
      } else {
        products = await Product.search(query);
      }

      res.status(200).json(products);
    } catch (error) {
      console.error("Error searching products:", error);
      res
        .status(500)
        .json({ message: "Server error while searching products" });
    }
  },
};

module.exports = productController;

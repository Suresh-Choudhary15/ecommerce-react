// server/routes/productRoutes.js
const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

/**
 * @route   GET /api/products
 * @desc    Get all products
 * @access  Public
 */
router.get("/", productController.getAllProducts);

/**
 * @route   GET /api/products/search
 * @desc    Search products by keyword
 * @access  Public
 */
router.get("/search", productController.searchProducts);

/**
 * @route   GET /api/products/:id
 * @desc    Get a product by ID
 * @access  Public
 */
router.get("/:id", productController.getProductById);

/**
 * @route   POST /api/products
 * @desc    Create a new product
 * @access  Public
 */
router.post("/", productController.createProduct);

/**
 * @route   PUT /api/products/:id
 * @desc    Update a product
 * @access  Public
 */
router.put("/:id", productController.updateProduct);

/**
 * @route   DELETE /api/products/:id
 * @desc    Delete a product
 * @access  Public
 */
router.delete("/:id", productController.deleteProduct);

module.exports = router;

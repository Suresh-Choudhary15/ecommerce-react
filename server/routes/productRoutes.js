// Improved product routes with proper error handling
const express = require("express");
const router = express.Router();
const db = require("../config/db"); // Adjust path as needed
const { validationResult, body } = require("express-validator");

// Validation middleware for product creation
const validateProduct = [
  body("name").notEmpty().withMessage("Product name is required"),
  body("price").isNumeric().withMessage("Price must be a valid number"),
  body("description").notEmpty().withMessage("Description is required"),
];

// GET all products with proper error handling
router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM products ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({
      error: "Failed to fetch products",
      details: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
});

// POST create a new product with validation
router.post("/", validateProduct, async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, price, description, image_url } = req.body;

  try {
    const result = await db.query(
      "INSERT INTO products (name, price, description, image_url) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, price, description, image_url || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({
      error: "Failed to create product",
      details: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
});

// GET a single product by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query("SELECT * FROM products WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({
      error: "Failed to fetch product",
      details: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
});

// PUT update product
router.put("/:id", validateProduct, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { name, price, description, image_url } = req.body;

  try {
    const result = await db.query(
      "UPDATE products SET name = $1, price = $2, description = $3, image_url = $4, updated_at = NOW() WHERE id = $5 RETURNING *",
      [name, price, description, image_url || null, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({
      error: "Failed to update product",
      details: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
});

// DELETE product
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(
      "DELETE FROM products WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({
      error: "Failed to delete product",
      details: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
});

module.exports = router;

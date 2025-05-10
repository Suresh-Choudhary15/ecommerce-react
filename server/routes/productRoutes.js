// server/routes/productRoutes.js
const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { validationResult, body } = require("express-validator");

// Validation middleware for product creation
const validateProduct = [
  body("name").notEmpty().withMessage("Product name is required"),
  body("price")
    .isFloat({ min: 0.01 })
    .withMessage("Price must be a positive number"),
  body("description").notEmpty().withMessage("Description is required"),
  body("imageUrl")
    .optional()
    .isURL()
    .withMessage("Image URL must be a valid URL"),
];

// GET all products
router.get("/", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM products ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error while fetching products" });
  }
});

// GET product by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query("SELECT * FROM products WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Server error while fetching product" });
  }
});

// POST new product
router.post("/", validateProduct, async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, price, description, imageUrl } = req.body;

    const result = await db.query(
      "INSERT INTO products (name, price, description, image_url) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, price, description, imageUrl]
    );

    // Transform the data to match frontend expectations
    const product = result.rows[0];
    const transformedProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      imageUrl: product.image_url, // Map image_url to imageUrl for frontend consistency
      createdAt: product.created_at,
    };

    res.status(201).json(transformedProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Server error while creating product" });
  }
});

// Add more routes as needed (UPDATE, DELETE, etc.)

module.exports = router;

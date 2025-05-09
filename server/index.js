// server/index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const productRoutes = require("./routes/productRoutes");

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  })
);
app.use(express.json());
app.use(morgan("dev")); // Logging

// API Routes
app.use("/api/products", productRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "An unexpected error occurred!",
    error:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
  });
});

// Handle undefined routes
app.use("*", (req, res) => {
  res.status(404).json({ message: "Resource not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

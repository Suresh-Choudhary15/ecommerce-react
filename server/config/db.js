// Fix for PostgreSQL connection in db.js or database.js
const { Pool } = require("pg");

// Environment variables should be loaded from a .env file using dotenv
require("dotenv").config();

// Best practice: Use environment variables for sensitive information
const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "ecommerce",
  password: process.env.DB_PASSWORD, // This should be set in .env file
  port: process.env.DB_PORT || 5432,
  ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
});

// Add proper error handling for database connection
pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

// Test database connection on startup
const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log("Successfully connected to PostgreSQL database");
    client.release();
  } catch (err) {
    console.error("Database connection error:", err.message);
  }
};

testConnection();

module.exports = {
  query: (text, params) => pool.query(text, params),
  getPool: () => pool,
};

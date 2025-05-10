// Create a simple test script to check database connection
// Create a new file: server/test-db.js
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const { Pool } = require("pg");

console.log("Environment variables:");
console.log({
  DB_USER: process.env.DB_USER,
  DB_HOST: process.env.DB_HOST,
  DB_NAME: process.env.DB_NAME,
  DB_PASSWORD: "REDACTED",
  DB_PORT: process.env.DB_PORT,
  DB_SSL: process.env.DB_SSL,
});

const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "ecommerce",
  password: process.env.DB_PASSWORD, // Make sure this is set in .env
  port: process.env.DB_PORT || 5432,
  ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
});

async function testConnection() {
  try {
    console.log("Attempting to connect to database...");
    const client = await pool.connect();
    console.log("Database connection successful!");

    const result = await client.query("SELECT NOW() as current_time");
    console.log("Query result:", result.rows[0]);

    client.release();

    // Test if the products table exists
    try {
      const tableCheck = await pool.query(`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public'
          AND table_name = 'products'
        );
      `);
      console.log("Products table exists:", tableCheck.rows[0].exists);
    } catch (err) {
      console.error("Error checking products table:", err.message);
    }
  } catch (err) {
    console.error("Database connection error:", err);

    // Check common issues
    if (err.message.includes("password authentication failed")) {
      console.error("HINT: Your password in .env is incorrect");
    } else if (err.message.includes("does not exist")) {
      console.error("HINT: The database does not exist. Create it first:");
      console.error('  psql -U postgres -c "CREATE DATABASE ecommerce;"');
    } else if (err.message.includes("SASL")) {
      console.error(
        "HINT: The password is not properly set. Check your .env file"
      );
      console.error(
        `  The DB_PASSWORD environment variable is ${
          process.env.DB_PASSWORD ? "set" : "NOT SET"
        }`
      );
      console.error(
        "  Make sure .env file is in the correct location (server root directory)"
      );
    }
  } finally {
    // Close the pool
    await pool.end();
  }
}

testConnection();

// Run this script with: node test-db.js

// Common fixes:
// 1. Make sure your .env file is in the correct location (root of server directory)
// 2. Make sure PostgreSQL is actually running
// 3. Check if the database exists:
//    - Connect to PostgreSQL: psql -U postgres
//    - List databases: \l
//    - Create database if needed: CREATE DATABASE ecommerce;
// 4. Make sure you've set DB_PASSWORD correctly in .env
//    - It should be plain text with no quotes unless your password contains special characters

// Server/db.js
const { Pool } = require("pg");
require("dotenv").config();

// Use environment variables for database connection
const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "ecommerce",
  password: process.env.DB_PASSWORD || "password",
  port: process.env.DB_PORT || 5432,
});

// Test database connection
pool.connect((err, client, done) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected to the database successfully");
    done();
  }
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};

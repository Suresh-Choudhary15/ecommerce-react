// server/models/Product.js
const { Pool } = require("pg");
const config = require("../config/database");

const pool = new Pool(config);

class Product {
  /**
   * Create a new product
   * @param {Object} product - Product object with name, price, description, and image_url
   * @returns {Promise<Object>} - Created product
   */
  static async create(product) {
    const { name, price, description, image_url } = product;

    try {
      const result = await pool.query(
        "INSERT INTO products (name, price, description, image_url) VALUES ($1, $2, $3, $4) RETURNING *",
        [name, price, description, image_url]
      );

      return result.rows[0];
    } catch (error) {
      throw new Error(`Error creating product: ${error.message}`);
    }
  }

  /**
   * Get all products
   * @returns {Promise<Array>} - Array of products
   */
  static async findAll() {
    try {
      const result = await pool.query(
        "SELECT * FROM products ORDER BY created_at DESC"
      );
      return result.rows;
    } catch (error) {
      throw new Error(`Error fetching products: ${error.message}`);
    }
  }

  /**
   * Get product by ID
   * @param {number} id - Product ID
   * @returns {Promise<Object>} - Product object
   */
  static async findById(id) {
    try {
      const result = await pool.query("SELECT * FROM products WHERE id = $1", [
        id,
      ]);

      if (result.rows.length === 0) {
        return null;
      }

      return result.rows[0];
    } catch (error) {
      throw new Error(`Error fetching product: ${error.message}`);
    }
  }

  /**
   * Update an existing product
   * @param {number} id - Product ID
   * @param {Object} product - Updated product data
   * @returns {Promise<Object>} - Updated product
   */
  static async update(id, product) {
    const { name, price, description, image_url } = product;

    try {
      const result = await pool.query(
        "UPDATE products SET name = $1, price = $2, description = $3, image_url = $4 WHERE id = $5 RETURNING *",
        [name, price, description, image_url, id]
      );

      if (result.rows.length === 0) {
        return null;
      }

      return result.rows[0];
    } catch (error) {
      throw new Error(`Error updating product: ${error.message}`);
    }
  }

  /**
   * Delete a product
   * @param {number} id - Product ID
   * @returns {Promise<boolean>} - Success status
   */
  static async delete(id) {
    try {
      const result = await pool.query(
        "DELETE FROM products WHERE id = $1 RETURNING id",
        [id]
      );

      if (result.rows.length === 0) {
        return false;
      }

      return true;
    } catch (error) {
      throw new Error(`Error deleting product: ${error.message}`);
    }
  }

  /**
   * Search products by keyword in name or description
   * @param {string} query - Search query
   * @returns {Promise<Array>} - Array of matching products
   */
  static async search(query) {
    try {
      // Basic search implementation
      const result = await pool.query(
        "SELECT * FROM products WHERE name ILIKE $1 OR description ILIKE $1 ORDER BY name",
        [`%${query}%`]
      );

      return result.rows;
    } catch (error) {
      throw new Error(`Error searching products: ${error.message}`);
    }
  }

  /**
   * Advanced semantic search using PostgreSQL full-text search capabilities
   * @param {string} query - Search query
   * @returns {Promise<Array>} - Array of matching products
   */
  static async advancedSearch(query) {
    try {
      // Using PostgreSQL's full-text search capabilities
      const result = await pool.query(
        `SELECT id, name, price, description, image_url, created_at, updated_at,
        ts_rank(to_tsvector('english', name || ' ' || description), plainto_tsquery('english', $1)) as rank
        FROM products
        WHERE to_tsvector('english', name || ' ' || description) @@ plainto_tsquery('english', $1)
        ORDER BY rank DESC`,
        [query]
      );

      return result.rows;
    } catch (error) {
      throw new Error(`Error performing advanced search: ${error.message}`);
    }
  }
}

module.exports = Product;

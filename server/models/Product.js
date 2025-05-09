const pool = require("../config/db");

class Product {
  static async create({ name, price, description, imageUrl }) {
    const query = `
      INSERT INTO products (name, price, description, image_url)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [name, price, description, imageUrl || null];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async getAll() {
    const query = "SELECT * FROM products ORDER BY created_at DESC;";
    const { rows } = await pool.query(query);
    return rows;
  }

  static async search(queryText) {
    const query = `
      SELECT * FROM products 
      WHERE to_tsvector('english', name || ' ' || description) @@ to_tsquery('english', $1)
      ORDER BY created_at DESC;
    `;
    const { rows } = await pool.query(query, [
      queryText.split(" ").join(" & ") + ":*",
    ]);
    return rows;
  }
}

module.exports = Product;

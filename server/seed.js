const products = require("./products.json");
const pool = require("./config/db");

async function seedDatabase() {
  try {
    await pool.query("TRUNCATE TABLE products RESTART IDENTITY");

    for (const product of products) {
      await pool.query(
        `INSERT INTO products (name, price, description, image_url) 
         VALUES ($1, $2, $3, $4)`,
        [product.name, product.price, product.description, product.image_url]
      );
    }
    console.log("Database seeded successfully!");
  } catch (err) {
    console.error("Seeding failed:", err);
  } finally {
    pool.end();
  }
}

seedDatabase();

-- Products Table
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Optional: Create index for faster text search
CREATE INDEX idx_products_name ON products(name);
CREATE INDEX idx_products_description ON products(description);

-- Optional: Function to update timestamp
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Optional: Trigger to update timestamp on product update
CREATE TRIGGER update_products_modtime
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

-- Optional: Create a view for basic search
CREATE VIEW product_search AS
SELECT 
  id,
  name,
  price,
  description,
  image_url,
  to_tsvector('english', name || ' ' || description) as search_vector
FROM products;

-- Optional: Create index for faster full-text search if needed
CREATE INDEX idx_products_search ON product_search USING GIN(search_vector);
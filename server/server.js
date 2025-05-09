const express = require("express");
const cors = require("cors");
const productsRouter = require("./routes/products");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enhanced CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use("/api/products", productsRouter);

app.get("/", (req, res) => {
  res.send("Luxury Goods API is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

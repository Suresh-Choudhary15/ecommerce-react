import React, { useState } from "react";

const ProductCard = ({ product }) => {
  // Get properties from product with fallbacks for field name variations
  const { name, price, description } = product;
  const imageUrl = product.imageUrl || product.image_url || "";

  // Default image for fallback
  const defaultImage = "https://via.placeholder.com/300?text=No+Image";

  // State to track image loading status
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <div className="h-48 overflow-hidden bg-gray-200 relative">
        {/* Image with error handling */}
        <img
          src={!imageError && imageUrl ? imageUrl : defaultImage}
          alt={name}
          className="w-full h-full object-cover"
          onError={() => {
            console.log("Image failed to load:", imageUrl);
            setImageError(true);
          }}
        />

        {/* Show debug info on hover in development */}
        {process.env.NODE_ENV === "development" && (
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 opacity-0 hover:opacity-100">
            {imageUrl || "No image URL"}
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            {name}
          </h3>
          <span className="font-bold text-blue-600">
            ${Number(price).toFixed(2)}
          </span>
        </div>
        <p className="text-gray-600 text-sm line-clamp-3">{description}</p>
      </div>
    </div>
  );
};

export default ProductCard;

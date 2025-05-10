// client/src/components/ProductCard.jsx
import React from "react";

const ProductCard = ({ product, onDelete }) => {
  const { id, name, price, description, image_url } = product;

  // Default image if none provided
  const imageUrl =
    image_url && image_url.trim() !== ""
      ? image_url
      : "https://via.placeholder.com/300x200?text=No+Image";

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Product Image */}
      <div className="h-48 w-full overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://via.placeholder.com/300x200?text=Image+Error";
          }}
        />
      </div>

      {/* Product Details */}
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1 text-gray-800">{name}</h3>
        <p className="text-green-600 font-medium text-lg mb-2">
          ${parseFloat(price).toFixed(2)}
        </p>

        {description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {description}
          </p>
        )}

        {/* Action Button */}
        <div className="mt-auto">
          <button
            onClick={() => onDelete(id)}
            className="text-sm text-red-600 hover:text-red-800 focus:outline-none"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

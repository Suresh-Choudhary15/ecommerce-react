import { FiShoppingCart } from "react-icons/fi";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative pb-2/3 h-48 bg-gray-100 overflow-hidden">
        {product.image_url ? (
          <img
            className="absolute h-full w-full object-cover"
            src={product.image_url}
            alt={product.name}
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/300x200?text=No+Image";
            }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
            <FiShoppingCart className="h-12 w-12 text-gray-400" />
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium text-gray-900 truncate">
            {product.name}
          </h3>
          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            ${parseFloat(product.price).toFixed(2)}
          </span>
        </div>
        <p className="mt-1 text-sm text-gray-500 line-clamp-2">
          {product.description}
        </p>
        <div className="mt-3 flex items-center text-sm text-gray-500">
          <span>
            Added: {new Date(product.created_at).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

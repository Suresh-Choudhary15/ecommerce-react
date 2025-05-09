import { FiPackage, FiPlus } from "react-icons/fi";

const EmptyState = ({ setActiveTab }) => {
  return (
    <div className="text-center py-12">
      <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <FiPackage className="text-gray-400 text-3xl" />
      </div>
      <h3 className="text-lg font-medium text-gray-500">No products found</h3>
      <p className="text-gray-400 mt-1 mb-6">
        Add your first product to get started
      </p>
      <button
        onClick={() => setActiveTab("submit")}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >
        <FiPlus className="mr-2" /> Add Product
      </button>
    </div>
  );
};

export default EmptyState;

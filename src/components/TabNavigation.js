import { FiUpload, FiGrid } from "react-icons/fi";

const TabNavigation = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex border-b border-gray-200 mb-8">
      <button
        onClick={() => setActiveTab("submit")}
        className={`px-6 py-3 font-medium text-sm rounded-t-lg transition-all flex items-center gap-2
          ${
            activeTab === "submit"
              ? "bg-white border-t border-l border-r border-gray-200 text-primary-600 shadow-sm"
              : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
          }`}
      >
        <FiUpload className="text-lg" />
        Product Submission
      </button>
      <button
        onClick={() => setActiveTab("view")}
        className={`px-6 py-3 font-medium text-sm rounded-t-lg transition-all flex items-center gap-2
          ${
            activeTab === "view"
              ? "bg-white border-t border-l border-r border-gray-200 text-primary-600 shadow-sm"
              : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
          }`}
      >
        <FiGrid className="text-lg" />
        Product Gallery
      </button>
    </div>
  );
};

export default TabNavigation;

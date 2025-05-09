import { FiSearch, FiFilter } from "react-icons/fi";

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="relative max-w-2xl mx-auto mb-8">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FiSearch className="text-gray-400 text-lg" />
      </div>
      <input
        type="text"
        placeholder="Search products (name or description)..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 border-l border-gray-200 pl-2">
        <FiFilter className="text-gray-400 mr-2" />
        <select className="text-xs border-none focus:ring-0 bg-transparent text-gray-500">
          <option>All</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Newest</option>
        </select>
      </div>
    </div>
  );
};

export default SearchBar;

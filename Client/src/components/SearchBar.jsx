// client/src/components/SearchBar.jsx
import React, { useState, useEffect } from "react";

const SearchBar = ({
  onSearch,
  searchQuery,
  useAdvancedSearch,
  onSearchTypeChange,
}) => {
  const [localQuery, setLocalQuery] = useState(searchQuery || "");

  // Update local state when prop changes
  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocalQuery(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(localQuery);
  };

  // Debounce search as user types
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localQuery !== searchQuery) {
        onSearch(localQuery);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [localQuery, onSearch, searchQuery]);

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search products..."
            value={localQuery}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
          {localQuery && (
            <button
              type="button"
              onClick={() => {
                setLocalQuery("");
                onSearch("");
              }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          )}
        </div>

        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Search
        </button>
      </form>

      {/* Advanced Search Toggle */}
      <div className="mt-2 flex items-center">
        <input
          type="checkbox"
          id="advanced-search"
          checked={useAdvancedSearch}
          onChange={onSearchTypeChange}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label htmlFor="advanced-search" className="ml-2 text-sm text-gray-600">
          Use smart contextual search
        </label>
      </div>
    </div>
  );
};

export default SearchBar;

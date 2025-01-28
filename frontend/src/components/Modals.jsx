import React, { useState, useEffect } from "react";
import data from "../assets/data"; // Ensure data is correctly imported.

const Modal = ({ isOpen, closeModal }) => {
  if (!isOpen) return null;

  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [filteredData, setFilteredData] = useState(data);

  // Filter and sort the data based on search, filter, and sorting criteria
  useEffect(() => {
    let filtered = data;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply filter criteria (if any)
    if (filter) {
      filtered = filtered.filter((item) => item.category === filter);
    }

    // Apply sorting
    if (sortBy === "name") {
      filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "price") {
      filtered = filtered.sort((a, b) => a.price - b.price);
    }

    setFilteredData(filtered);
  }, [searchQuery, filter, sortBy]);

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 ">
      <div className="bg-white p-2 rounded-lg w-full max-w-2xl ">
        <h2 className="text-2xl font-semibold mb-6 text-center">Product Search</h2>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filters and Sorting */}
        <div className="flex flex-col sm:flex-row sm:space-x-4 mb-6">
          {/* Filter by Category */}
          <div className="flex-1 mb-4 sm:mb-0">
            <label className="block mb-2 text-sm">Filter by Category:</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Food">Food</option>
            </select>
          </div>

          {/* Sorting */}
          <div className="flex-1">
            <label className="block mb-2 text-sm">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="name">Name</option>
              <option value="price">Price</option>
            </select>
          </div>
        </div>

        {/* Display filtered and sorted data */}
        <div className="mt-4  p-2 ">
          {filteredData.length > 0 ? (
            <ul className="space-y-4">
              {filteredData.map((item) => (
                <li
                  key={item.id}
                  className="border p-4 rounded-lg shadow-sm hover:shadow-md transition duration-200"
                >
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500">Category: {item.category}</p>
                  <p className="text-sm text-gray-500">Price: ${item.price}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500">No products found</p>
          )}
        </div>

        {/* Close Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={closeModal}
            className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
          >
            Close 
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

import React, { useState, useEffect } from "react";
import data from "../assets/data";
import { FaTh, FaList } from "react-icons/fa"; // Importing icons from React Icons

export default function SearchList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [filteredData, setFilteredData] = useState(data);
  const [viewMode, setViewMode] = useState("block"); // Default to block view

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

  // Toggle between List and Block view
  const toggleView = () => {
    setViewMode(viewMode === "block" ? "list" : "block");
  };

  return (
    <div className="min-h-screen py-12 mt-12">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-2xl">
        <h2 className="text-4xl font-semibold mb-6 text-center text-gray-800">
          Discover Properties
        </h2>

        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search for properties..."
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 transition-all duration-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filters and Sorting */}
        <div className="flex flex-col sm:flex-row sm:space-x-8 mb-8">
          {/* Filter by Category */}
          <div className="flex-1 mb-4 sm:mb-0">
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Category
            </label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
            >
              <option value="">All Categories</option>
              <option value="Villa" className="bg-gray-200">Villa</option>
              <option value="Apartment">Apartment</option>
              <option value="Plot">Plot</option>
            </select>
          </div>

          {/* Sorting */}
          <div className="flex-1">
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
            >
              <option value="name">Name</option>
              <option value="price">Price</option>
            </select>
          </div>
        </div>

        {/* Toggle View Button with Icons */}
        <div className="mb-6 flex justify-end">
          <button
            onClick={toggleView}
            className="p-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-all duration-300"
          >
            {viewMode === "block" ? (
              <FaList className="text-xl" /> // List icon
            ) : (
              <FaTh className="text-xl" /> // Block/Grid icon
            )}
          </button>
        </div>

        {/* Display filtered and sorted data */}
        <div className="mt-4">
          {filteredData.length > 0 ? (
            <ul
              className={`${
                viewMode === "block"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                  : "space-y-6"
              }`}
            >
              {filteredData.map((item) => (
                <li
                  key={item.id}
                  className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200"
                >
                  {/* Property Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover rounded-xl mb-6"
                  />

                  <h3 className="text-xl font-semibold text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">{item.details}</p>
                  <p className="text-sm text-gray-600 mb-2">
                    Type: {item.type}
                  </p>
                  <p className="text-lg font-semibold text-gray-600 mb-2">
                    Price: {item.price}
                  </p>
                  <p className="text-sm text-gray-500 mb-3">EMI: {item.emi}</p>
                  <p className="text-sm text-gray-500 mb-3">
                    Price per sqft: {item.pricePerSqft}
                  </p>
                  <p className="text-sm text-gray-500 mb-3">
                    Address: {item.address}
                  </p>
                  <div className="flex items-center text-sm text-yellow-500">
                    <span className="mr-1">⭐</span>
                    <span>
                      {item.rating} ({item.reviews} reviews)
                    </span>
                  </div>

                  <button className="mt-4 bg-gray-600 text-white p-3 rounded-xl w-full hover:bg-gray-700 transition-all duration-300">
                    View Details
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500">No properties found</p>
          )}
        </div>
      </div>
    </div>
  );
}

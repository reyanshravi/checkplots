import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { VscSearch } from "react-icons/vsc";
import { BsList, BsGrid3X3Gap } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";

const SearchList = () => {
  const location = useLocation();
  const history = useNavigate();

  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [viewType, setViewType] = useState("grid"); // Grid/List view toggle
  const [sortOption, setSortOption] = useState("priceLowToHigh"); // Default sort option
  const [page, setPage] = useState(1); // Pagination
  const [itemsPerPage] = useState(6); // Number of items per page

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    const filterData = {
      domainName: queryParams.get("domainName") || "",
      selectedLocation: queryParams.get("selectedLocation") || "US",
      priceRange: queryParams.get("priceRange") || 0,
      minBedrooms: queryParams.get("minBedrooms") || "",
      maxBedrooms: queryParams.get("maxBedrooms") || "",
      propertyType: queryParams.get("propertyType") || "",
    };

    setFilters(filterData);

    // Simulate fetching results (replace with API call)
    setTimeout(() => {
      const allResults = [
        {
          id: 1,
          name: "Luxury Villa in California",
          price: 5000000,
          location: "US",
          propertyType: "Villa",
          bedrooms: 4,
        },
        {
          id: 2,
          name: "Modern Flat in London",
          price: 2500000,
          location: "UK",
          propertyType: "Flat",
          bedrooms: 2,
        },
        {
          id: 3,
          name: "Cozy Apartment in New York",
          price: 3000000,
          location: "US",
          propertyType: "Flat",
          bedrooms: 2,
        },
        {
          id: 4,
          name: "Beachfront Villa in Bali",
          price: 7000000,
          location: "Indonesia",
          propertyType: "Villa",
          bedrooms: 5,
        },
        {
          id: 5,
          name: "City Center Apartment in Tokyo",
          price: 4000000,
          location: "Japan",
          propertyType: "Flat",
          bedrooms: 3,
        },
        {
          id: 6,
          name: "Penthouse in Dubai",
          price: 12000000,
          location: "UAE",
          propertyType: "Apartment",
          bedrooms: 3,
        },
        {
          id: 7,
          name: "Spacious House in Los Angeles",
          price: 9000000,
          location: "US",
          propertyType: "House",
          bedrooms: 6,
        },
        {
          id: 8,
          name: "Studio in Paris",
          price: 1500000,
          location: "France",
          propertyType: "Apartment",
          bedrooms: 1,
        },
        {
          id: 9,
          name: "Mansion in New York",
          price: 15000000,
          location: "US",
          propertyType: "Villa",
          bedrooms: 7,
        },
        {
          id: 10,
          name: "Modern Loft in San Francisco",
          price: 3500000,
          location: "US",
          propertyType: "Loft",
          bedrooms: 3,
        },
      ];

      // Sorting logic based on selected sortOption
      const sortedResults = [...allResults].sort((a, b) => {
        switch (sortOption) {
          case "priceLowToHigh":
            return a.price - b.price;
          case "priceHighToLow":
            return b.price - a.price;
          case "bedroomsLowToHigh":
            return a.bedrooms - b.bedrooms;
          case "bedroomsHighToLow":
            return b.bedrooms - a.bedrooms;
          default:
            return a.price - b.price;
        }
      });

      // Pagination logic: Calculate the page's results
      const startIdx = (page - 1) * itemsPerPage;
      const paginatedResults = sortedResults.slice(
        startIdx,
        startIdx + itemsPerPage
      );

      setResults(paginatedResults);
      setLoading(false);
    }, 1500);
  }, [location.search, page, sortOption]);

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleViewChange = (view) => {
    setViewType(view);
  };

  const handleClearFilters = () => {
    history.push("/search"); // Reset all query params by navigating to a clean search route
    setFilters({});
  };
  const handleRemoveFilter = (filterName) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      delete newFilters[filterName];
      return newFilters;
    });
  };

  return (
    <div className="container mx-auto p-8 sm:p-12 lg:p-16 bg-white rounded-lg shadow-lg max-w-6xl mt-20">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Search Results</h1>

        <div className="flex items-center space-x-4">
          {/* View Option (Grid/List) */}
          <button
            onClick={() => handleViewChange("grid")}
            className={`p-2 rounded-lg ${
              viewType === "grid" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            <BsGrid3X3Gap size={20} />
          </button>
          <button
            onClick={() => handleViewChange("list")}
            className={`p-2 rounded-lg ${
              viewType === "list" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            <BsList size={20} />
          </button>

          {/* Clear Filters Button */}
          <button
            onClick={handleClearFilters}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Filters Applied Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Filters Applied:
        </h2>

        <div className="flex flex-wrap gap-3 text-gray-700">
          {/* Domain Name Filter */}
          {filters.domainName && (
            <div className="flex items-center bg-gray-100 p-3 rounded-lg space-x-2">
              <p className="font-medium text-sm">
                Domain Name:{" "}
                <span className="text-gray-600">{filters.domainName}</span>
              </p>
              <button
                onClick={() => handleRemoveFilter("domainName")}
                className="text-red-600 hover:text-red-800 transition-colors"
              >
                <IoCloseSharp size={20} />
              </button>
            </div>
          )}

          {/* Location Filter */}
          {filters.selectedLocation && (
            <div className="flex items-center bg-gray-100 p-3 rounded-lg space-x-2">
              <p className="font-medium text-sm">
                Location:{" "}
                <span className="text-gray-600">
                  {filters.selectedLocation}
                </span>
              </p>
              <button
                onClick={() => handleRemoveFilter("selectedLocation")}
                className="text-red-600 hover:text-red-800 transition-colors"
              >
                <IoCloseSharp size={20} />
              </button>
            </div>
          )}

          {/* Price Range Filter */}
          {filters.priceRange && (
            <div className="flex items-center bg-gray-100 p-3 rounded-lg space-x-2">
              <p className="font-medium text-sm">
                Price Range:{" "}
                <span className="text-gray-600">₹{filters.priceRange}</span>
              </p>
              <button
                onClick={() => handleRemoveFilter("priceRange")}
                className="text-red-600 hover:text-red-800 transition-colors"
              >
                <IoCloseSharp size={20} />
              </button>
            </div>
          )}

          {/* Bedrooms Filter */}
          {filters.minBedrooms && filters.maxBedrooms && (
            <div className="flex items-center bg-gray-100 p-3 rounded-lg space-x-2">
              <p className="font-medium text-sm">
                Bedrooms:{" "}
                <span className="text-gray-600">
                  {filters.minBedrooms} - {filters.maxBedrooms}
                </span>
              </p>
              <button
                onClick={() => handleRemoveFilter("minBedrooms")}
                className="text-red-600 hover:text-red-800 transition-colors"
              >
                <IoCloseSharp size={20} />
              </button>
            </div>
          )}

          {/* Property Type Filter */}
          {filters.propertyType && (
            <div className="flex items-center bg-gray-100 p-3 rounded-lg space-x-2">
              <p className="font-medium text-sm">
                Property Type:{" "}
                <span className="text-gray-600">{filters.propertyType}</span>
              </p>
              <button
                onClick={() => handleRemoveFilter("propertyType")}
                className="text-red-600 hover:text-red-800 transition-colors"
              >
                <IoCloseSharp size={20} />
              </button>
            </div>
          )}
        </div>

        {/* Clear All Filters Button */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleClearFilters}
            className="text-gray-600 hover:text-gray-800 transition-colors font-semibold"
          >
            <strong>Clear All Filters</strong>
          </button>
        </div>
      </div>

      {/* Sort Option */}
      <div className="mb-6 flex justify-end items-center">
        <label htmlFor="sort" className="mr-2 text-gray-700">
          Sort By:
        </label>
        <select
          id="sort"
          value={sortOption}
          onChange={handleSortChange}
          className="p-2 border rounded-lg bg-white"
        >
          <option value="priceLowToHigh">Price: Low to High</option>
          <option value="priceHighToLow">Price: High to Low</option>
          <option value="bedroomsLowToHigh">Bedrooms: Low to High</option>
          <option value="bedroomsHighToLow">Bedrooms: High to Low</option>
        </select>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center py-16">
          <div className="w-16 h-16 border-t-4 border-gray-600 border-solid rounded-full animate-spin"></div>
          <div className="mt-4 text-lg text-gray-700">Loading results...</div>
        </div>
      ) : (
        <>
          {/* Results Section */}
          <div
            className={`grid ${
              viewType === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1"
            } gap-8`}
          >
            {results.length > 0 ? (
              results.map((result) => (
                <div
                  key={result.id}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
                >
                  <img
                    src="https://via.placeholder.com/300x200"
                    alt="property"
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {result.name}
                    </h3>
                    <span className="text-lg font-semibold text-gray-700">
                      ₹{result.price}
                    </span>
                  </div>
                  <div className="text-gray-600">
                    <p>
                      <strong>Location:</strong> {result.location}
                    </p>
                    <p>
                      <strong>Bedrooms:</strong> {result.bedrooms}
                    </p>
                    <p>
                      <strong>Property Type:</strong> {result.propertyType}
                    </p>
                  </div>
                  <button className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg mt-4 hover:bg-blue-700 transition-colors duration-300">
                    View Details
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-600 col-span-full text-center">
                No results found for the selected filters.
              </p>
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center space-x-4 mt-8">
            <button
              onClick={() => handlePageChange(page - 1)}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors"
              disabled={page === 1}
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(page + 1)}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors"
              disabled={results.length < itemsPerPage}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchList;

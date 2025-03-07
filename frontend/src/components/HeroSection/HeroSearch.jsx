import React, { useState, useCallback } from "react";
import { RiMapPin2Line } from "react-icons/ri";
import { VscSettings } from "react-icons/vsc";

export default function Herosearch() {
  const [filters, setFilters] = useState({
    type: "rent",
    property: "plot",
    category: "commercial",
    location: "",
    priceRange: "0-10000",
    bedrooms: 1,
    rating: 0,
  });
  const [showAdditionalFilters, setShowAdditionalFilters] = useState(false);

  const handleFilterChange = useCallback((key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  }, []);

  const handleSearch = () => {
    console.log("Searching with filters:", filters);
  };

  const cities = ["Patna", "Delhi", "Lucknow", "Kolkata"];

  return (
    <div className="bg-black text-white bg-opacity-30 backdrop-blur-sm border border-white border-opacity-20 rounded-lg p-8 max-w-4xl w-full mx-auto">
      <div className="space-y-6">
        {/* Filter Row */}
        <div className="flex flex-wrap items-center justify-between space-y-4 sm:space-y-0 sm:flex-row sm:space-x-4 divide-x">
          <div className="w-full sm:w-auto mb-4 sm:mb-0">
            {["rent", "buy"].map((type) => (
              <button
                key={type}
                onClick={() => handleFilterChange("type", type)}
                className={`py-2 px-4 transition-all duration-300 ${
                  filters.type === type
                    ? "underline-offset-8 underline text-white"
                    : "text-gray-300"
                } hover:underline underline-offset-8`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          <div className="w-full sm:w-auto mb-4 sm:mb-0">
            {["plot", "flat"].map((property) => (
              <button
                key={property}
                onClick={() => handleFilterChange("property", property)}
                className={`py-2 px-4 transition-all duration-300 ${
                  filters.property === property
                    ? "underline-offset-8 underline text-white"
                    : "text-gray-300"
                } hover:underline underline-offset-8`}
              >
                {property.charAt(0).toUpperCase() + property.slice(1)}
              </button>
            ))}
          </div>

          <div className="w-full sm:w-auto">
            {["commercial", "residential"].map((category) => (
              <button
                key={category}
                onClick={() => handleFilterChange("category", category)}
                className={`py-2 px-4 transition-all duration-300 ${
                  filters.category === category
                    ? "underline-offset-8 underline text-white"
                    : "text-gray-300"
                } hover:underline underline-offset-8`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap justify-between items-center space-y-4 sm:space-y-0 sm:flex-row">
          <div className="flex flex-wrap items-center space-x-4 bg-white text-black rounded-full px-4 py-2 w-full sm:w-auto">
            <div className="flex items-center space-x-4 w-full sm:w-auto">
              {/* Location Icon */}
              <RiMapPin2Line className="text-black text-xl" />

              {/* Dropdown */}
              <select
                name="city"
                className="py-2 px-4 rounded-full text-black transition-all duration-300 outline-none w-full sm:w-auto"
                onChange={(e) => handleFilterChange("location", e.target.value)}
                value={filters.location}
              >
                <option
                  value=""
                  className="py-2 px-4 rounded-full bg-black bg-opacity-50 transition-all duration-300"
                >
                  Select Location
                </option>
                {cities.map((city) => (
                  <option
                    key={city}
                    value={city.toLowerCase()}
                    className="py-2 px-4 rounded-full text-black bg-opacity-50 transition-all duration-300"
                  >
                    {city}
                  </option>
                ))}
              </select>

              {/* Display selected city */}
              {filters.location && (
                <span className="text-black text-lg">
                  {filters.location.charAt(0).toUpperCase() +
                    filters.location.slice(1)}
                </span>
              )}
            </div>

            <div className="w-full sm:w-auto mt-4 sm:mt-0">
              <input
                type="search"
                placeholder="Search..."
                className="py-2 px-4 rounded-full text-black transition-all w-full sm:w-96 duration-300 bg-white outline-none"
                onChange={(e) => handleFilterChange("location", e.target.value)}
              />
            </div>

            <div className="flex space-x-4 items-center mt-4 sm:mt-0">
              {/* Filter Button */}
              <button
                onClick={() => setShowAdditionalFilters(!showAdditionalFilters)}
                className="border flex items-center py-2 px-4 bg-transparent rounded-full text-black transition-all duration-300 hover:bg-white hover:bg-opacity-20"
              >
                <VscSettings className="mr-2" />
                Filter
              </button>

              {/* Search Button */}
              <button
                onClick={handleSearch}
                className="py-2 px-6 rounded-full text-white bg-black"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {showAdditionalFilters && (
          <div className="space-y-4 mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Price Range Select */}
              <div className="flex flex-col space-y-2">
                <select
                  name="priceRange"
                  className="py-2 px-4 rounded-full text-white transition-all duration-300 bg-white bg-opacity-20 outline-none"
                  onChange={(e) =>
                    handleFilterChange("priceRange", e.target.value)
                  }
                  value={filters.priceRange}
                >
                  <option
                    value="0-10000"
                    className="py-2 px-4 rounded-full text-white transition-all duration-300 bg-black bg-opacity-50"
                  >
                    ₹0 - ₹10,000
                  </option>
                  <option
                    value="10000-50000"
                    className="py-2 px-4 rounded-full text-white transition-all duration-300 bg-black bg-opacity-50"
                  >
                    ₹10,000 - ₹50,000
                  </option>
                  <option
                    value="50000-100000"
                    className="py-2 px-4 rounded-full text-white transition-all duration-300 bg-black bg-opacity-50"
                  >
                    ₹50,000 - ₹1,00,000
                  </option>
                  <option
                    value="100000+"
                    className="py-2 px-4 rounded-full text-white transition-all duration-300 bg-black bg-opacity-50"
                  >
                    ₹1,00,000+
                  </option>
                </select>
              </div>

              {/* Bedrooms Select */}
              <div className="flex flex-col space-y-2">
                <select
                  name="bedrooms"
                  className="py-2 px-4 rounded-full text-white transition-all duration-300 bg-white bg-opacity-20 outline-none"
                  onChange={(e) =>
                    handleFilterChange("bedrooms", e.target.value)
                  }
                  value={filters.bedrooms}
                >
                  <option
                    value={1}
                    className="py-2 px-4 rounded-full text-white transition-all w-96 duration-300 bg-black bg-opacity-50"
                  >
                    1 Bedroom
                  </option>
                  <option
                    value={2}
                    className="py-2 px-4 rounded-full text-white transition-all w-96 duration-300 bg-black bg-opacity-50"
                  >
                    2 Bedrooms
                  </option>
                  <option
                    value={3}
                    className="py-2 px-4 rounded-full text-white transition-all w-96 duration-300 bg-black bg-opacity-50"
                  >
                    3 Bedrooms
                  </option>
                  <option
                    value={4}
                    className="py-2 px-4 rounded-full text-white transition-all w-96 duration-300 bg-black bg-opacity-50"
                  >
                    4 Bedrooms
                  </option>
                  <option
                    value={5}
                    className="py-2 px-4 rounded-full text-white transition-all w-96 duration-300 bg-black bg-opacity-50"
                  >
                    5+ Bedrooms
                  </option>
                </select>
              </div>

              {/* Rating Select */}
              <div className="flex flex-col space-y-2">
                <select
                  name="rating"
                  className="py-2 px-4 rounded-full text-white transition-all duration-300 bg-white bg-opacity-20 outline-none"
                  onChange={(e) => handleFilterChange("rating", e.target.value)}
                  value={filters.rating}
                >
                  <option
                    value={0}
                    className="py-2 px-4 rounded-full text-white transition-all w-96 duration-300 bg-black bg-opacity-50"
                  >
                    Rating
                  </option>
                  <option
                    value={1}
                    className="py-2 px-4 rounded-full text-white transition-all w-96 duration-300 bg-black bg-opacity-50"
                  >
                    1 Star
                  </option>
                  <option
                    value={2}
                    className="py-2 px-4 rounded-full text-white transition-all w-96 duration-300 bg-black bg-opacity-50"
                  >
                    2 Stars
                  </option>
                  <option
                    value={3}
                    className="py-2 px-4 rounded-full text-white transition-all w-96 duration-300 bg-black bg-opacity-50"
                  >
                    3 Stars
                  </option>
                  <option
                    value={4}
                    className="py-2 px-4 rounded-full text-white transition-all w-96 duration-300 bg-black bg-opacity-50"
                  >
                    4 Stars
                  </option>
                  <option
                    value={5}
                    className="py-2 px-4 rounded-full text-white transition-all w-96 duration-300 bg-black bg-opacity-50"
                  >
                    5 Stars
                  </option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

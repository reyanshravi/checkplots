import React, { useState, useCallback } from "react";

export default function Herosearch() {
  const [filters, setFilters] = useState({
    type: "rent",
    property: "plot",
    category: "commercial",
    location: "",
    priceRange: "0-10000",
    bedrooms: 1,
    rating: 0,
    constructionStatus: "",
    price: 0,
    emi: 0,
    avgPrice: 0,
  });
  const [showAdditionalFilters, setShowAdditionalFilters] = useState(false);

  const handleFilterChange = useCallback((key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  }, []);

  const handleClearAllFilters = () => {
    setFilters({
      type: "rent",
      property: "plot",
      category: "commercial",
      location: "",
      priceRange: "0-10000",
      bedrooms: 1,
      rating: 0,
      constructionStatus: "",
      price: 0,
      emi: 0,
      avgPrice: 0,
    });
  };

  const handleApplyFilters = () => {
    alert("Filters applied!");
  };

  const handleSearch = () => {
    console.log(filters);
  };
  return (
    <div className="w-full bg-black text-white bg-opacity-30 backdrop-blur-sm border border-white border-opacity-20 rounded-lg p-8">
      <div className="space-y-6 ">
        {/* Filter Row */}
        <div className="flex flex-wrap space-y-4 sm:space-y-0 sm:flex-row sm:space-x-4 divide-x">
          <div>
            {["rent", "buy"].map((type) => (
              <button
                key={type}
                onClick={() => handleFilterChange("type", type)}
                className={`py-2 px-4 transition-all duration-300 ${
                  filters.type === type
                    ? "underline-offset-8 underline text-white"
                    : " text-gray-300"
                } hover:underline underline-offset-8`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          <div>
            {["plot", "flat"].map((property) => (
              <button
                key={property}
                onClick={() => handleFilterChange("property", property)}
                className={`py-2 px-4 transition-all duration-300 ${
                  filters.property === property
                    ? "underline-offset-8 underline text-white"
                    : " text-gray-300"
                } hover:underline underline-offset-8`}
              >
                {property.charAt(0).toUpperCase() + property.slice(1)}
              </button>
            ))}
          </div>

          <div>
            {["commercial", "residential"].map((category) => (
              <button
                key={category}
                onClick={() => handleFilterChange("category", category)}
                className={`py-2 px-4 transition-all duration-300 ${
                  filters.category === category
                    ? "underline-offset-8 underline text-white"
                    : " text-gray-300"
                } hover:underline underline-offset-8`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center space-y-4 sm:space-y-0 sm:flex-row mt-6">
          <div className="flex w-full justify-between items-center space-x-4">
            <div className="flex flex-col space-y-2">
              <select
                name="city"
                className="py-2 px-4 rounded-full text-white transition-all duration-300 bg-white bg-opacity-20 outline-none "
                onChange={(e) => handleFilterChange("location", e.target.value)}
                value={filters.location}
              >
                <option
                  value=""
                  className="py-2 px-4 rounded-full text-white transition-all w-96  duration-300 bg-black bg-opacity-50"
                >
                  Select Location
                </option>
                <option
                  value="patna"
                  className="py-2 px-4 rounded-full text-white transition-all w-96  duration-300 bg-black bg-opacity-50"
                >
                  Patna
                </option>
                <option
                  value="delhi"
                  className="py-2 px-4 rounded-full text-white transition-all w-96  duration-300 bg-black bg-opacity-50"
                >
                  Delhi
                </option>
                <option
                  value="lucknow"
                  className="py-2 px-4 rounded-full text-white transition-all w-96  duration-300 bg-black bg-opacity-50"
                >
                  Lucknow
                </option>
                <option
                  value="kolkata"
                  className="py-2 px-4 rounded-full text-white transition-all w-96  duration-300 bg-black bg-opacity-50"
                >
                  Kolkata
                </option>
              </select>
            </div>

            <div>
              <input
                type="search"
                placeholder="Search..."
                className="py-2 px-4 rounded-full text-white transition-all w-96  duration-300 bg-white bg-opacity-20 outline-none"
                onChange={(e) => handleFilterChange("location", e.target.value)}
              />
            </div>

            <div className="space-x-4">
              <button
                onClick={handleClearAllFilters}
                className="py-2 px-8 bg-red-600 rounded-full text-white transition-all duration-300 hover:bg-red-500 bg-opacity-80"
              >
                Clear
              </button>
              <button
                onClick={handleApplyFilters}
                className="py-2 px-4 bg-transparent rounded-full text-white transition-all duration-300 hover:bg-white hover:bg-opacity-20 "
              >
                Apply Filters
              </button>
              <button
                onClick={() => setShowAdditionalFilters(!showAdditionalFilters)}
                className="py-2 px-4 bg-transparent rounded-full text-white transition-all duration-300 hover:bg-white hover:bg-opacity-20"
              >
                {showAdditionalFilters
                  ? "Hide More Filters"
                  : "Show More Filters"}
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end"></div>

        {showAdditionalFilters && (
          <div className="space-y-4 mt-6  ">
            <div className="flex space-x-4 w-full justify-center">
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
                    className="py-2 px-4 rounded-full text-white transition-all w-96  duration-300 bg-black bg-opacity-50"
                  >
                    ₹0 - ₹10,000
                  </option>
                  <option
                    value="10000-50000"
                    className="py-2 px-4 rounded-full text-white transition-all w-96  duration-300 bg-black bg-opacity-50"
                  >
                    ₹10,000 - ₹50,000
                  </option>
                  <option
                    value="50000-100000"
                    className="py-2 px-4 rounded-full text-white transition-all w-96  duration-300 bg-black bg-opacity-50"
                  >
                    ₹50,000 - ₹1,00,000
                  </option>
                  <option
                    value="100000+"
                    className="py-2 px-4 rounded-full text-white transition-all w-96  duration-300 bg-black bg-opacity-50"
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
                    className="py-2 px-4 rounded-full text-white transition-all w-96  duration-300 bg-black bg-opacity-50"
                  >
                    1 Bedroom
                  </option>
                  <option
                    value={2}
                    className="py-2 px-4 rounded-full text-white transition-all w-96  duration-300 bg-black bg-opacity-50"
                  >
                    2 Bedrooms
                  </option>
                  <option
                    value={3}
                    className="py-2 px-4 rounded-full text-white transition-all w-96  duration-300 bg-black bg-opacity-50"
                  >
                    3 Bedrooms
                  </option>
                  <option
                    value={4}
                    className="py-2 px-4 rounded-full text-white transition-all w-96  duration-300 bg-black bg-opacity-50"
                  >
                    4 Bedrooms
                  </option>
                  <option
                    value={5}
                    className="py-2 px-4 rounded-full text-white transition-all w-96  duration-300 bg-black bg-opacity-50"
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
                    className="py-2 px-4 rounded-full text-white transition-all w-96  duration-300 bg-black bg-opacity-50"
                  >
                    Rating
                  </option>
                  <option
                    value={1}
                    className="py-2 px-4 rounded-full text-white transition-all w-96  duration-300 bg-black bg-opacity-50"
                  >
                    1 Star
                  </option>
                  <option
                    value={2}
                    className="py-2 px-4 rounded-full text-white transition-all w-96  duration-300 bg-black bg-opacity-50"
                  >
                    2 Stars
                  </option>
                  <option
                    value={3}
                    className="py-2 px-4 rounded-full text-white transition-all w-96  duration-300 bg-black bg-opacity-50"
                  >
                    3 Stars
                  </option>
                  <option
                    value={4}
                    className="py-2 px-4 rounded-full text-white transition-all w-96  duration-300 bg-black bg-opacity-50"
                  >
                    4 Stars
                  </option>
                  <option
                    value={5}
                    className="py-2 px-4 rounded-full text-white transition-all w-96  duration-300 bg-black bg-opacity-50"
                  >
                    5 Stars
                  </option>
                </select>
              </div>
            </div>

            {/* Rating and Construction Status */}
            <div className="flex space-x-4 w-full justify-center">
              {/* Construction Status Select */}
              <div className="flex flex-col space-y-2">
                <select
                  name="constructionStatus"
                  className="py-2 px-4 rounded-full text-white transition-all duration-300 bg-white bg-opacity-20 outline-none"
                  onChange={(e) =>
                    handleFilterChange("constructionStatus", e.target.value)
                  }
                  value={filters.constructionStatus}
                >
                  <option value="">Construction Status</option>
                  <option value="under construction">Under Construction</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              {/* Property Type (e.g., BHK, Balcony, etc.) */}

              <div className="flex flex-col space-y-2">
                <select
                  name="propertyType"
                  className="py-2 px-4 rounded-full text-white transition-all duration-300 bg-white bg-opacity-20 outline-none"
                  onChange={(e) => handleFilterChange("type", e.target.value)}
                  value={filters.type}
                >
                  <option
                    value=""
                    className="py-2 px-4 rounded-full text-white transition-all w-96  duration-300 bg-black bg-opacity-50"
                  >
                    Select Property Type
                  </option>
                  <option
                    value="villa"
                    className="py-2 px-4 rounded-full text-white transition-all w-96  duration-300 bg-black bg-opacity-50"
                  >
                    Villa
                  </option>
                  <option
                    value="3bhk"
                    className="py-2 px-4 rounded-full text-white transition-all w-96  duration-300 bg-black bg-opacity-50"
                  >
                    3 BHK
                  </option>
                  <option
                    value="2bhk"
                    className="py-2 px-4 rounded-full text-white transition-all w-96  duration-300 bg-black bg-opacity-50"
                  >
                    2 BHK
                  </option>
                  <option
                    value="flat"
                    className="py-2 px-4 rounded-full text-white transition-all w-96  duration-300 bg-black bg-opacity-50"
                  >
                    Flat
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

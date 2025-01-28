import React, { useState } from "react";
import image from "../assets/hero_image.jpeg";
import { Carousel } from "antd";
import {
  SearchOutlined,
  EnvironmentOutlined,
  HomeOutlined,
  DollarCircleOutlined,
  ApartmentOutlined,
} from "@ant-design/icons";
import { Slider } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";
const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1677ff",
    }}
  />
);
const onSearch = (value, _e, info) => console.log(info?.source, value);

const HeroSection = () => {
  // States for the form
  const [city, setCity] = useState("patna");
  const [propertyType, setPropertyType] = useState("buy");
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [bedrooms, setBedrooms] = useState(1);

  const handleSearch = () => {
    // Logic to handle search functionality
    console.log({ city, propertyType, priceRange, bedrooms });
  };

  const handleClearFilters = () => {
    setCity("patna");
    setPropertyType("buy");
    setPriceRange([0, 1000000]);
    setBedrooms(1);
  };

  return (
    <section
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh", // Full screen height
      }}
      className="relative text-white flex items-center justify-center text-center"
    >
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black opacity-40 z-0"></div>

      <div className="relative z-10 px-4 py-8 w-full max-w-6xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 tracking-tight">
          Find Your Dream Home
        </h2>
        <p className="text-lg sm:text-2xl text-gray-200 mb-8">
          Search properties across the country.
        </p>

        {/* New Search Form with Filters */}
        <div className="w-full bg-black text-white bg-opacity-30 backdrop-blur-sm border border-white border-opacity-20 rounded-lg p-8">
  <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between space-y-8 sm:space-y-0 sm:space-x-6">
    {/* City Dropdown */}
    <div className="flex items-center gap-4 w-full sm:w-1/4">
      <EnvironmentOutlined className="text-white text-2xl" />
      <select
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="w-full bg-transparent text-white text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl px-6 py-3 transition duration-300 ease-in-out hover:bg-opacity-60 shadow-md appearance-none"
      >
        <option value="patna" className="bg-gray-800 hover:bg-gray-700">Patna</option>
        <option value="kolkata" className="bg-gray-800 hover:bg-gray-700">Kolkata</option>
        <option value="lucknow" className="bg-gray-800 hover:bg-gray-700">Lucknow</option>
        <option value="pune" className="bg-gray-800 hover:bg-gray-700">Pune</option>
      </select>
    </div>

    {/* Property Type Dropdown */}
    <div className="flex items-center gap-4 w-full sm:w-1/4">
      <HomeOutlined className="text-white text-2xl" />
      <select
        value={propertyType}
        onChange={(e) => setPropertyType(e.target.value)}
        className="w-full bg-transparent text-white text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl px-6 py-3 transition duration-300 ease-in-out hover:bg-opacity-60 shadow-md appearance-none"
      >
        <option value="buy" className="bg-gray-800 hover:bg-gray-700">Buy</option>
        <option value="rent" className="bg-gray-800 hover:bg-gray-700">Rent</option>
        <option value="commercial" className="bg-gray-800 hover:bg-gray-700">Commercial</option>
        <option value="residential" className="bg-gray-800 hover:bg-gray-700">Residential</option>
        <option value="plot" className="bg-gray-800 hover:bg-gray-700">Plot</option>
      </select>
    </div>

    {/* Price Range Slider */}
    <div className="w-full sm:w-1/4">
      <div className="flex items-center gap-2 text-white">
        <DollarCircleOutlined className="text-white text-2xl" />
        <Slider
          range
          min={0}
          max={5000000}
          step={50000}
          defaultValue={priceRange}
          onChange={(value) => setPriceRange(value)}
          className="w-full"
          marks={{
            0: "$0",
            5000000: "$5M",
          }}
        />
      </div>
    </div>

    {/* Bedrooms Dropdown */}
    <div className="flex items-center gap-4 w-full sm:w-1/4">
      <ApartmentOutlined className="text-white text-2xl" />
      <select
        value={bedrooms}
        onChange={(e) => setBedrooms(e.target.value)}
        className="w-full bg-transparent text-white text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl px-6 py-3 transition duration-300 ease-in-out hover:bg-opacity-60 shadow-md appearance-none"
      >
        <option value={1} className="bg-gray-800 hover:bg-gray-700">1 Bedroom</option>
        <option value={2} className="bg-gray-800 hover:bg-gray-700">2 Bedrooms</option>
        <option value={3} className="bg-gray-800 hover:bg-gray-700">3 Bedrooms</option>
        <option value={4} className="bg-gray-800 hover:bg-gray-700">4+ Bedrooms</option>
      </select>
    </div>
  </div>

  {/* Buttons Section */}
  <div className="flex flex-col sm:flex-row justify-center items-center mt-8 sm:mt-6 space-y-4 sm:space-y-0 sm:space-x-6">
    <Space direction="vertical">
      <Search
        placeholder="Search Properties"
        enterButton="Search"
        size="large"
        suffix={suffix}
        onSearch={onSearch}
        className="w-full sm:w-96 rounded-xl shadow-md"
      />
    </Space>

    {/* Clear Filters Button */}
    <button
      onClick={handleClearFilters}
      className="bg-gray-500 hover:bg-gray-600 text-white text-lg rounded-xl px-8 py-3 transition duration-300 ease-in-out flex items-center w-full sm:w-auto justify-center shadow-md"
    >
      Clear Filters
    </button>
  </div>
</div>

      </div>
    </section>
  );
};

export default HeroSection;

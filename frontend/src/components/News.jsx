import React from "react";

// Icons import
import {
  FaBed,
  FaBuilding,
  FaRegNewspaper,
  FaCalendarAlt,
} from "react-icons/fa";

export default function News() {
  const images = {
    hotel:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    property:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    luxary:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    market:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    investment:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  };

  return (
    <>
      <div className="my-16 md:px-20 md:grid md:grid-cols-5 md:grid-rows-5 gap-6 sm:flex sm:flex-wrap sm:justify-center">
        {/* Latest News Section */}
        <div className="col-span-2 row-span-5 p-6 space-y-8 bg-white rounded-lg">
          <h1 className="text-3xl font-semibold text-gray-900">Latest News</h1>
          <p className="text-lg text-gray-600">
            Stay up-to-date with the latest trends in real estate, luxury
            properties, and interior design.
          </p>

          {/* Latest Blog */}
          <div className="flex items-center space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-600 hover:text-blue-600 transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
            <span className="text-lg font-medium text-gray-800">
              Latest Blog:
            </span>
            <span className="font-normal text-gray-600 hover:text-blue-600 transition-colors cursor-pointer">
              Sustainable Architecture
            </span>
          </div>

          {/* New Article */}
          <div className="flex items-center space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-600 hover:text-blue-600 transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
            <span className="text-lg font-medium text-gray-800">
              New Article:
            </span>
            <span className="font-normal text-gray-600 hover:text-blue-600 transition-colors cursor-pointer">
              Luxury Property Market Trends
            </span>
          </div>

          {/* Breaking News */}
          <div className="flex items-center space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-600 hover:text-blue-600 transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
            <span className="text-lg font-medium text-gray-800">
              Breaking News:
            </span>
            <span className="font-normal text-gray-600 hover:text-blue-600 transition-colors cursor-pointer">
              Smart Home Tech in Real Estate
            </span>
          </div>

          {/* Insights Section */}
          <div className="space-y-5">
            <h2 className="text-2xl font-semibold text-gray-900">
              Insights & Trends
            </h2>
            <p className="text-gray-700 leading-relaxed">
              The real estate market is constantly evolving. Emerging
              technologies and sustainability are becoming increasingly
              important. Stay informed about trends such as wellness spaces,
              energy-efficient designs, and the role of AI in property
              management.
            </p>
          </div>

          {/* Explore More Button */}
          <div>
            <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105">
              Explore More
            </button>
          </div>
        </div>

        {/* New Hotel Opening */}
        <div className="col-span-2 row-span-2 col-start-3 relative overflow-hidden rounded-lg group">
          <img
            src={images.hotel}
            alt="Hotel"
            className="h-64 w-full object-cover rounded-lg transition-transform group-hover:scale-110 group-hover:translate-x-3 group-hover:translate-y-3"
            loading="lazy"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black to-black opacity-80 transition-opacity duration-500"></div>

          <div className="absolute top-0 left-0 right-0 bottom-0 p-6 text-white flex flex-col justify-end rounded-lg transform translate-y-0 opacity-100 transition-all duration-700">
            <h1 className="text-3xl font-semibold text-gray-100 opacity-100 transition-opacity duration-700 transform scale-110 pl-4">
              New Hotel Opening
            </h1>
            <div className="mt-2 flex items-center gap-2">
              <FaBed className="text-blue-500 text-lg" />
              <span className="text-sm text-gray-300 opacity-100 transition-opacity duration-800">
                Hotel & Resorts
              </span>
            </div>
            <p className="text-sm text-gray-200 opacity-100 transition-opacity duration-900">
              Discover the most luxurious hotel openings this season in top
              destinations across the globe. Indulge in comfort and luxury like
              never before.
            </p>
          </div>
          <div className="absolute top-5 right-5 flex items-center gap-4 p-4 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105">
            <div className="bg-white w-1 h-8 rounded-full"></div>
            <div className="flex flex-col text-right">
              <span className="text-sm font-semibold text-gray-900 mt-1">
                March 20, 2025
              </span>
            </div>
          </div>
        </div>

        {/* Interior Design Trends */}
        <div className="row-span-3 col-start-3 row-start-3 relative overflow-hidden rounded-lg group">
          <img
            src={images.market}
            alt="Interior Design Trends"
            className="h-full w-full object-cover rounded-lg transition-transform group-hover:scale-110 group-hover:translate-x-3 group-hover:translate-y-3"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black to-black opacity-80 transition-opacity duration-500"></div>
          <div className="absolute top-0 left-0 right-0 bottom-0 p-6 text-white flex flex-col justify-end rounded-lg transform opacity-100 transition-all duration-700 translate-y-20 hover:translate-y-0">
            <h1 className="text-3xl font-semibold text-gray-100 opacity-100 transition-opacity duration-700 transform scale-110 pl-2">
              Interior Design Trends
            </h1>
            <div className="mt-2 flex items-center gap-2">
              <FaBed className="text-blue-500 text-lg" />
              <span className="text-sm text-gray-300 ">Interior Design</span>
            </div>
            <p className="text-sm text-gray-200 opacity-0 group-hover:opacity-100 group-hover:transition-opacity duration-900">
              Explore the latest interior design trends shaping the future of
              hotel and property interiors.
            </p>
          </div>
        </div>

        {/* Luxury Property Developments */}
        <div className="row-span-2 col-start-4 row-start-3 relative overflow-hidden rounded-lg group">
          <img
            src={images.luxary}
            alt="Luxury Property Development"
            className="h-full w-full object-cover rounded-lg transition-transform group-hover:scale-110 group-hover:translate-x-3 group-hover:translate-y-3"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black to-black opacity-80 transition-opacity duration-500"></div>
          <div className="absolute top-0 left-0 right-0 bottom-0 p-6 text-white flex flex-col justify-end rounded-lg transform opacity-100 transition-all duration-700 translate-y-16 hover:translate-y-0">
            <h1 className="text-3xl font-semibold text-gray-100 opacity-100 transition-opacity duration-700 transform scale-110 pl-2">
              Luxury Property Developments
            </h1>
            <div className="mt-2 flex items-center gap-2">
              <FaBed className="text-blue-500 text-base" />
              <span className="text-sm text-gray-300 ">
                Property Development
              </span>
            </div>
            <p className="text-xs text-gray-200 opacity-0 group-hover:opacity-100 group-hover:transition-opacity duration-900">
              Explore the most exclusive luxury property developments, setting
              new standards in design and comfort.
            </p>
          </div>
        </div>

        {/* Real Estate Property Insights */}
        <div className="row-span-3 col-start-5 row-start-1 relative group overflow-hidden rounded-lg">
          <img
            src={images.property}
            alt="Real Estate Property"
            className="h-full w-full object-cover rounded-lg transition-transform group-hover:scale-110 group-hover:translate-x-3 group-hover:translate-y-3"
            loading="lazy"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black to-black opacity-50 group-hover:opacity-80 transition-opacity duration-500"></div>

          <div className="absolute top-0 left-0 right-0 bottom-0 p-6 text-white flex flex-col justify-end rounded-lg transform opacity-100 transition-all duration-700 translate-y-28 hover:translate-y-0">
            <h1 className="text-3xl font-semibold text-gray-100 opacity-100 transition-opacity duration-700 transform scale-110 pl-2">
              New Hotel Opening
            </h1>
            <div className="mt-2 flex items-center gap-2">
              <FaBed className="text-blue-500 text-lg" />
              <span className="text-sm text-gray-300 opacity-100 transition-opacity duration-800">
                Hotel & Resorts
              </span>
            </div>
            <p className="text-sm text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-900">
              Discover the most luxurious hotel openings this season in top
              destinations across the globe. Indulge in comfort and luxury like
              never before.
            </p>
          </div>
        </div>

        {/* Property Market Insight */}
        <div className="col-start-4 row-start-5 relative bg-blue-300 p-6 flex items-center justify-center rounded-lg shadow-lg">
          <h1 className="text-2xl font-semibold text-white">
            Property Market Insight
          </h1>
        </div>

        {/* Real Estate Investment Tips */}
        <div className="row-span-2 col-start-5 row-start-4 relative overflow-hidden rounded-lg group">
          <img
            src={images.investment}
            alt="Property Market Insights"
            className="h-full w-full object-cover rounded-lg transition-transform group-hover:scale-110 group-hover:translate-x-3 group-hover:translate-y-3"
            loading="lazy"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black to-black opacity-80 transition-opacity duration-500"></div>

          <div className="absolute top-0 left-0 right-0 bottom-0 p-6 text-white flex flex-col justify-end rounded-lg transform opacity-100 transition-all duration-700 translate-y-20 group-hover:translate-y-0">
            <h1 className="text-3xl font-semibold text-gray-100 opacity-100 transition-opacity duration-700 transform scale-110 pl-2">
              Property Market Insights
            </h1>
            <div className="mt-4 flex items-center gap-2">
              <FaRegNewspaper className="text-blue-500 text-lg" />
              <span className="text-sm text-gray-300">Market Updates</span>
            </div>
            <p className="text-sm text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-900">
              Stay updated with the latest trends in the property market. Learn
              about investment opportunities and market shifts.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

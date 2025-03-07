import React from "react";
import {
  FaBed,
  FaBuilding,
  FaBell,
  FaSuitcase,
  FaPalette,
  FaChartLine,
} from "react-icons/fa";
import { PiShootingStarLight } from "react-icons/pi";

export default function News() {
  return (
    <section className=" md:px-20 min-h-screen flex items-center justify-center">
      <div className="px-6 py-8 max-w-screen-xl w-full h-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 h-full">
          {/* Latest News Section */}
          <div className="col-span-2 sm:col-span-1 md:col-span-2 bg-gray-50 h-full flex flex-col space-y-6 p-6 shadow-lg rounded-lg hover:shadow-xl transition-shadow">
            <h1 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <FaBell color="red" /> Breaking News
            </h1>
            <p className="text-gray-600">
              Stay informed with the latest headlines in real estate, property
              developments, and global market changes.
            </p>

            {/* Latest blog links */}
            {[
              "New eco-friendly property projects",
              "Tech innovations disrupting real estate",
              "Upcoming property market trends",
            ].map((blog, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <PiShootingStarLight />
                <span>Latest Update:</span>
                <span>{blog}</span>
              </div>
            ))}

            <div>
              <h1 className="text-xl font-semibold text-gray-800">
                Real Estate Headlines
              </h1>
              <p className="text-gray-600">
                Discover the major shifts and developments in the real estate
                industry, from new market trends to regulatory changes.
              </p>
            </div>
            <button className="text-blue-600 font-semibold py-2 px-4 rounded-lg border border-blue-600 hover:bg-blue-600 hover:text-white transition">
              Read More News
            </button>
          </div>

          {/* Image and Property Section */}
          <div className="col-span-2 sm:col-span-1 md:col-span-2  h-full flex flex-col shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow ">
            <a
              href="#"
              className="group relative flex flex-col h-full rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 ease-in-out"
            >
              <img
                src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Hotel"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:opacity-90"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black to-black opacity-70 group-hover:opacity-80 transition-opacity duration-500"></div>
              <div className="absolute top-0 left-0 right-0 bottom-0 p-6 text-white flex flex-col justify-end transform translate-y-0 opacity-100 transition-all duration-700 group-hover:translate-y-4">
                <h1 className="text-2xl font-semibold text-white opacity-100transition-colors duration-500 transform scale-110 ml-4">
                  Major New Openings in Hospitality
                </h1>
                <div className="mt-2 flex items-center gap-3">
                  <FaBed className="text-blue-500 text-xl group-hover:text-blue-400 transition-colors duration-300" />
                  <span className="text-sm text-gray-300 group-hover:text-gray-200 opacity-100 transition-opacity duration-700">
                    Hospitality & Travel News
                  </span>
                </div>
                <p className="text-sm text-gray-200 opacity-100 group-hover:text-gray-100 transition-colors duration-700">
                  Get the latest on luxurious hotel openings and exclusive
                  resort properties worldwide.
                </p>
              </div>
            </a>

            <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 mt-4 ">
              {["Property Market", "Investment Strategies"].map(
                (category, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 h-full"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt={category}
                      className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black to-black opacity-80 transition-opacity duration-500"></div>

                    <div className="absolute top-0 left-0 right-0 bottom-0 p-6 text-white flex flex-col justify-end rounded-lg transform opacity-100 transition-all duration-700 translate-y-20 hover:translate-y-0">
                      <h1 className="text-xl font-semibold text-gray-100 opacity-100 transition-opacity duration-700 transform scale-110 pl-2">
                        {category} Updates
                      </h1>
                      <div className="mt-2 flex items-center gap-2">
                        <FaBuilding className="text-blue-500 text-lg" />
                        <span className="text-sm text-gray-300">
                          Real Estate News
                        </span>
                      </div>
                      <p className="text-sm text-gray-200 opacity-0 group-hover:opacity-100 group-hover:transition-opacity duration-900">
                        Get the latest news and insights about the{" "}
                        {category.toLowerCase()} in the real estate world.
                      </p>
                    </div>
                  </a>
                )
              )}
            </div>
          </div>

          {/* Investment Section */}
          <div className="col-span-2 sm:col-span-1 md:col-span-1 bg-sky-50 h-full flex flex-col shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow group">
            <a
              href="#"
              className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 h-full"
            >
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Investment"
                className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black to-black opacity-80 transition-opacity duration-500"></div>
              <div className="absolute top-0 left-0 right-0 bottom-0 p-6 text-white flex flex-col justify-end rounded-lg transform opacity-100 transition-all duration-700 translate-y-20 hover:translate-y-0">
                <h1 className="text-2xl font-semibold text-gray-100 opacity-100 transition-opacity duration-700 transform scale-110 pl-2">
                  Real Estate Investment News
                </h1>
                <div className="mt-2 flex items-center gap-2">
                  <FaBed className="text-blue-500 text-lg" />
                  <span className="text-sm text-gray-300 ">
                    Investment Insights
                  </span>
                </div>
                <p className="text-sm text-gray-200 opacity-0 group-hover:opacity-100 group-hover:transition-opacity duration-900">
                  Get the latest real estate investment opportunities and
                  strategies from global markets.
                </p>
              </div>
            </a>
          </div>

          {/* New Card Section */}
          <div className="col-span-2 sm:col-span-1 md:col-span-full bg-teal-50 h-full flex flex-col shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow group">
            <a
              href="#"
              className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-6 pt-40 h-full"
            >
              <img
                src="https://images.unsplash.com/photo-1445462657202-a0893228a1e1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Modern Architecture"
                className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 group-hover:opacity-90 transition-all duration-500 ease-in-out"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black to-black opacity-70 group-hover:opacity-80 transition-opacity duration-500"></div>
              <div className="absolute top-0 left-0 right-0 bottom-0 p-6 text-white flex flex-col justify-end rounded-lg transform translate-y-10 opacity-100 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
                <h1 className="text-4xl font-semibold text-gray-100 opacity-100 transition-opacity duration-500 ">
                  Innovative Designs & Architecture News
                </h1>
                <div className="mt-2 flex items-center gap-3">
                  <FaBed className="text-blue-500 text-lg group-hover:text-blue-400 transition-colors duration-300" />
                  <span className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                    Architecture Trends
                  </span>
                </div>
                <p className="text-sm text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  Stay up-to-date with the latest architectural trends
                  transforming the landscape of real estate.
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

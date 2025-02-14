import React from "react";

// Icons import
import { FaBed, FaBuilding, FaRegNewspaper } from "react-icons/fa";

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
    <div className="container mx-auto px-20 my-10 bg-gray-50">
      <div className="flex p-2 gap-4 items-center ">
        <div className="w-full md:w-1/3 flex flex-col justify-start  p-6  space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Latest News
            </h1>
            <p className="text-sm text-gray-500">
              Catch up on the latest trends in real estate, luxury properties,
              and interior design.
            </p>
          </div>

          {/* News Items */}
          <div className="space-y-4">
            <div className="flex items-center bg-red-500 bg-opacity-20 hover:bg-opacity-30 rounded-lg p-4 cursor-pointer transition duration-300">
              <i className="fas fa-blog text-red-600 mr-3"></i>
              <span className="text-lg font-medium text-gray-800">
                Latest Blog: Sustainable Architecture
              </span>
            </div>
            <div className="flex items-center bg-green-500 bg-opacity-20 hover:bg-opacity-30 rounded-lg p-4 cursor-pointer transition duration-300">
              <i className="fas fa-newspaper text-green-600 mr-3"></i>
              <span className="text-lg font-medium text-gray-800">
                New Article: Luxury Property Market Trends
              </span>
            </div>
            <div className="flex items-center bg-blue-500 bg-opacity-20 hover:bg-opacity-30 rounded-lg p-4 cursor-pointer transition duration-300">
              <i className="fas fa-building text-blue-600 mr-3"></i>
              <span className="text-lg font-medium text-gray-800">
                Breaking News: Smart Home Tech in Real Estate
              </span>
            </div>
          </div>

          {/* Insight Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Insights & Trends
            </h2>
            <p className="text-sm text-gray-600">
              The real estate market is ever-evolving. With new technologies and
              sustainability becoming key focal points, it's important to stay
              informed. Explore emerging trends like the integration of wellness
              spaces, energy-efficient designs, and the impact of artificial
              intelligence on property management.
            </p>
          </div>

          {/* Call to Action */}
          <div className="mt-6 flex justify-start">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200">
              Explore More
            </button>
          </div>
        </div>

        <div className="flex gap-4 p-2">
          <div className="grid grid-rows-2 gap-6">
            <div className="relative bg-white rounded-xl shadow-xl hover:shadow-2xl transition duration-300 h-80 overflow-hidden">
              <img
                src={images.hotel}
                alt="New Hotel"
                className="w-full h-full object-cover rounded-t-lg"
              />
              <div className="absolute top-0 left-0 right-0 bottom-0 p-6 bg-black bg-opacity-40 text-white flex flex-col justify-end rounded-lg">
                <h3 className="text-xl font-medium mb-4">New Hotel Openings</h3>
                <div className="flex items-center space-x-3 mb-4">
                  <FaBed className="text-blue-500 text-lg" />
                  <span className="text-sm">Hotel & Resorts</span>
                </div>
                <p className="text-sm">
                  Discover the best luxury hotels opening this season in popular
                  cities worldwide.
                </p>
              </div>
            </div>

            <div className="flex gap-6 ">
              <div className="relative bg-white rounded-xl shadow-xl hover:shadow-2xl transition duration-300 h-60 overflow-hidden">
                <img
                  src={images.property}
                  alt="Interior Design Trends"
                  className="w-full h-full object-cover rounded-t-lg"
                />
                <div className="absolute top-0 left-0 right-0 bottom-0 p-6 bg-black bg-opacity-40"></div>
                <div className="absolute top-0 left-0 right-0 bottom-0 p-6 text-white flex flex-col justify-end rounded-lg translate-y-20 hover:translate-y-0 transition duration-300">
                  {" "}
                  <h3 className="text-xl font-medium mb-4">
                    Interior Design Trends
                  </h3>
                  <div className="flex items-center space-x-3 mb-4">
                    <FaBuilding className="text-yellow-500 text-lg" />
                    <span className="text-sm">Interior Design</span>
                  </div>
                  <p className="text-sm">
                    Explore the latest interior design trends shaping the future
                    of hotel and property interiors.
                  </p>
                </div>
              </div>

              <div className="relative  rounded-xl shadow-xl hover:shadow-2xl transition duration-300 h-60 overflow-hidden ">
                <img
                  src={images.investment}
                  alt="Real Estate Investment Tips"
                  className="w-full h-full object-cover "
                />
                <div className="absolute top-0 left-0 right-0 bottom-0 p-6 bg-black bg-opacity-40"></div>
                <div className="absolute top-0 left-0 right-0 bottom-0 p-6 text-white flex flex-col justify-end rounded-lg translate-y-[100px] hover:translate-y-0 transition duration-300">
                  {" "}
                  <h3 className="text-xl font-medium mb-4">
                    Real Estate Investment Tips
                  </h3>
                  <div className="flex items-center space-x-3 mb-4">
                    <FaRegNewspaper className="text-purple-500 text-lg" />
                    <span className="text-sm">Investment Tips</span>
                  </div>
                  <p className="text-sm">
                    Get expert advice on how to make smart investments in the
                    property market and spot profitable properties.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="relative bg-white rounded-xl shadow-xl hover:shadow-2xl transition duration-300 h-96 w-80 overflow-hidden">
              <img
                src={images.luxary}
                alt="Luxury Property Developments"
                className="w-full h-full object-cover rounded-t-lg"
              />
              <div className="absolute top-0 left-0 right-0 bottom-0 p-6 bg-black bg-opacity-40"></div>
              <div className="absolute top-0 left-0 right-0 bottom-0 p-6 text-white flex flex-col justify-end rounded-lg translate-y-20 hover:translate-y-0 transition duration-300">
                {" "}
                <h3 className="text-xl font-medium mb-4">
                  Luxury Property Developments
                </h3>
                <div className="flex items-center space-x-3 mb-4">
                  <FaBuilding className="text-red-500 text-lg" />
                  <span className="text-sm">Property Development</span>
                </div>
                <p className="text-sm">
                  Explore the most exclusive luxury property developments,
                  setting new standards in design and comfort.
                </p>
              </div>
            </div>
            <div className="relative bg-white rounded-xl shadow-xl hover:shadow-2xl transition duration-300 h-44 overflow-hidden">
              <img
                src={images.market}
                alt="Property Market Insights"
                className="w-full h-full object-cover rounded-t-lg"
              />
              <div className="absolute top-0 left-0 right-0 bottom-0 p-6 bg-black bg-opacity-40"></div>
              <div className="absolute top-0 left-0 right-0 bottom-0 p-6 text-white flex flex-col justify-end rounded-lg translate-y-20 hover:translate-y-0 transition duration-300">
                <h3 className="text-xl font-medium mb-4">
                  Property Market Insights
                </h3>
                <div className="flex items-center space-x-3 mb-4">
                  <FaRegNewspaper className="text-green-500 text-lg" />
                  <span className="text-sm">Market Updates</span>
                </div>
                <p className="text-sm">
                  Stay updated with the latest trends in the property market.
                  Learn about investment opportunities and market shifts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

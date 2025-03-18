import React, { useState } from "react";
import PropertyCard from "../../components/PropertyCard"; // A card component for property listings

const PropertyCategory = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="bg-gray-100">
      {/* Hero Section with Search Bar */}
      <section
        className="relative bg-cover bg-center h-[500px]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1623005470778-6d6e27b75186?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white px-6 sm:px-12 md:px-24">
          <h1 className="text-4xl sm:text-5xl font-semibold leading-tight">
            Find Your Dream Property
          </h1>
          <p className="mt-4 text-lg sm:text-xl font-light">
            Search for properties with the best deals and locations
          </p>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mt-6 p-2 px-4 rounded-full w-full sm:w-96 text-black shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            placeholder="Search for properties"
          />
        </div>
      </section>

      {/* Property Filters Section */}
      <section className="py-12 px-6 text-black">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold  mb-4">
            Explore Our Property Categories
          </h2>
          <p className="text-lg  opacity-80">
            Choose the best option that suits your needs.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          <button className="px-10 py-4 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white font-semibold rounded-lg shadow-lg transform transition duration-500 ease-in-out hover:scale-105 hover:shadow-2xl hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300">
            For Sale
          </button>
          <button className="px-10 py-4 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white font-semibold rounded-lg shadow-lg transform transition duration-500 ease-in-out hover:scale-105 hover:shadow-2xl hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300">
            For Rent
          </button>
          <button className="px-10 py-4 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white font-semibold rounded-lg shadow-lg transform transition duration-500 ease-in-out hover:scale-105 hover:shadow-2xl hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300">
            Commercial
          </button>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-12 px-6">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Featured Properties
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <PropertyCard />
          <PropertyCard />
          <PropertyCard />
          <PropertyCard />
        </div>
      </section>

      {/* More Properties Section */}
      <section className="py-12 px-6">
        <h2 className="text-3xl font-semibold text-center mb-6">
          More Properties
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <PropertyCard />
          <PropertyCard />
          <PropertyCard />
          <PropertyCard />
        </div>
      </section>

      {/* Property Benefits Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">
            Why Choose Our Platform?
          </h2>
          <div className="flex justify-around">
            <div>
              <svg
                className="text-indigo-600 w-12 h-12 mx-auto mb-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 5h18M3 10h18M3 15h18M3 20h18"
                />
              </svg>
              <p className="font-semibold">Verified Listings</p>
              <p className="text-gray-500">We only list verified properties</p>
            </div>
            <div>
              <svg
                className="text-indigo-600 w-12 h-12 mx-auto mb-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
              <p className="font-semibold">Secure Transactions</p>
              <p className="text-gray-500">All transactions are secured</p>
            </div>
            <div>
              <svg
                className="text-indigo-600 w-12 h-12 mx-auto mb-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 20l9-5-9-5-9 5 9 5zM12 4l9 5-9 5-9-5 9-5z"
                />
              </svg>
              <p className="font-semibold">24/7 Support</p>
              <p className="text-gray-500">We’re available to help anytime</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PropertyCategory;

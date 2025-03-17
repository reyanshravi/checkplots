import React, { useState } from "react";
import PropertyCard from "../../components/PropertyCard"; // A card component for property listings

const PropertyCategory = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="bg-gray-100">
      {/* Hero Section with Search Bar */}
      <section className="relative bg-cover bg-center h-96" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506748686218-bb2c63e1794a')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
          <h1 className="text-4xl font-bold">Find Your Dream Property</h1>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mt-4 p-4 rounded-full w-96 text-black"
            placeholder="Search for properties"
          />
        </div>
      </section>

      {/* Property Filters Section */}
      <section className="py-6 px-6 bg-gray-50">
        <div className="flex justify-center gap-8">
          <button className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-300">For Sale</button>
          <button className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-300">For Rent</button>
          <button className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-300">Commercial</button>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-12 px-6">
        <h2 className="text-3xl font-semibold text-center mb-6">Featured Properties</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <PropertyCard />
          <PropertyCard />
          <PropertyCard />
          <PropertyCard />
        </div>
      </section>

      {/* More Properties Section */}
      <section className="py-12 px-6">
        <h2 className="text-3xl font-semibold text-center mb-6">More Properties</h2>
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
          <h2 className="text-3xl font-semibold mb-6">Why Choose Our Platform?</h2>
          <div className="flex justify-around">
            <div>
              <svg className="text-indigo-600 w-12 h-12 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h18M3 10h18M3 15h18M3 20h18" />
              </svg>
              <p className="font-semibold">Verified Listings</p>
              <p className="text-gray-500">We only list verified properties</p>
            </div>
            <div>
              <svg className="text-indigo-600 w-12 h-12 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              <p className="font-semibold">Secure Transactions</p>
              <p className="text-gray-500">All transactions are secured</p>
            </div>
            <div>
              <svg className="text-indigo-600 w-12 h-12 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 20l9-5-9-5-9 5 9 5zM12 4l9 5-9 5-9-5 9-5z" />
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

import React, { useState } from "react";
import InteriorCard from "../../components/InteriorCard"; // Similar to your HotelCard, for interior designs

const InteriorCategory = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="bg-gray-100">
      {/* Hero Section with Search Bar */}
      <section
        className="relative bg-cover bg-center h-[500px]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black opacity-60"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white px-6 sm:px-12 md:px-24">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Transform Your Home
          </h1>
          <p className="mt-4 text-lg sm:text-xl font-light opacity-80">
            Discover stunning interior designs that will elevate your space.
          </p>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mt-6 p-2 rounded-full w-full sm:w-96 text-black shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            placeholder="Search for interior designs"
          />
        </div>
      </section>

      {/* Interior Categories Section */}
      <section className="py-12 px-6 bg-gray-50">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-800 mb-8">
          Explore Interior Designs
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          <button className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 hover:bg-indigo-700 transition duration-300 ease-in-out flex items-center space-x-2">
            <span>🛋️</span>
            <span>Living Rooms</span>
          </button>
          <button className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 hover:bg-indigo-700 transition duration-300 ease-in-out flex items-center space-x-2">
            <span>🛏️</span>
            <span>Bedroom Ideas</span>
          </button>
          <button className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 hover:bg-indigo-700 transition duration-300 ease-in-out flex items-center space-x-2">
            <span>🍳</span>
            <span>Kitchen Designs</span>
          </button>
        </div>
      </section>

      {/* Featured Interior Designs Section */}
      <section className="py-12 px-6">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Featured Interiors
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <InteriorCard />
          <InteriorCard />
          <InteriorCard />
          <InteriorCard />
        </div>
      </section>

      {/* Popular Designs Section */}
      <section className="py-12 px-6 bg-gray-50">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Popular Design Themes
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1570742133046-d00c1cc91e77?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhY2h8MHx8Y29tcGxldGUlMjBpbnRlcm5hbCUyMGZ1cm5pdHVyZXxlbnwwfDB8fHxlbnwwfHx8&ixlib=rb-1.2.1&q=80&w=1080"
              alt="Contemporary"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Contemporary Living
              </h3>
              <p className="text-gray-500">
                Modern, sleek, and stylish designs
              </p>
            </div>
          </div>
          {/* Add more interior design cards here */}
        </div>
      </section>

      {/* More Interiors Section */}
      <section className="py-12 px-6">
        <h2 className="text-3xl font-semibold text-center mb-6">
          More Interior Designs
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <InteriorCard />
          <InteriorCard />
          <InteriorCard />
          <InteriorCard />
        </div>
      </section>
    </div>
  );
};

export default InteriorCategory;

import React, { useState } from "react";
import HotelCard from "../../components/HotelCard";
const HotelCategory = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="bg-gray-100 ">
      {/* Hero Section with Search Bar */}
      <section
        className="relative bg-cover bg-center h-[500px] bg-fixed"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white px-6 sm:px-12 md:px-24">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-shadow-xl leading-tight mb-6">
            Find Your Perfect Stay
          </h1>
          <p className="text-lg sm:text-2xl mt-2 max-w-2xl mx-auto font-light opacity-90">
            Explore a wide variety of stays tailored to your preferences and
            budget. Begin your journey today.
          </p>

          {/* Search Input and Button */}
          <div className="mt-8 flex justify-center items-center">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-4 w-80 sm:w-96 md:w-[450px] rounded-full text-black font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out"
              placeholder="Where do you want to go?"
            />
            <button className="ml-4 px-6 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-full hover:bg-indigo-700 transition-all duration-300 ease-in-out">
              Search
            </button>
          </div>
        </div>

        {/* Subtle scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </section>

      {/* Featured Listings Section */}
      <section className="py-12 px-6">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Featured Hotels
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <HotelCard />
          <HotelCard />
          <HotelCard />
          <HotelCard />
        </div>
      </section>

      {/* Popular Destinations Section */}
      <section className="py-12 px-6 bg-gray-50">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Popular Destinations
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1573152492246-60fa5fbd8d43?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhY2h8MXx8cGFyaXMlMjBwbGFjZXxlbnwwfDB8fH8&ixlib=rb-1.2.1&q=80&w=1080"
              alt="Paris"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">Paris</h3>
              <p className="text-gray-500">Discover the beauty of Paris</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1566814600-1a9c389c54f0?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhY2h8MXx8bG9uZG9uJTIwY2l0eXxlbnwwfDB8fH8&ixlib=rb-1.2.1&q=80&w=1080"
              alt="London"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">London</h3>
              <p className="text-gray-500">Explore the heart of England</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1600935406750-8eaec83aaf28?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhY2h8Mnx8Y2hlbml8ZW58MHx8fHwxNjc1NzYzMTU0&ixlib=rb-1.2.1&q=80&w=1080"
              alt="Tokyo"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">Tokyo</h3>
              <p className="text-gray-500">The vibrant city of Tokyo</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1521747116042-e1cd52d5e1e4?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhY2h8MXx8bG9zJTIwc2llJTIwY2l0eXxlbnwwfDB8fH8&ixlib=rb-1.2.1&q=80&w=1080"
              alt="Los Angeles"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Los Angeles
              </h3>
              <p className="text-gray-500">Hollywood and beyond</p>
            </div>
          </div>
        </div>
      </section>

      {/* More Hotels Section */}
      <section className="py-12 px-6">
        <h2 className="text-3xl font-semibold text-center mb-6">More Hotels</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <HotelCard />
          <HotelCard />
          <HotelCard />
          <HotelCard />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">Why Choose Us?</h2>
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
              <p className="font-semibold">Easy Booking</p>
              <p className="text-gray-500">Book in a few simple steps</p>
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
              <p className="font-semibold">Secure Payments</p>
              <p className="text-gray-500">
                Trusted and secure payment methods
              </p>
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
              <p className="text-gray-500">We're here to help anytime</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HotelCategory;

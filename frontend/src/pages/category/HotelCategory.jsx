import React, { useState } from "react";
import HotelCard from "../../components/HotelCard";
const HotelCategory = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="bg-gray-100">
      {/* Hero Section with Search Bar */}
      <section
        className="relative bg-cover bg-center h-96"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506748686218-bb2c63e1794a')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
          <h1 className="text-4xl font-bold">Find Your Perfect Stay</h1>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mt-4 p-4 rounded-full w-96 text-black"
            placeholder="Where do you want to go?"
          />
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

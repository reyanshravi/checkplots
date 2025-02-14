import React from "react";

export default function HotelsByLocation() {
  const data = [
    {
      name: "The Grand Palace",
      location: "Paris, France",
      price: "€250 per night",
      rating: 4.8,
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1661919210043-fd847a58522d?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Sunset Hotel",
      location: "New York City, USA",
      price: "$180 per night",
      rating: 4.5,
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1661919210043-fd847a58522d?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Ocean Breeze Resort",
      location: "Maldives",
      price: "$350 per night",
      rating: 5.0,
      imageUrl:
        "https://images.unsplash.com/photo-1543731068-7e0f5beff43a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "City View Suites",
      location: "Tokyo, Japan",
      price: "¥20000 per night",
      rating: 4.6,
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1661902398022-762e88ff3f82?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    // {
    //   name: "Mountain Retreat",
    //   location: "Swiss Alps, Switzerland",
    //   price: "CHF 400 per night",
    //   rating: 4.9,
    //   imageUrl:
    //     "https://plus.unsplash.com/premium_photo-1661902398022-762e88ff3f82?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    // },
  ];

  return (
    <div className=" px-20 my-16">
      <h1 className="text-2xl font-semibold ">Hotels By Location</h1>
      <p className=" text-gray-500 mb-6">
        Each place is a good choice; it will help you make the right decision.
        Discover our wonderful properties.
      </p>

      <div className="flex flex-wrap gap-6 ">
        {data.map((hotel, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm  hover:shadow-xl transition duration-300 overflow-hidden  p-2 border w-80 cursor-pointer"
          >
            <img
              src={hotel.imageUrl}
              alt={hotel.name}
              className="w-full h-32 object-cover"
            />
            <div className="p-3">
              <h3 className="text-sm font-semibold text-gray-800 mb-1">
                {hotel.name}
              </h3>
              <p className="text-xs text-gray-600 mb-1">{hotel.location}</p>
              <p className="text-sm font-semibold text-indigo-600 mb-2">
                {hotel.price}
              </p>
              <div className="flex items-center text-xs text-gray-600">
                <svg
                  className="w-3 h-3 text-yellow-500 mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5 3 1.5-6.5L1 6l6.5-1L10 0l2.5 4L19 6l-5.5 5.5L15 18l-5-3z" />
                </svg>
                <span>{hotel.rating} stars</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

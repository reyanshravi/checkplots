import React from "react";
import { Link } from "react-router-dom";

const HotelCard = ({ hotel }) => {
  const image =
    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <Link to="/product"
      className="block h-[452px] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg w-full bg-white rounded-lg hover:shadow-lg transition-all duration-300 overflow-hidden p-2 border"
      aria-label={`Go to ${hotel.name}'s website`}
    >
      {/* Image Section */}
      <div className="relative">
        <img
          alt={hotel.name}
          src={image}
          className="w-full h-32 sm:h-40 md:h-48 object-cover rounded-t-lg"
        />
        <div className="absolute bottom-2 left-4 text-white text-lg font-semibold shadow-lg">
          {hotel.name}
        </div>
      </div>

      {/* Hotel Info */}
      <div className="px-3 py-2">
        {/* Price & Type */}
        <div className="flex justify-between items-center text-xs font-medium mb-2">
          <div className="text-gray-700">{hotel.type}</div>
          <div className="text-sm font-semibold text-indigo-600">
            {hotel.price}
          </div>
        </div>

        {/* Room Details */}
        <div className="text-xs text-gray-500 mb-2 line-clamp-2">
          {hotel.details}
        </div>

        {/* Rating Section */}
        <div className="flex items-center text-xs text-gray-600 mb-2">
          <svg
            className="w-4 h-4 text-yellow-500 mr-1"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5 3 1.5-6.5L1 6l6.5-1L10 0l2.5 4L19 6l-5.5 5.5L15 18l-5-3z" />
          </svg>
          <span className="font-semibold">
            {hotel.rating} ({hotel.reviews} reviews)
          </span>
        </div>

        {/* Address */}
        <div className="text-xs text-gray-500 mb-2">{hotel.address}</div>

        {/* Special Offer */}
        {hotel.specialOffers && (
          <div className="text-xs text-green-500 font-semibold">
            {hotel.specialOffers}
          </div>
        )}
      </div>

      {/* Amenities & Nearby Attractions Section */}
      <div className="px-4 border-t border-gray-200 grid grid-cols-2 gap-1">
        {/* Amenities */}
        <div>
          <div className="font-semibold text-gray-700 text-xs mb-1">
            Amenities:
          </div>
          <ul className="list-inside list-disc text-xs text-gray-600 space-y-1">
            {hotel.amenities.slice(0, 2).map((amenity, index) => (
              <li key={index}>{amenity}</li>
            ))}
          </ul>
        </div>

        {/* Nearby Attractions */}
        <div>
          <div className="font-semibold text-gray-700 text-xs mb-1">
            Nearby Attractions:
          </div>
          <ul className="list-inside list-disc text-xs text-gray-600 space-y-1">
            {hotel.nearbyAttractions.slice(0, 3).map((attraction, index) => (
              <li key={index}>{attraction}</li>
            ))}
          </ul>
        </div>
      </div>
    </Link>
  );
};

export default HotelCard;

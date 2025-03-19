import React from "react";
import { Link, useNavigate } from "react-router-dom";

const HotelCard = ({ hotel, onEdit, onDelete, showActions = false }) => {
  const navigate = useNavigate();
  // Destructuring hotel details with fallback values
  const {
    id = "", // Default value for the ID
    name = "Default Hotel Name",
    type = "Unknown Type",
    price = "₹0.00",
    details = "No details available",
    rating = 0,
    reviews = 0,
    address = "Unknown address",
    specialOffers = null,
    amenities = [],
    nearbyAttractions = [],
  } = hotel || {}; // Ensure default values if hotel is undefined or missing fields
  const handleNavigate = (id, e) => {
    console.log("click " + id);

    e.stopPropagation();

    const data = { hotelId: id };
    navigate(`/hotel/page`, { state: data });
  };
  return (
    <div
      onClick={(e) => handleNavigate(hotel._id, e)}
      className="cursor-pointer block h-[452px] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg w-full bg-white rounded-lg hover:shadow-lg transition-all duration-300 overflow-hidden p-2 border"
      aria-label={`Go to ${name}'s website`}
    >
      {/* Image Section */}
      <div className="relative">
        <img
          alt={name}
          src={hotel.image}
          className="w-full h-32 sm:h-40 md:h-48 object-cover rounded-t-lg"
        />
        <div className="absolute bottom-2 left-4 text-white text-lg font-semibold shadow-lg">
          {name}
        </div>
      </div>

      {/* Hotel Info */}
      <div className="px-3 py-2">
        {/* Price & Type */}
        <div className="flex justify-between items-center text-xs font-medium mb-2">
          <div className="text-gray-700">{type}</div>
          <div className="text-sm font-semibold text-indigo-600">₹{price}</div>
        </div>

        {/* Room Details */}
        <div className="text-xs text-gray-500 mb-2 line-clamp-2">{details}</div>

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
            {rating} ({reviews} reviews)
          </span>
        </div>

        {/* Address */}
        <div className="text-xs text-gray-500 mb-2">{address}</div>

        {/* Special Offer */}
        {specialOffers && (
          <div className="text-xs text-green-500 font-semibold">
            {specialOffers}
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
            {amenities.slice(0, 2).map((amenity, index) => (
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
            {nearbyAttractions.slice(0, 3).map((attraction, index) => (
              <li key={index}>{attraction}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Conditionally Render Edit and Delete Buttons */}
      {showActions && (
        <div className="absolute top-2 right-2 flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(hotel); // Pass the full hotel object to onEdit
            }}
            className="bg-blue-500 text-white text-xs px-3 py-1 rounded-md hover:bg-blue-600"
          >
            Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(id); // Pass the hotel ID to onDelete
            }}
            className="bg-red-500 text-white text-xs px-3 py-1 rounded-md hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default HotelCard;

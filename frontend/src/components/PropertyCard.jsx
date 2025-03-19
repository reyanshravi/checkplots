import React from "react";
import { Link, useNavigate } from "react-router-dom";

const PropertyCard = ({ property, onEdit, onDelete, showActions = false }) => {
  const navigate = useNavigate();
  // Destructure the property object with fallback values
  const {
    name = "Default Property Name",
    type = "Unknown Type",
    price = "$0.00",
    details = "No details available",
    rating = 0,
    reviews = 0,
    address = "Unknown address",
    investmentPotential = "Not Specified",
    verified = false,
    underDevelopment = false,
    plotDimensions = "Not Specified",
    facing = "Not Specified",
    amenities = [],
  } = property || {}; // Ensure we have a default empty object if 'property' is undefined

  const handleNavigate = (id, e) => {
    console.log("clicked", id);
    e.stopPropagation();
    // Encode the filter data as URL parameters, including the div's id
    const data = { propertyId: id };
    // Navigate to the search results page with the filters as URL parameters
    navigate("/property/page", { state: data });
  };

  return (
    <div
      onClick={(e) => handleNavigate(property._id, e)}
      className="cursor-pointer block h-[470px] max-w-72 w-full rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform overflow-hidden"
    >
      {/* Image Section */}
      <div className="relative">
        <img
          alt={name}
          src={property.image}
          className="w-full h-40 object-cover rounded-t-lg"
        />
        <div className="absolute bottom-2 left-4 text-white text-lg font-semibold shadow-lg">
          {name}
        </div>
      </div>

      {/* Property Info */}
      <div className="px-3 py-2">
        {/* Price & Type */}
        <div className="flex justify-between items-center text-xs font-medium mb-2">
          <div className="text-gray-700">{type}</div>
          <div className="text-sm font-semibold text-indigo-600">₹{price}</div>
        </div>

        {/* Details */}
        <div className="text-xs text-gray-500 mb-2">{details}</div>

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

        {/* Investment Potential */}
        <div className="text-xs text-gray-600 italic mb-2">
          <strong>Investment Potential:</strong> {investmentPotential}
        </div>

        {/* Verified & Under Development */}
        <div className="flex justify-between text-xs text-gray-500">
          {verified && (
            <div className="font-semibold text-green-500">Verified</div>
          )}
          {underDevelopment && (
            <div className="font-semibold text-yellow-500">
              Under Development
            </div>
          )}
        </div>
      </div>

      {/* Property Features & Amenities Section */}
      <div className="px-4 pb-4 border-t border-gray-200 grid grid-cols-2 gap-1">
        {/* Plot Dimensions */}
        <div>
          <div className="font-semibold text-gray-700 text-xs mb-1">
            Plot Dimensions:
          </div>
          <div className="text-xs text-gray-600">{plotDimensions}</div>
        </div>

        {/* Facing */}
        <div>
          <div className="font-semibold text-gray-700 text-xs mb-1">
            Facing:
          </div>
          <div className="text-xs text-gray-600">{facing}</div>
        </div>
      </div>

      {/* Amenities Section */}
      <div className="px-4 pb-4 border-t border-gray-200">
        <div className="font-semibold text-gray-700 text-xs mb-1">
          Amenities:
        </div>
        <ul className="list-inside list-disc text-xs text-gray-600 space-y-1">
          {amenities.slice(0, 3).map((amenity, index) => (
            <li key={index}>{amenity}</li>
          ))}
        </ul>
      </div>

      {/* Conditionally Render Edit and Delete Buttons */}
      {showActions && (
        <div className="absolute top-2 right-2 flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(property); // Pass the full property object to onEdit
            }}
            className="bg-blue-500 text-white text-xs px-3 py-1 rounded-md hover:bg-blue-600"
          >
            Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(property.id); // Pass the property id to onDelete
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

export default PropertyCard;

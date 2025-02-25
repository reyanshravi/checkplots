import React from "react";

const PropertyCard = ({ property }) => {
  const image = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  return (
    <a
      href={property.website}
      className="block h-[470px] max-w-72 w-full bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform overflow-hidden"
    >
      {/* Image Section */}
      <div className="relative">
        <img
          alt={property.name}
          src={image}
          className="w-full h-32 object-cover rounded-t-lg"
        />
        <div className="absolute bottom-2 left-4 text-white text-lg font-semibold shadow-lg">
          {property.name}
        </div>
      </div>

      {/* Property Info */}
      <div className="px-3 py-2">
        {/* Price & Type */}
        <div className="flex justify-between items-center text-xs font-medium mb-2">
          <div className="text-gray-700">{property.type}</div>
          <div className="text-sm font-semibold text-indigo-600">{property.price}</div>
        </div>

        {/* Details */}
        <div className="text-xs text-gray-500 mb-2">{property.details}</div>

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
            {property.rating} ({property.reviews} reviews)
          </span>
        </div>

        {/* Address */}
        <div className="text-xs text-gray-500 mb-2">{property.address}</div>

        {/* Investment Potential */}
        <div className="text-xs text-gray-600 italic mb-2">
          <strong>Investment Potential:</strong> {property.investmentPotential}
        </div>

        {/* Verified & Under Development */}
        <div className="flex justify-between text-xs text-gray-500">
          {property.verified && (
            <div className="font-semibold text-green-500">Verified</div>
          )}
          {property.underDevelopment && (
            <div className="font-semibold text-yellow-500">Under Development</div>
          )}
        </div>
      </div>

      {/* Property Features & Amenities Section */}
      <div className="px-4 pb-4 border-t border-gray-200 grid grid-cols-2 gap-1">
        {/* Plot Dimensions */}
        <div>
          <div className="font-semibold text-gray-700 text-xs mb-1">Plot Dimensions:</div>
          <div className="text-xs text-gray-600">{property.plotDimensions}</div>
        </div>

        {/* Facing */}
        <div>
          <div className="font-semibold text-gray-700 text-xs mb-1">Facing:</div>
          <div className="text-xs text-gray-600">{property.facing}</div>
        </div>
      </div>

      {/* Amenities Section */}
      <div className="px-4 pb-4 border-t border-gray-200">
        <div className="font-semibold text-gray-700 text-xs mb-1">Amenities:</div>
        <ul className="list-inside list-disc text-xs text-gray-600 space-y-1">
          {property.amenities.slice(0, 3).map((amenity, index) => (
            <li key={index}>{amenity}</li>
          ))}
        </ul>
      </div>
    </a>
  );
};

export default PropertyCard;

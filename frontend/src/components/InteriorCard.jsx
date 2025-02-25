import React from "react";

const InteriorCard = ({ interior }) => {
  const image = "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  return (
    <a
      href={interior.website}
      className="block h-[470px] max-w-72 w-full bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300  overflow-hidden"
    >
      {/* Image Section */}
      <div className="relative">
        <img
          alt={interior.name}
          src={image}
          className="w-full h-32 object-cover rounded-t-lg"
        />
        <div className="absolute bottom-2 left-4 text-white text-lg font-semibold shadow-lg">
          {interior.name}
        </div>
      </div>

      {/* Interior Info */}
      <div className="px-3 py-2">
        {/* Price & Type */}
        <div className="flex justify-between items-center text-xs font-medium mb-2">
          <div className="text-gray-700">{interior.type}</div>
          <div className="text-sm font-semibold text-indigo-600">
            {interior.price}
          </div>
        </div>

        {/* Details */}
        <div className="text-xs text-gray-500 mb-2">{interior.details}</div>

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
            {interior.rating} ({interior.reviews} reviews)
          </span>
        </div>

        {/* Address */}
        <div className="text-xs text-gray-500 mb-2">{interior.address}</div>

        {/* Special Offer */}
        {interior.specialOffers && (
          <div className="text-xs text-green-500 font-semibold">
            {interior.specialOffers}
          </div>
        )}
      </div>

      {/* Services & Design Styles Section */}
      <div className="px-4 pb-4 border-t border-gray-200 grid grid-cols-2 gap-1">
        {/* Services */}
        <div>
          <div className="font-semibold text-gray-700 text-xs mb-1">Services:</div>
          <ul className="list-inside list-disc text-xs text-gray-600 space-y-1">
            {interior.services.slice(0, 2).map((service, index) => (
              <li key={index}>{service}</li>
            ))}
          </ul>
        </div>

        {/* Design Styles */}
        <div>
          <div className="font-semibold text-gray-700 text-xs mb-1">Design Styles:</div>
          <ul className="list-inside list-disc text-xs text-gray-600 space-y-1">
            {interior.designStyle.slice(0, 2).map((style, index) => (
              <li key={index}>{style}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Past Clients */}
      <div className="px-4 pb-4 border-t border-gray-200">
        <div className="font-semibold text-gray-700 text-xs mb-1">Past Clients:</div>
        <ul className="list-inside list-disc text-xs text-gray-600 space-y-1">
          {interior.pastClients.slice(0, 2).map((client, index) => (
            <li key={index}>{client}</li>
          ))}
        </ul>
      </div>
    </a>
  );
};

export default InteriorCard;

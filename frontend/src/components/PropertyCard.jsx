// PropertyCard.js
import React from "react";

const PropertyCard = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1506748686218-bb2c63e1794a?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhY2h8NXx8Y29tcGxldGUlMjByZWFsdGllbmclMjByZXN0fGVufDB8fHx8fHx8&ixlib=rb-1.2.1&q=80&w=1080"
        alt="Property"
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">Luxury 3 BHK Apartment</h3>
        <p className="text-gray-500">Located in the heart of the city with great amenities.</p>
        <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
          <span>Price: $1,500,000</span>
          <span className="font-semibold">2,000 sq ft</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;

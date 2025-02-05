import React from "react";
import { useLocation, useParams } from "react-router-dom";

const ProductPage = () => {
  // Extract the property id from the URL using useParams
  const { id } = useParams();
  
  // You can either fetch this data from an API or use static data
  const properties = [
    // Same data as before, truncated for brevity
    {
      id: 1,
      name: "A M Pinnacle",
      type: "Flat/Apartment",
      details: "3 BHK • 3 Baths • 3 Balconies",
      price: "₹60L",
      emi: "₹69.67K",
      pricePerSqft: "₹4K",
      image: "https://checkplots.com/vendor/img/property_img_3366003774439.png",
      address: "Parsa Bazar, Punpun, Nathupur, Bihar, India • Patna, Bihar - 804453",
      verified: true,
      underConstruction: true,
      rating: 5,
      reviews: 0,
    },
    {
        id: 2,
        name: "Skyline Heights",
        type: "Flat/Apartment",
        details: "2 BHK • 2 Baths • 1 Balcony",
        price: "₹45L",
        emi: "₹50K",
        pricePerSqft: "₹3.5K",
        image: "https://checkplots.com/vendor/img/property_img_3366003774439.png",
        address: "Main Street, Delhi, India • New Delhi, Delhi - 110001",
        verified: false,
        underConstruction: false,
        rating: 4,
        reviews: 120,
      },
      {
        id: 3,
        name: "River View Residences",
        type: "Villa",
        details: "4 BHK • 4 Baths • 2 Balconies",
        price: "₹1.2Cr",
        emi: "₹1.5L",
        pricePerSqft: "₹8K",
        image: "https://checkplots.com/vendor/img/property_img_3366003774439.png",
        address: "River Street, Mumbai, India • Mumbai, Maharashtra - 400001",
        verified: true,
        underConstruction: false,
        rating: 5,
        reviews: 50,
      },
      {
        id: 4,
        name: "Green Meadows",
        type: "Villa",
        details: "5 BHK • 5 Baths • 4 Balconies",
        price: "₹3.5Cr",
        emi: "₹3L",
        pricePerSqft: "₹10K",
        image: "https://checkplots.com/vendor/img/property_img_3366003774439.png",
        address: "Forest Road, Bangalore, India • Bangalore, Karnataka - 560001",
        verified: false,
        underConstruction: true,
        rating: 4,
        reviews: 30,
      },
      {
        id: 5,
        name: "Sunset Villas",
        type: "Villa",
        details: "6 BHK • 5 Baths • 3 Balconies",
        price: "₹4.5Cr",
        emi: "₹4L",
        pricePerSqft: "₹12K",
        image: "https://checkplots.com/vendor/img/property_img_3366003774439.png",
        address: "Sunset Road, Goa, India • Panaji, Goa - 403001",
        verified: true,
        underConstruction: false,
        rating: 4.5,
        reviews: 75,
      },
      {
        id: 6,
        name: "Park View Apartments",
        type: "Flat/Apartment",
        details: "3 BHK • 2 Baths • 2 Balconies",
        price: "₹80L",
        emi: "₹90K",
        pricePerSqft: "₹5K",
        image: "https://checkplots.com/vendor/img/property_img_3366003774439.png",
        address: "Park Avenue, Pune, India • Pune, Maharashtra - 411001",
        verified: false,
        underConstruction: true,
        rating: 3.5,
        reviews: 150,
      },
  ];

  // Find the property with the matching id
  const property = properties.find((property) => property.id === parseInt(id));

  if (!property) {
    return <div>Property not found</div>; // Fallback for invalid property id
  }

  return (
   <div className="h-screen w-full flex justify-center items-center">
     <div className="p-6 bg-white shadow-xl rounded-lg">
      <h2 className="text-3xl font-semibold text-gray-900">{property.name}</h2>
      <div className="mt-4 flex">
        <div className="w-1/2 pr-6">
          <img
            src={property.image}
            alt={property.name}
            className="w-full h-56 object-cover rounded-lg"
          />
        </div>
        <div className="w-1/2">
          <p className="text-lg text-gray-700">{property.details}</p>
          <p className="mt-4 text-xl font-semibold text-gray-900">{property.price}</p>
          <p className="mt-2 text-md text-gray-600">EMI: {property.emi}</p>
          <p className="mt-4 text-sm text-gray-500">{property.address}</p>
          <div className="mt-6">
            <button className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none transition-all duration-300">
              Reserve Now
            </button>
          </div>
        </div>
      </div>
    </div>
   </div>
  );
};

export default ProductPage;

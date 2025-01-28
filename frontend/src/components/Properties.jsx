import React, { useState } from "react";

const properties = [
  {
    id: 1,
    name: "A M Pinnacle",
    type: "Flat/Apartment",
    details: "3 BHK • 3 Baths • 3 Balconies",
    price: "₹60L",
    emi: "₹69.67K",
    pricePerSqft: "₹4K",
    image: "https://checkplots.com/vendor/img/property_img_3366003774439.png",
    address:
      "Parsa Bazar, Punpun, Nathupur, Bihar, India • Patna, Bihar - 804453",
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

const Properties = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? properties.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === properties.length - 1 ? 0 : prev + 1));
  };

  return (
   <>
    <div className="bg-gray-50 py-16 px-6 ">
      <h1 className="text-3xl font-bold text-left mb-12 inline">
        <span className="text-blue-600 ">CP</span> Properties
      </h1>
      <h3 className=" font-bold text-right text-blue-400 mr-10  ">
        View all {'>>'}
      </h3>
      <div className="relative flex gap-6 overflow-hidden">
        <button
          onClick={handlePrev}
          className="z-10 absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-4 rounded-full shadow-xl hover:bg-gray-700 transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M15 19l-7-7 7-7v14z" />
          </svg>
        </button>

        <div className="flex py-4 gap-6 overflow-x-hidden z-0 px-2 sm:px-4 md:px-8 lg:px-12 xl:px-20">
          {properties.map((property, index) => (
            <div
              key={property.id}
              className={`relative flex flex-col bg-white shadow-lg rounded-2xl w-full sm:w-72 md:w-80 lg:w-96 xl:w-1/4 transition-all duration-500 ease-in-out transform ${
                index === currentSlide
                  ? "scale-105 z-20"
                  : "scale-95 opacity-70"
              }`}
            >
              <div className="relative h-56 overflow-hidden rounded-t-2xl">
                <img
                  src={property.image}
                  alt={property.name}
                  className="w-full h-full object-cover rounded-t-2xl"
                />
              </div>

              <div className="p-2 flex flex-col justify-between h-full">
                <div className="flex justify-between items-start">
                  <h6 className="text-2xl font-semibold text-gray-900">
                    {property.name}
                  </h6>
                  <div className="flex items-center text-yellow-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="ml-2 text-xl">{property.rating}.0</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{property.details}</p>

                <div className="flex justify-between items-center">
                  <div className="text-xl font-semibold text-gray-900">
                    {property.price}
                  </div>
                  <div className="text-sm text-gray-600">
                    EMI: {property.emi}
                  </div>
                </div>
              </div>

              <div className="px-6 py-2">
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none transition-all duration-300">
                  Reserve Now
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-4 rounded-full shadow-xl hover:bg-gray-700 transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M9 5l7 7-7 7V5z" />
          </svg>
        </button>
      </div>
    </div>

   </>
  );
};

export default Properties;




import React, { useState } from "react";
import Slider from "./Slider";

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
      <Slider />
    </div>

   </>
  );
};

export default Properties;




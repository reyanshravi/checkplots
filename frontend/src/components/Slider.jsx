// import React, { useState, useRef } from "react";
// import "../scroll.css";

// const Slider = () => {
//   const properties = [
//     {
//       id: 1,
//       name: "A M Pinnacle",
//       type: "Flat/Apartment",
//       details: "3 BHK • 3 Baths • 3 Balconies",
//       price: "₹60L",
//       emi: "₹69.67K",
//       pricePerSqft: "₹4K",
//       image: "https://checkplots.com/vendor/img/property_img_3366003774439.png",
//       address:
//         "Parsa Bazar, Punpun, Nathupur, Bihar, India • Patna, Bihar - 804453",
//       verified: true,
//       underConstruction: true,
//       rating: 5,
//       reviews: 0,
//     },
    
//   ];

//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [selectedProperty, setSelectedProperty] = useState(null);

//   const totalSlides = properties.length;

//   // Create a ref for each card to enable scrolling
//   const propertyRefs = useRef(properties.map(() => React.createRef()));

//   const handleNext = () => {
//     const nextSlide = (currentSlide + 1) % totalSlides;
//     setCurrentSlide(nextSlide);
//     propertyRefs.current[nextSlide].current.scrollIntoView({
//       behavior: "smooth",
//       block: "nearest",
//     });
//   };

//   const handlePrev = () => {
//     const prevSlide = (currentSlide - 1 + totalSlides) % totalSlides;
//     setCurrentSlide(prevSlide);
//     propertyRefs.current[prevSlide].current.scrollIntoView({
//       behavior: "smooth",
//       block: "nearest",
//     });
//   };

//   const handleCardClick = (property) => {
//     setSelectedProperty(property);
//   };

//   return (
//     <div className="relative max-w-full mx-auto py-12 px-4 rounded-lg overflow-hidden">
//       <div className="flex items-center justify-between">
//         {/* Navigation Buttons */}
//         <button
//           onClick={handlePrev}
//           className="text-black p-4 bg-opacity-50 rounded-full hover:bg-opacity-75 transition-all duration-300"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             className="w-6 h-6"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M15 19l-7-7 7-7"
//             />
//           </svg>
//         </button>

//         <div className="carousel-container flex gap-6 overflow-x-auto scroll-smooth snap-x px-4 py-6">
//           {properties.map((property, index) => (
//             <a
//               onClick={() => handleCardClick(property)}
//               key={property.id}
//               href="#"
//               ref={propertyRefs.current[index]}
//               className={`property-card flex flex-col items-center bg-white rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl ${
//                 currentSlide === index ? "scale-105" : ""
//               }`}
//             >
//               <div className="relative h-56 w-72 overflow-hidden rounded-t-2xl bg-gray-200">
//                 <img
//                   src={property.image}
//                   alt={property.name}
//                   className="w-full h-full object-cover rounded-t-2xl"
//                 />
//                 {property.verified && (
//                   <div className="absolute top-3 left-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
//                     Verified
//                   </div>
//                 )}
//                 {property.underConstruction && (
//                   <div className="absolute top-3 right-3 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
//                     Under Construction
//                   </div>
//                 )}
//               </div>

//               <div className="p-4 flex flex-col justify-between h-full w-72">
//                 <div className="flex justify-between items-start">
//                   <h6 className="text-2xl font-semibold text-gray-900">
//                     {property.name}
//                   </h6>
//                   <div className="flex items-center text-yellow-500">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="w-5 h-5"
//                       viewBox="0 0 24 24"
//                       fill="currentColor"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                     <span className="ml-2 text-xl">{property.rating}.0</span>
//                   </div>
//                 </div>

//                 <p className="text-sm text-gray-600">{property.details}</p>

//                 <div className="flex justify-between items-center">
//                   <div className="text-xl font-semibold text-gray-900">
//                     {property.price}
//                   </div>
//                   <div className="text-sm text-gray-600">
//                     EMI: {property.emi}
//                   </div>
//                 </div>

//                 <div className="text-xs text-gray-500 ">{property.address}</div>
//               </div>

//               <div className="px-6 py-2 w-full">
//                 <button className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none transition-all duration-300">
//                   Reserve Now
//                 </button>
//               </div>
//             </a>
//           ))}
//         </div>

//         {/* Navigation Buttons */}
//         <button
//           onClick={handleNext}
//           className="text-black p-4 bg-opacity-50 rounded-full hover:bg-opacity-75 transition-all duration-300"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             className="w-6 h-6"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M9 5l7 7-7 7"
//             />
//           </svg>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Slider;


import React, { useState, useRef } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "../scroll.css";

const Slider = () => {
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

  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = properties.length;

  const propertyRefs = useRef(properties.map(() => React.createRef()));

  const handleNext = () => {
    const nextSlide = (currentSlide + 1) % totalSlides;
    setCurrentSlide(nextSlide);
    propertyRefs.current[nextSlide].current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  };

  const handlePrev = () => {
    const prevSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    setCurrentSlide(prevSlide);
    propertyRefs.current[prevSlide].current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  };

  return (
    <div className="relative max-w-full mx-auto py-12 px-4 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrev}
          className="text-black p-4 bg-opacity-50 rounded-full hover:bg-opacity-75 transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <div className="carousel-container flex gap-6 overflow-x-auto scroll-smooth snap-x py-6">
          {properties.map((property, index) => (
            <Link
              key={property.id}
              to={`/product/${property.id}`} // Link to the ProductPage with property id
              ref={propertyRefs.current[index]}
              className={`property-card flex flex-col items-center bg-white rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl ${
                currentSlide === index ? "scale-105" : ""
              }`}
            >
              <div className="relative h-56 w-72 overflow-hidden rounded-t-2xl bg-gray-200">
                <img
                  src={property.image}
                  alt={property.name}
                  className="w-full h-full object-cover rounded-t-2xl"
                />
              </div>

              <div className="p-4 flex flex-col justify-between h-full w-72">
                <div className="flex justify-between items-start mb-2">
                  <h6 className="text-2xl font-semibold text-gray-900">{property.name}</h6>
                </div>

                <p className="text-sm text-gray-600">{property.details}</p>

                <div className="flex justify-between items-center mt-2">
                  <div className="text-xl font-semibold text-gray-900">{property.price}</div>
                  <div className="text-sm text-gray-600">EMI: {property.emi}</div>
                </div>
              </div>

              <div className="px-6 py-2 w-full">
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none transition-all duration-300">
                  Reserve Now
                </button>
              </div>
            </Link>
          ))}
        </div>

        <button
          onClick={handleNext}
          className="text-black p-4 bg-opacity-50 rounded-full hover:bg-opacity-75 transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Slider;

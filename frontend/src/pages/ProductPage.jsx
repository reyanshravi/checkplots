// import React, { useState } from "react";
// import { FaLocationDot, FaEye, FaCalendarDays } from "react-icons/fa6";

// const ProductPage = () => {
//   const hotelData = {
//     id: 1,
//     name: "Royal Palace Hotel",
//     type: "Luxury Hotel",
//     details: "Deluxe Suite • 1 King Bed • City View",
//     price: "₹12,000 per night",
//     emi: "₹1,500 per month (for long-term stay)",
//     pricePerNight: "₹12K",
//     image: "https://checkplots.com/vendor/img/hotel_img_3366003774439.png",
//     address: "MG Road, Connaught Place, New Delhi, India - 110001",
//     verified: true,
//     underRenovation: false,
//     rating: 4.7,
//     reviews: 1280,
//     facilities: [
//       "Free Wi-Fi",
//       "Swimming Pool",
//       "Spa and Wellness Center",
//       "Fitness Center",
//       "24/7 Room Service",
//       "Conference Rooms",
//       "On-Site Parking",
//     ],
//     checkInTime: "2:00 PM",
//     checkOutTime: "12:00 PM",
//     availableRooms: 15,
//     nearbyAttractions: [
//       "India Gate - 5 km",
//       "Red Fort - 7 km",
//       "Qutub Minar - 10 km",
//     ],
//     cancellationPolicy: "Free cancellation up to 24 hours before check-in",
//     specialOffers: "20% discount on bookings for 3+ nights",
//     contactNumber: "+91 11 1234 5678",
//     website: "https://royalpalacehotel.in",
//     amenities: [
//       "Air Conditioning",
//       "Mini Bar",
//       "Tea/Coffee Maker",
//       "Hair Dryer",
//       "Safety Deposit Box",
//       "Television",
//     ],
//   };

//   const images = [
//     { id: 1, src: "/images/images1.jpg", alt: "Backyard" },
//     { id: 2, src: "/images/pool.jpg", alt: "Balcony View" },
//     { id: 3, src: "/images/img1.jpg", alt: "Floor Plan" },
//     { id: 4, src: "/images/img2.jpg", alt: "Floor Plan" },
//   ];

//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//   const [selectedImage, setSelectedImage] = useState(images[0]);

//   const handleDateChange = (e, type) => {
//     if (type === "start") {
//       setStartDate(e.target.value);
//     } else {
//       setEndDate(e.target.value);
//     }
//   };

//   return (
//     <div className=" min-h-screen bg-gradient-to-br from-[#e0e7f0] to-[#f6f6f6] pt-24">
//       {/* Product Gallery */}
//       <div className="w-full  mx-auto px-2">
//         {/* Main Image Preview */}
//         <div className="w-full h-[400px] md:h-[500px] overflow-hidden rounded-lg shadow-lg">
//           <img
//             src={selectedImage.src}
//             alt={selectedImage.alt}
//             className="w-full h-full object-cover"
//           />
//         </div>

//         {/* Thumbnail Gallery */}
//         <div className="flex gap-2 mt-4 overflow-x-auto">
//           {images.map((img) => (
//             <img
//               key={img.id}
//               src={img.src}
//               alt={img.alt}
//               className={`w-24 h-20 md:w-32 md:h-24 rounded-lg cursor-pointer border-2 ${
//                 selectedImage.id === img.id
//                   ? "border-blue-500"
//                   : "border-gray-300"
//               }`}
//               onClick={() => setSelectedImage(img)}
//             />
//           ))}
//         </div>

//         {/* Property Details */}
//         <div className="flex flex-col justify-between px-12 pt-8 shadow-sm">
//           <h1 className="text-2xl font-bold">Walnut Park Apartments</h1>
//           <div className="flex items-center gap-2">
//             <FaLocationDot /> Copenhagen, Denmark <FaEye />
//             4,852 views <FaCalendarDays /> Aug 30, 2024
//           </div>
//         </div>
//       </div>

//       <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-[#e0e7f0] to-[#f6f6f6] p-8 gap-8">
//         {/* Left Section: Main Content */}
//         <div className="flex-1 overflow-y-auto space-y-16 lg:space-y-8 mx-auto w-full">
//           <div className=" mx-auto p-6 bg-white shadow-md rounded-sm">
//             {/* Overview Section */}
//             <h2 className="text-2xl font-semibold border-b pb-2 mb-4">
//               Overview
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800">
//               <p>
//                 <span className="font-semibold">Status:</span>{" "}
//                 <span className="bg-teal-500 text-white text-sm px-2 py-1 rounded">
//                   Selling
//                 </span>
//               </p>
//               <p>
//                 <span className="font-semibold">Number of blocks:</span>{" "}
//                 <span>2</span>
//               </p>
//               <p>
//                 <span className="font-semibold">Category:</span>{" "}
//                 <span className="font-bold">Apartment</span>
//               </p>
//               <p>
//                 <span className="font-semibold">Number of floors:</span>{" "}
//                 <span>22</span>
//               </p>
//               <p>
//                 <span className="font-semibold">Investor:</span>{" "}
//                 <span className="font-bold">Temasek</span>
//               </p>
//               <p>
//                 <span className="font-semibold">Number of flats:</span>{" "}
//                 <span>4,721</span>
//               </p>
//               <p>
//                 <span className="font-semibold">Price:</span>{" "}
//                 <span className="text-green-600 font-bold">
//                   $1,248 - $6,444
//                 </span>
//               </p>
//             </div>

//             {/* Description Section */}
//             <h2 className="text-2xl font-semibold border-b pb-2 mb-4 pt-4">
//               Description
//             </h2>
//             <p className="text-gray-700">
//               Qui sed laudantium inventore fugit porro. Sunt hic cupiditate
//               doloremque facere vel a et. Minus nam sunt esse consequatur ullam.
//               Similique iure sed blanditiis aliquam. Rerum qui quasi reiciendis
//               aut dolor dolore et. Nobis numquam voluptatem et autem molestiae
//               quidem officiis. At quam qui nemo facilis et corporis consequatur.
//               Nescuint sunt rerum omnis qui fugit sed. Repellendus dolor
//               distinctio doloremque adipisci facere ullam vero. Aliquam aliquid
//               eos et rerum. Ut voluptatem quo non ipsa sit dolor nulla. Eum
//               occaecati quo est voluptate aut voluptas. Quos mollitia quisquam
//               beatae quo quam iure deserunt est.
//             </p>
//           </div>

//           {/* Key Features Section */}
//           <section className="bg-white p-6 rounded-sm shadow-lg hover:shadow-2xl transition-all">
//             <h2 className="text-2xl font-semibold border-b pb-2 mb-4">
//               Key Features
//             </h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//               {hotelData.facilities.map((feature, index) => (
//                 <div
//                   key={index}
//                   className="bg-gray-50 p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all"
//                 >
//                   <h3 className="text-xl font-semibold text-[#2D3748]">
//                     {feature}
//                   </h3>
//                   <p className="text-[#4A5568] mt-4">
//                     Experience top-notch amenities for your comfort during your
//                     stay.
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* Testimonials Section */}
//           <section className="bg-white">
//             <div className="mx-auto max-w-screen-xl p-6 sm:px-6 lg:px-8 ">
//               <h2 className="text-2xl font-semibold border-b pb-2 mb-4">
//                 Read trusted reviews from our customers
//               </h2>

//               <div className="mt-8 [column-fill:_balance] sm:columns-2 sm:gap-6 lg:columns-3 lg:gap-8">
//                 <div className="mb-8 sm:break-inside-avoid">
//                   <blockquote className="rounded-lg bg-gray-50 p-6 shadow-xs sm:p-8  shadow-lg hover:shadow-2xl">
//                     <div className="flex items-center gap-4">
//                       <img
//                         alt=""
//                         src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
//                         className="size-14 rounded-full object-cover"
//                       />

//                       <div>
//                         <div className="flex justify-center gap-0.5 text-green-500">
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="size-5"
//                             viewBox="0 0 20 20"
//                             fill="currentColor"
//                           >
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                           </svg>
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="size-5"
//                             viewBox="0 0 20 20"
//                             fill="currentColor"
//                           >
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                           </svg>
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="size-5"
//                             viewBox="0 0 20 20"
//                             fill="currentColor"
//                           >
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                           </svg>
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="size-5"
//                             viewBox="0 0 20 20"
//                             fill="currentColor"
//                           >
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                           </svg>
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="size-5"
//                             viewBox="0 0 20 20"
//                             fill="currentColor"
//                           >
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                           </svg>
//                         </div>

//                         <p className="mt-0.5 text-lg font-medium text-gray-900">
//                           Paul Starr
//                         </p>
//                       </div>
//                     </div>

//                     <p className="mt-4 text-gray-700">
//                       Lorem ipsum dolor sit, amet consectetur adipisicing elit.
//                       Culpa sit rerum incidunt, a consequuntur recusandae ab
//                       saepe illo est quia obcaecati neque quibusdam eius
//                       accusamus error officiis atque voluptates magnam!
//                     </p>
//                   </blockquote>
//                 </div>

//                 <div className="mb-8 sm:break-inside-avoid">
//                   <blockquote className="rounded-lg bg-gray-50 p-6 shadow-xs sm:p-8  shadow-lg hover:shadow-2xl">
//                     <div className="flex items-center gap-4">
//                       <img
//                         alt=""
//                         src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
//                         className="size-14 rounded-full object-cover"
//                       />

//                       <div>
//                         <div className="flex justify-center gap-0.5 text-green-500">
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="size-5"
//                             viewBox="0 0 20 20"
//                             fill="currentColor"
//                           >
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                           </svg>
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="size-5"
//                             viewBox="0 0 20 20"
//                             fill="currentColor"
//                           >
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                           </svg>
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="size-5"
//                             viewBox="0 0 20 20"
//                             fill="currentColor"
//                           >
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                           </svg>
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="size-5"
//                             viewBox="0 0 20 20"
//                             fill="currentColor"
//                           >
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                           </svg>
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="size-5"
//                             viewBox="0 0 20 20"
//                             fill="currentColor"
//                           >
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                           </svg>
//                         </div>

//                         <p className="mt-0.5 text-lg font-medium text-gray-900">
//                           Paul Starr
//                         </p>
//                       </div>
//                     </div>

//                     <p className="mt-4 text-gray-700">
//                       Lorem ipsum dolor sit, amet consectetur adipisicing elit.
//                       Ad mollitia rerum quo unde neque atque molestias quas
//                       pariatur! Sint, maxime?
//                     </p>
//                   </blockquote>
//                 </div>

//                 <div className="mb-8 sm:break-inside-avoid">
//                   <blockquote className="rounded-lg bg-gray-50 p-6 shadow-xs sm:p-8">
//                     <div className="flex items-center gap-4">
//                       <img
//                         alt=""
//                         src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
//                         className="size-14 rounded-full object-cover"
//                       />

//                       <div>
//                         <div className="flex justify-center gap-0.5 text-green-500">
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="size-5"
//                             viewBox="0 0 20 20"
//                             fill="currentColor"
//                           >
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                           </svg>
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="size-5"
//                             viewBox="0 0 20 20"
//                             fill="currentColor"
//                           >
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                           </svg>
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="size-5"
//                             viewBox="0 0 20 20"
//                             fill="currentColor"
//                           >
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                           </svg>
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="size-5"
//                             viewBox="0 0 20 20"
//                             fill="currentColor"
//                           >
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                           </svg>
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="size-5"
//                             viewBox="0 0 20 20"
//                             fill="currentColor"
//                           >
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                           </svg>
//                         </div>

//                         <p className="mt-0.5 text-lg font-medium text-gray-900">
//                           Paul Starr
//                         </p>
//                       </div>
//                     </div>

//                     <p className="mt-4 text-gray-700">
//                       Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                       Reprehenderit esse delectus, maiores fugit, reiciendis
//                       culpa inventore sint accusantium libero dolore eos quasi a
//                       ex aliquam molestiae. Tenetur hic delectus maxime.
//                     </p>
//                   </blockquote>
//                 </div>

//                 <div className="mb-8 sm:break-inside-avoid">
//                   <blockquote className="rounded-lg bg-gray-50 p-6 shadow-xs sm:p-8">
//                     <div className="flex items-center gap-4">
//                       <img
//                         alt=""
//                         src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
//                         className="size-14 rounded-full object-cover"
//                       />

//                       <div>
//                         <div className="flex justify-center gap-0.5 text-green-500">
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="size-5"
//                             viewBox="0 0 20 20"
//                             fill="currentColor"
//                           >
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                           </svg>
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="size-5"
//                             viewBox="0 0 20 20"
//                             fill="currentColor"
//                           >
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                           </svg>
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="size-5"
//                             viewBox="0 0 20 20"
//                             fill="currentColor"
//                           >
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                           </svg>
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="size-5"
//                             viewBox="0 0 20 20"
//                             fill="currentColor"
//                           >
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                           </svg>
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="size-5"
//                             viewBox="0 0 20 20"
//                             fill="currentColor"
//                           >
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                           </svg>
//                         </div>

//                         <p className="mt-0.5 text-lg font-medium text-gray-900">
//                           Paul Starr
//                         </p>
//                       </div>
//                     </div>

//                     <p className="mt-4 text-gray-700">
//                       Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                       Fugit, fuga?
//                     </p>
//                   </blockquote>
//                 </div>

//                 <div className="mb-8 sm:break-inside-avoid">
//                   <blockquote className="rounded-lg bg-gray-50 p-6 shadow-xs sm:p-8">
//                     <div className="flex items-center gap-4">
//                       <img
//                         alt=""
//                         src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
//                         className="size-14 rounded-full object-cover"
//                       />

//                       <div>
//                         <div className="flex justify-center gap-0.5 text-green-500">
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="size-5"
//                             viewBox="0 0 20 20"
//                             fill="currentColor"
//                           >
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                           </svg>
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="size-5"
//                             viewBox="0 0 20 20"
//                             fill="currentColor"
//                           >
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                           </svg>
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="size-5"
//                             viewBox="0 0 20 20"
//                             fill="currentColor"
//                           >
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                           </svg>
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="size-5"
//                             viewBox="0 0 20 20"
//                             fill="currentColor"
//                           >
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                           </svg>
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="size-5"
//                             viewBox="0 0 20 20"
//                             fill="currentColor"
//                           >
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                           </svg>
//                         </div>

//                         <p className="mt-0.5 text-lg font-medium text-gray-900">
//                           Paul Starr
//                         </p>
//                       </div>
//                     </div>

//                     <p className="mt-4 text-gray-700">
//                       Lorem ipsum dolor sit amet consectetur, adipisicing elit.
//                       Cupiditate officia natus blanditiis rerum incidunt ex
//                       autem repudiandae doloribus eveniet quia? Culpa commodi
//                       quae atque perspiciatis? Provident, magni beatae saepe
//                       porro aspernatur facere neque sunt possimus assumenda
//                       perspiciatis aperiam quisquam animi libero voluptatem
//                       fuga. Repudiandae, facere? Nemo reprehenderit quas ratione
//                       quis.
//                     </p>
//                   </blockquote>
//                 </div>

//                 <div className="mb-8 sm:break-inside-avoid">
//                   <blockquote className="rounded-lg bg-gray-50 p-6 shadow-xs sm:p-8">
//                     <div className="flex items-center gap-4">
//                       <img
//                         alt=""
//                         src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
//                         className="size-14 rounded-full object-cover"
//                       />

//                       <div>
//                         <div className="flex justify-center gap-0.5 text-green-500">
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="size-5"
//                             viewBox="0 0 20 20"
//                             fill="currentColor"
//                           >
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                           </svg>
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="size-5"
//                             viewBox="0 0 20 20"
//                             fill="currentColor"
//                           >
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                           </svg>
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="size-5"
//                             viewBox="0 0 20 20"
//                             fill="currentColor"
//                           >
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                           </svg>
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="size-5"
//                             viewBox="0 0 20 20"
//                             fill="currentColor"
//                           >
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                           </svg>
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="size-5"
//                             viewBox="0 0 20 20"
//                             fill="currentColor"
//                           >
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                           </svg>
//                         </div>

//                         <p className="mt-0.5 text-lg font-medium text-gray-900">
//                           Paul Starr
//                         </p>
//                       </div>
//                     </div>

//                     <p className="mt-4 text-gray-700">
//                       Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                       Non, rerum. Nobis laborum praesentium necessitatibus vero.
//                     </p>
//                   </blockquote>
//                 </div>

//                 <div className="mb-8 sm:break-inside-avoid">
//                   <blockquote className="rounded-lg bg-gray-50 p-6 shadow-xs sm:p-8">
//                     <div className="flex items-center gap-4">
//                       <img
//                         alt=""
//                         src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
//                         className="size-14 rounded-full object-cover"
//                       />

//                       <div>
//                         <div className="flex justify-center gap-0.5 text-green-500">
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="size-5"
//                             viewBox="0 0 20 20"
//                             fill="currentColor"
//                           >
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                           </svg>
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="size-5"
//                             viewBox="0 0 20 20"
//                             fill="currentColor"
//                           >
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                           </svg>
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="size-5"
//                             viewBox="0 0 20 20"
//                             fill="currentColor"
//                           >
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                           </svg>
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="size-5"
//                             viewBox="0 0 20 20"
//                             fill="currentColor"
//                           >
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                           </svg>
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="size-5"
//                             viewBox="0 0 20 20"
//                             fill="currentColor"
//                           >
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                           </svg>
//                         </div>

//                         <p className="mt-0.5 text-lg font-medium text-gray-900">
//                           Paul Starr
//                         </p>
//                       </div>
//                     </div>

//                     <p className="mt-4 text-gray-700">
//                       Lorem ipsum, dolor sit amet consectetur adipisicing elit.
//                       Maiores quaerat quasi ipsa repellendus quam! Beatae
//                       pariatur quia distinctio fugit repellendus repudiandae
//                       nostrum consectetur quibusdam quo.
//                     </p>
//                   </blockquote>
//                 </div>

//                 <div className="mb-8 sm:break-inside-avoid">
//                   <blockquote className="rounded-lg bg-gray-50 p-6 shadow-xs sm:p-8">
//                     <div className="flex items-center gap-4">
//                       <img
//                         alt=""
//                         src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
//                         className="size-14 rounded-full object-cover"
//                       />

//                       <div>
//                         <div className="flex justify-center gap-0.5 text-green-500">
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="size-5"
//                             viewBox="0 0 20 20"
//                             fill="currentColor"
//                           >
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                           </svg>
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="size-5"
//                             viewBox="0 0 20 20"
//                             fill="currentColor"
//                           >
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                           </svg>
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="size-5"
//                             viewBox="0 0 20 20"
//                             fill="currentColor"
//                           >
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                           </svg>
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="size-5"
//                             viewBox="0 0 20 20"
//                             fill="currentColor"
//                           >
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                           </svg>
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="size-5"
//                             viewBox="0 0 20 20"
//                             fill="currentColor"
//                           >
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                           </svg>
//                         </div>

//                         <p className="mt-0.5 text-lg font-medium text-gray-900">
//                           Paul Starr
//                         </p>
//                       </div>
//                     </div>

//                     <p className="mt-4 text-gray-700">
//                       Lorem ipsum dolor sit, amet consectetur adipisicing elit.
//                       Sit, modi!
//                     </p>
//                   </blockquote>
//                 </div>

//                 <div className="mb-8 sm:break-inside-avoid">
//                   <blockquote className="rounded-lg bg-gray-50 p-6 shadow-xs sm:p-8">
//                     <div className="flex items-center gap-4">
//                       <img
//                         alt=""
//                         src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
//                         className="size-14 rounded-full object-cover"
//                       />

//                       <div>
//                         <div className="flex justify-center gap-0.5 text-green-500">
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="size-5"
//                             viewBox="0 0 20 20"
//                             fill="currentColor"
//                           >
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                           </svg>
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="size-5"
//                             viewBox="0 0 20 20"
//                             fill="currentColor"
//                           >
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                           </svg>
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="size-5"
//                             viewBox="0 0 20 20"
//                             fill="currentColor"
//                           >
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                           </svg>
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="size-5"
//                             viewBox="0 0 20 20"
//                             fill="currentColor"
//                           >
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                           </svg>
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="size-5"
//                             viewBox="0 0 20 20"
//                             fill="currentColor"
//                           >
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                           </svg>
//                         </div>

//                         <p className="mt-0.5 text-lg font-medium text-gray-900">
//                           Paul Starr
//                         </p>
//                       </div>
//                     </div>

//                     <p className="mt-4 text-gray-700">
//                       Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                       Ullam numquam, unde molestiae commodi temporibus dicta.
//                     </p>
//                   </blockquote>
//                 </div>
//               </div>
//             </div>
//           </section>

//           {/* Map Section */}
//           <section className="bg-white p-7 rounded-sm  transition-all">
//             <h2 className="text-4xl font-semibold text-[#2D3748] mb-6">
//               Location on Map
//             </h2>
//             <div className="w-full h-80 bg-[#A9B9D3] rounded-sm overflow-hidden shadow-xl  mx-auto ">
//               <iframe
//                 className="w-full h-full"
//                 src="https://www.google.com/maps/embed?pb=..."
//                 allowFullScreen=""
//                 loading="lazy"
//               ></iframe>
//             </div>
//           </section>
//         </div>

//         {/* Right Section: Fixed Sidebar */}
//         <div className="w-full lg:w-96 top-0 h-full  space-y-12 ">
//           {/* Enquiry Form Section */}
//           <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-sm">
//             <h2 className="text-xl font-semibold mb-4">Contact</h2>

//             <form className="space-y-4">
//               {/* Name Field */}
//               <div>
//                 <label className="block text-gray-700 font-medium">
//                   Name <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Johny Dane"
//                   className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               {/* Phone Field */}
//               <div>
//                 <label className="block text-gray-700 font-medium">Phone</label>
//                 <input
//                   type="text"
//                   placeholder="Ex 0123456789"
//                   className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               {/* Email Field */}
//               <div>
//                 <label className="block text-gray-700 font-medium">
//                   Email <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="email"
//                   placeholder="email@example.com"
//                   className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               {/* Schedule a Tour */}
//               <div>
//                 <label className="block text-gray-700 font-medium">
//                   Schedule a Tour (optional)
//                 </label>
//                 <input
//                   type="date"
//                   className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               {/* Apartment Selection */}
//               <div>
//                 <select className="w-full p-2 border rounded-md bg-gray-100 cursor-pointer focus:ring-2 focus:ring-blue-500">
//                   <option>Walnut Park Apartments</option>
//                 </select>
//               </div>

//               {/* Message Field */}
//               <div>
//                 <label className="block text-gray-700 font-medium">
//                   Message <span className="text-red-500">*</span>
//                 </label>
//                 <textarea
//                   placeholder="Enter your message..."
//                   className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
//                   rows="4"
//                 ></textarea>
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 className="w-full bg-teal-700 text-white p-3 rounded-md hover:bg-teal-800"
//               >
//                 Send Message
//               </button>
//             </form>
//           </div>

//           {/* Special Offers Section */}
//           <section className="text-gray-700 p-6 rounded-sm shadow-sm bg-white ">
//             <h2 className="text-2xl font-semibold text-[#2D3748] mb-4">
//               Special Offers
//             </h2>
//             <ul className="space-y-4">
//               <li className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-all">
//                 <p className="text-[#2D3748] font-medium">
//                   {hotelData.specialOffers}
//                 </p>
//               </li>
//             </ul>
//             {/* Book Now Button */}
//             <button className="w-full py-3 px-4 bg-teal-700 text-white font-semibold rounded-lg hover:bg-teal-800 mt-6">
//               Book Now
//             </button>
//           </section>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductPage;

// import React, { useState } from 'react';

// const ProductPage = () => {
//   const [formData, setFormData] = useState({ name: '', email: '', message: '' });

//   // Handling form submission
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission logic here
//     console.log('Enquiry Submitted:', formData);
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//       {/* Header Section */}
//       <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
//         <img
//           src="https://example.com/images/living-room.jpg"
//           alt="Modern Living Room with minimalist furniture"
//           className="w-full md:w-1/2 rounded-lg shadow-xl object-cover"
//         />
//         <div className="md:w-1/2">
//           <h1 className="text-4xl font-extrabold text-gray-900">Modern Living Room Design</h1>
//           <p className="mt-2 text-lg text-gray-600">A sleek and modern living room with minimalist furniture and neutral tones.</p>
//           <p className="mt-4 text-xl font-semibold text-gray-900">$5000</p>
//           <p className="mt-2 text-md text-gray-500">Price Range: Affordable</p>
//           <div className="mt-4 flex items-center space-x-2">
//             <span className="text-yellow-500 text-lg">⭐ 4.7</span>
//             <span className="text-gray-600">(120 reviews)</span>
//           </div>
//           <div className="mt-6 space-x-4">
//             <button className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
//               Request Consultation
//             </button>
//             <button className="bg-gray-100 text-gray-900 px-6 py-2 rounded-lg border-2 border-gray-300 hover:bg-gray-200 transition duration-300">
//               Visit Portfolio
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Services Section */}
//       <div className="mt-10">
//         <h2 className="text-3xl font-semibold text-gray-900">Services Offered</h2>
//         <ul className="mt-4 space-y-4 text-lg text-gray-600">
//           <li>🛋️ <strong>Design</strong>: Custom design tailored to your unique taste and preferences.</li>
//           <li>🪑 <strong>Furniture</strong>: High-quality, minimalist furniture pieces designed for comfort and style.</li>
//           <li>💡 <strong>Lighting</strong>: Elegant lighting solutions to elevate the ambiance of your space.</li>
//         </ul>
//       </div>

//       {/* Special Offers Section */}
//       <div className="mt-10 bg-blue-50 p-6 rounded-lg shadow-md">
//         <h2 className="text-2xl font-semibold text-gray-900">Special Offers</h2>
//         <p className="mt-2 text-lg text-gray-600">
//           **10% off on your first consultation!** Take advantage of this special offer to bring your dream living room to life at a reduced price!
//         </p>
//       </div>

//       {/* Project Timeline Section */}
//       <div className="mt-10">
//         <h2 className="text-2xl font-semibold text-gray-900">Project Timeline</h2>
//         <p className="mt-2 text-lg text-gray-600">The project will be completed in **4 weeks** from the start date. Our team ensures timely delivery with top-quality craftsmanship.</p>
//       </div>

//       {/* Free Consultation Section */}
//       <div className="mt-10 bg-gray-100 p-6 rounded-lg shadow-md">
//         <h2 className="text-2xl font-semibold text-gray-900">Free Consultation</h2>
//         <p className="mt-2 text-lg text-gray-600">
//           We offer a **free consultation** to help you explore all options, get professional advice, and start planning your new living room.
//         </p>
//         <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
//           Schedule Now
//         </button>
//       </div>

//       {/* Testimonials Section */}
//       <div className="mt-12">
//         <h2 className="text-3xl font-semibold text-gray-900">Client Testimonials</h2>
//         <div className="mt-6 space-y-4">
//           <div className="flex items-center space-x-4">
//             <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-white text-lg font-semibold">
//               A
//             </div>
//             <div>
//               <p className="text-lg text-gray-600">"The design transformed our space completely. The minimalist approach is exactly what we needed!"</p>
//               <p className="text-md text-gray-500">— Client A</p>
//             </div>
//           </div>

//           <div className="flex items-center space-x-4">
//             <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-white text-lg font-semibold">
//               B
//             </div>
//             <div>
//               <p className="text-lg text-gray-600">"Excellent service, professional, and efficient. Highly recommend!"</p>
//               <p className="text-md text-gray-500">— Client B</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* FAQ Section */}
//       <div className="mt-12">
//         <h2 className="text-3xl font-semibold text-gray-900">Frequently Asked Questions</h2>
//         <div className="mt-6 space-y-4">
//           <div>
//             <h3 className="text-xl font-medium text-gray-900">What is included in the design service?</h3>
//             <p className="mt-2 text-lg text-gray-600">Our design service includes custom furniture layout planning, color palette selection, and lighting design tailored to your space.</p>
//           </div>

//           <div>
//             <h3 className="text-xl font-medium text-gray-900">How long will the project take?</h3>
//             <p className="mt-2 text-lg text-gray-600">The project will typically take around 4 weeks from start to finish, depending on the complexity and scale of the work.</p>
//           </div>

//           <div>
//             <h3 className="text-xl font-medium text-gray-900">Do you offer aftercare services?</h3>
//             <p className="mt-2 text-lg text-gray-600">Yes, we provide aftercare services to ensure that everything is working perfectly after your living room has been completed.</p>
//           </div>
//         </div>
//       </div>

//       {/* Contact Information Section */}
//       <div className="mt-12">
//         <h2 className="text-3xl font-semibold text-gray-900">Contact Information</h2>
//         <ul className="mt-4 space-y-2 text-lg text-gray-600">
//           <li>📞 **Phone**: +1 555-1234</li>
//           <li>🌐 **Website**: <a href="https://example.com" className="text-blue-500 hover:text-blue-700">example.com</a></li>
//           <li>📧 **Email**: <a href="mailto:contact@designcompany.com" className="text-blue-500 hover:text-blue-700">contact@designcompany.com</a></li>
//         </ul>
//       </div>

//       {/* Map Section */}
//       <div className="mt-12">
//         <h2 className="text-3xl font-semibold text-gray-900">Our Location</h2>
//         <div className="mt-4 w-full h-64">
//           <iframe
//             title="Business Location"
//             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.7434414508744!2d-73.98930738472378!3d40.74189517933154!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259af8eb625dd%3A0x1c801d8cbb8be92!2s123%20Modern%20Ave%2C%20New%20York%2C%20NY%2010029!5e0!3m2!1sen!2sus!4v1609353341093!5m2!1sen!2sus"
//             width="100%"
//             height="100%"
//             frameBorder="0"
//             style={{ border: 0 }}
//             allowFullScreen=""
//             aria-hidden="false"
//             tabIndex="0"
//           ></iframe>
//         </div>
//       </div>

//       {/* Video Section */}
//       <div className="mt-12">
//         <h2 className="text-3xl font-semibold text-gray-900">Project Showcase</h2>
//         <div className="mt-4 w-full aspect-w-16 aspect-h-9">
//           <iframe
//             title="Living Room Design Showcase"
//             src="https://www.youtube.com/embed/example-video-id"
//             width="100%"
//             height="100%"
//             frameBorder="0"
//             allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
//             allowFullScreen
//           ></iframe>
//         </div>
//       </div>

//       {/* Enquiry Section */}
//       <div className="mt-12 bg-gray-50 p-6 rounded-lg shadow-md">
//         <h2 className="text-3xl font-semibold text-gray-900">Enquire Now</h2>
//         <form onSubmit={handleSubmit} className="mt-6 space-y-4">
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleInputChange}
//             placeholder="Your Name"
//             className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleInputChange}
//             placeholder="Your Email"
//             className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <textarea
//             name="message"
//             value={formData.message}
//             onChange={handleInputChange}
//             placeholder="Your Message"
//             rows="4"
//             className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300"
//           >
//             Submit Enquiry
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ProductPage;

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

const ProductPage = () => {
  const interiorId = "67cbe2b03da0f50f5c59c754";
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [enquiry, setEnquiry] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState(null); // Success/Error message

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setFormStatus(null); // Reset previous status

    try {
      // Simulate form submission (replace with actual API call)
      // e.g., await axios.post("/api/enquiry", enquiry);
      console.log("Enquiry Submitted", enquiry);

      setFormStatus("Success! Your enquiry has been submitted.");
      setEnquiry({ name: "", email: "", message: "" }); // Clear the form fields
    } catch (error) {
      setFormStatus("There was an error submitting your enquiry.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null); // Reset error state before each fetch

    try {
      const response = await axios.get(
        `http://localhost:7002/api/vendor/interior/${interiorId}`
      );

      if (response?.data?.interior) {
        setData(response.data.interior);
      } else {
        throw new Error("No interior data found");
      }
    } catch (err) {
      setError(err.message || "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  }, [interiorId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Destructure data early for better readability
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  if (!data) return null;

  const {
    name,
    type,
    details,
    price,
    priceRange,
    image,
    address,
    verified,
    rating,
    reviews,
    services,
    specialOffers,
    portfolioLink,
    contactNumber,
    website,
    projectTimeline,
    consultation,
    designStyle,
    pastClients,
    videoId,
  } = data;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8  ">
        <img
          src={image}
          alt={`Interior Design of ${name}`}
          className="w-full md:w-1/2 rounded-lg shadow-xl object-cover"
        />
        <div className="md:w-1/2 ">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900">{name}</h1>
            <p>{type}</p>
          </div>
          <p className="mt-2 text-lg text-gray-600">{details}</p>
          <p className="mt-4 text-xl font-semibold text-gray-900">${price}</p>
          <p className="mt-2 text-md text-gray-500">
          <span className="font-medium">  Price Range:</span> {priceRange}
          </p>
          <div className="mt-4 flex items-center  space-x-2">
            <span className="text-yellow-500 text-lg">⭐ {rating}</span>
            <span className="text-gray-600">({reviews} reviews)</span>
          </div>
          <div className="mt-6 space-x-4">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
              Request Consultation
            </button>
            <button className="bg-gray-100 text-gray-900 px-6 py-2 rounded-lg border-2 border-gray-300 hover:bg-gray-200 transition duration-300">
              Visit Portfolio
            </button>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="mt-10 px-6 py-8 bg-gradient-to-r  text-black rounded-lg  w-full mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Services Offered
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Card 1: Interior Design */}
          <div className="flex flex-col items-center bg-white text-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out">
            <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 4h16v16H4z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Interior Design</h3>
            <p className="text-sm">
              Create beautiful and functional spaces with professional interior
              design services tailored to your needs.
            </p>
          </div>

          {/* Card 2: Consultation */}
          <div className="flex flex-col items-center bg-white text-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out">
            <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 12l-8 4 8 4 8-4-8-4z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Consultation</h3>
            <p className="text-sm">
              Get expert advice and guidance to make informed decisions and plan
              your projects with confidence.
            </p>
          </div>

          {/* Additional Card Example */}
          <div className="flex flex-col items-center bg-white text-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out">
            <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8h18M3 12h18M3 16h18"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Service 3</h3>
            <p className="text-sm">Description of your service goes here.</p>
          </div>
        </div>
      </div>

      {/* Special Offers Section */}
      <div className="mt-10 bg-blue-50 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-900">Special Offers</h2>
        <p className="mt-2 text-lg text-gray-600">{specialOffers}</p>
      </div>

      {/* Project Timeline Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-gray-900">
          Project Timeline
        </h2>
        <p className="mt-2 text-lg text-gray-600">{projectTimeline}</p>
      </div>

      {/* Free Consultation Section */}
      <div className="mt-10 bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-900">
          Free Consultation
        </h2>
        <p className="mt-2 text-lg text-gray-600">{consultation}</p>
        <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
          Schedule Now
        </button>
      </div>

      {/* Testimonials Section */}
      <div className="mt-12">
        <h2 className="text-3xl font-semibold text-gray-900">
          Client Testimonials
        </h2>
        <div className="mt-6 space-y-4">
          {pastClients?.map((client, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-white text-lg font-semibold">
                {client[0]}
              </div>
              <div>
                <p className="text-lg text-gray-600">
                  "The design transformed our space completely. The minimalist
                  approach is exactly what we needed!"
                </p>
                <p className="text-md text-gray-500">— {client}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="mt-12">
        <h2 className="text-3xl font-semibold text-gray-900">
          Contact Information
        </h2>
        <ul className="mt-4 space-y-2 text-lg text-gray-600">
          <li>📞 Phone: {contactNumber}</li>
          <li>
            🌐 Website:{" "}
            <a href={website} className="text-blue-500 hover:text-blue-700">
              {website}
            </a>
          </li>
        </ul>
      </div>

      {/* Map Section */}
      <div className="mt-12">
        <h2 className="text-3xl font-semibold text-gray-900">Our Location</h2>
        <div className="mt-4 w-full h-64">
          <iframe
            title="Business Location"
            src={`https://www.google.com/maps/embed/v1/place?q=${encodeURIComponent(
              address
            )}&key=YOUR_GOOGLE_MAPS_API_KEY`}
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 0 }}
            allowFullScreen
            aria-hidden="false"
            tabIndex="0"
          ></iframe>
        </div>
      </div>

      {/* Video Section */}
      <div className="mt-12">
        <h2 className="text-3xl font-semibold text-gray-900">
          Project Showcase
        </h2>
        <div className="mt-4 w-full aspect-w-16 aspect-h-9">
          <iframe
            title="Living Room Design Showcase"
            src={`https://www.youtube.com/embed/${videoId}`} // Assuming the API includes videoId in the data.
            width="100%"
            height="100%"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      {/* FAQs Section */}
      <div className="mt-12">
        <h2 className="text-3xl font-semibold text-gray-900">
          Frequently Asked Questions
        </h2>
        <div className="mt-6 space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900">
              What services do you offer?
            </h3>
            <p className="mt-2 text-gray-600">
              We offer interior design services, space planning, furniture
              selection, color consultation, and more.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900">
              How long does a project take?
            </h3>
            <p className="mt-2 text-gray-600">
              The project timeline varies depending on the scope of the work.
              Typically, it can take anywhere from 4 to 12 weeks.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900">
              Can you work within my budget?
            </h3>
            <p className="mt-2 text-gray-600">
              Absolutely! We provide flexible solutions that fit various budgets
              without compromising quality.
            </p>
          </div>
        </div>
      </div>

      {/* Enquiry Section */}
      <div className="mt-12 bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-900">
          Send an Enquiry
        </h2>
        <form className="mt-4 space-y-4">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              value={enquiry.name}
              onChange={(e) => setEnquiry({ ...enquiry, name: e.target.value })}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={enquiry.email}
              onChange={(e) =>
                setEnquiry({ ...enquiry, email: e.target.value })
              }
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
              placeholder="Your email"
            />
          </div>
          <div>
            <label className="block text-gray-700">Message</label>
            <textarea
              value={enquiry.message}
              onChange={(e) =>
                setEnquiry({ ...enquiry, message: e.target.value })
              }
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
              placeholder="Your message"
              rows="4"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            Submit Enquiry
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductPage;

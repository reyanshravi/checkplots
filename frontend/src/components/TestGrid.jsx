// import React from "react";
// import { FaBed, FaBuilding, FaRegNewspaper } from "react-icons/fa";

// // Image URLs
// const images = {
//   hotel:
//     "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   property:
//     "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   interior:
//     "https://images.unsplash.com/photo-1584882569735-fb802a4c6c78?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   luxary:
//     "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   investment:
//     "https://images.unsplash.com/photo-1579689252125-767b773f3f69?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
// };

// // Reusable Grid Item Component
// const GridItem = ({
//   image,
//   title,
//   category,
//   description,
//   icon,
//   rowSpan,
//   colSpan,
// }) => (
//   <div
//     className={`relative overflow-hidden rounded-2xl shadow-lg group md:row-span-${rowSpan} md:col-span-${colSpan}`}
//   >
//     <img
//       src={image}
//       alt={title}
//       className="w-full h-full object-cover rounded-t-lg"
//       loading="lazy"
//     />
//     <div className="absolute inset-0 bg-black bg-opacity-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//     <div className="absolute top-0 left-0 right-0 bottom-0 p-6 text-white flex flex-col justify-end rounded-lg translate-y-[100px] hover:translate-y-0 transition duration-300">
//       <h3 className="text-xl font-medium mb-4">{title}</h3>
//       <div className="flex items-center space-x-3 mb-4">
//         {icon}
//         <span className="text-sm">{category}</span>
//       </div>
//       <p className="text-sm">{description}</p>
//     </div>
//   </div>
// );

// export default function TestGrid() {
//   return (
//     <section>
//       <div className="bg-gray-100 my-16 md:px-20">
//         <div className="container mx-auto px-4 py-8">
//           <h1 className="text-4xl font-bold text-center mb-8">
//             Bento Grid Layout with Images
//           </h1>
//           <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
//             {/* Two small items */}
//             <div className="relative overflow-hidden rounded-2xl shadow-lg group md:row-span-3 md:col-span-2 flex flex-col justify-around gap-2 p-4">
//               <div>
//                 <h1 className="text-3xl font-bold text-gray-900 mb-4">
//                   Latest News
//                 </h1>
//                 <p className="text-sm text-gray-500">
//                   Catch up on the latest trends in real estate, luxury
//                   properties, and interior design.
//                 </p>
//               </div>

//               {/* News Items */}
//               <div className="space-y-4">
//                 <div className="flex items-center bg-red-500 bg-opacity-20 hover:bg-opacity-30 rounded-lg p-4 cursor-pointer transition duration-300">
//                   <span className="text-lg font-medium text-gray-800">
//                     Latest Blog:{" "}
//                     <span className="font-normal">
//                       Sustainable Architecture
//                     </span>
//                   </span>
//                 </div>
//                 <div className="flex items-center bg-green-500 bg-opacity-20 hover:bg-opacity-30 rounded-lg p-4 cursor-pointer transition duration-300">
//                   <span className="text-lg font-medium text-gray-800">
//                     New Article:{" "}
//                     <span className="font-normal">
//                       Luxury Property Market Trends
//                     </span>
//                   </span>
//                 </div>
//                 <div className="flex items-center bg-blue-500 bg-opacity-20 hover:bg-opacity-30 rounded-lg p-4 cursor-pointer transition duration-300">
//                   <span className="text-lg font-medium text-gray-800">
//                     Breaking News:{" "}
//                     <span className="font-normal">
//                       Smart Home Tech in Real Estate
//                     </span>
//                   </span>
//                 </div>
//               </div>

//               {/* Insight Section */}
//               <div className="space-y-2 mt-2">
//                 <h2 className="text-xl font-semibold text-gray-800">
//                   Insights & Trends
//                 </h2>
//                 <p className="text-sm text-gray-600">
//                   The real estate market is ever-evolving. With new technologies
//                   and sustainability becoming key focal points, it's important
//                   to stay informed. Explore emerging trends like the integration
//                   of wellness spaces, energy-efficient designs, and the impact
//                   of artificial intelligence on property management.
//                 </p>
//               </div>

//               {/* Call to Action */}
//               <div className="mt-6 flex justify-start">
//                 <button
//                   aria-label="Explore more about real estate trends"
//                   className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
//                 >
//                   Explore More
//                 </button>
//               </div>
//             </div>

//             {/* Large item */}
//             <GridItem
//               image={images.hotel}
//               title="New Hotel Openings"
//               category="Hotel & Resorts"
//               description="Discover the best luxury hotels opening this season in popular cities worldwide."
//               icon={<FaBed className="text-blue-500 text-lg" />}
//               colSpan={2}
//             />

//             {/* Additional items */}
//             <GridItem
//               image={images.interior}
//               title="Interior Design Trends"
//               category="Interior Design"
//               description="Explore the latest interior design trends shaping the future of hotel and property interiors."
//               icon={<FaBuilding className="text-yellow-500 text-lg" />}
//               rowSpan={3}
//             />
//             <GridItem
//               image={images.luxary}
//               title="Luxury Property Developments"
//               category="Property Development"
//               description="Explore the most exclusive luxury property developments, setting new standards in design and comfort."
//               icon={<FaBuilding className="text-red-500 text-lg" />}
//               rowSpan={1}
//             />
//             <GridItem
//               image={images.investment}
//               title="Property Market Insights"
//               category="Market Updates"
//               description="Stay updated with the latest trends in the property market. Learn about investment opportunities and market shifts."
//               icon={<FaRegNewspaper className="text-green-500 text-lg" />}
//               rowSpan={3}
//             />
//             <GridItem
//               image={images.luxary}
//               title="Property Market Insights"
//               category="Market Updates"
//               description="Stay updated with the latest trends in the property market. Learn about investment opportunities and market shifts."
//               icon={<FaRegNewspaper className="text-green-500 text-lg" />}
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


import React from 'react'

export default function TestGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 grid-rows-5 gap-4">
    <div className="col-span-1 sm:col-span-2 row-span-5">1</div>
    <div className="col-span-1 sm:col-span-2 row-span-2 sm:col-start-3 md:col-start-3">2</div>
    <div className="row-span-3 col-start-1 sm:col-start-1 md:col-start-3 row-start-3">3</div>
    <div className="row-span-2 col-start-1 sm:col-start-2 md:col-start-4 row-start-3">4</div>
    <div className="row-span-3 col-start-1 sm:col-start-2 md:col-start-5 row-start-1">5</div>
    <div className="col-start-1 sm:col-start-2 row-start-5">7</div>
    <div className="row-span-2 col-start-1 sm:col-start-2 md:col-start-5 row-start-4">8</div>
</div>

  )
}

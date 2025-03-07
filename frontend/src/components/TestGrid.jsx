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

// import { useState } from 'react';

// const TestGrid = () => {
//   const [showPassword, setShowPassword] = useState(true);

//   return (
//     <div className="bg-purple-900 absolute top-0 left-0 bg-gradient-to-b from-gray-900 via-gray-900 to-purple-800 bottom-0 leading-5 h-full w-full overflow-hidden">
//       <div className="relative min-h-screen sm:flex sm:flex-row justify-center bg-transparent rounded-3xl shadow-xl">
//         <div className="flex-col flex self-center lg:px-14 sm:max-w-4xl xl:max-w-md z-10">
//           <div className="self-start hidden lg:flex flex-col text-gray-300">
//             <h1 className="my-3 font-semibold text-4xl">Welcome back</h1>
//             <p className="pr-3 text-sm opacity-75">
//               Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups
//             </p>
//           </div>
//         </div>

//         <div className="flex justify-center self-center z-10">
//           <div className="p-12 bg-white mx-auto rounded-3xl w-96">
//             <div className="mb-7">
//               <h3 className="font-semibold text-2xl text-gray-800">Sign In</h3>
//               <p className="text-gray-400">
//                 Don't have an account?{' '}
//                 <a href="#" className="text-sm text-purple-700 hover:text-purple-700">
//                   Sign Up
//                 </a>
//               </p>
//             </div>
//             <div className="space-y-6">
//               <div>
//                 <input
//                   className="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
//                   type="email"
//                   placeholder="Email"
//                 />
//               </div>

//               <div className="relative">
//                 <input
//                   placeholder="Password"
//                   type={showPassword ? 'password' : 'text'}
//                   className="text-sm text-gray-200 px-4 py-3 rounded-lg w-full bg-gray-200 focus:bg-gray-100 border border-gray-200 focus:outline-none focus:border-purple-400"
//                 />
//                 <div className="flex items-center absolute inset-y-0 right-0 mr-3 text-sm leading-5">
//                   <svg
//                     onClick={() => setShowPassword(!showPassword)}
//                     className={`h-4 text-purple-700 ${showPassword ? 'block' : 'hidden'}`}
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 576 512"
//                   >
//                     <path
//                       fill="currentColor"
//                       d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"
//                     ></path>
//                   </svg>

//                   <svg
//                     onClick={() => setShowPassword(!showPassword)}
//                     className={`h-4 text-purple-700 ${!showPassword ? 'block' : 'hidden'}`}
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 640 512"
//                   >
//                     <path
//                       fill="currentColor"
//                       d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"
//                     ></path>
//                   </svg>
//                 </div>
//               </div>

//               <div className="flex items-center justify-between">
//                 <div className="text-sm ml-auto">
//                   <a href="#" className="text-purple-700 hover:text-purple-600">
//                     Forgot your password?
//                   </a>
//                 </div>
//               </div>

//               <div>
//                 <button
//                   type="submit"
//                   className="w-full flex justify-center bg-purple-800 hover:bg-purple-700 text-gray-100 p-3 rounded-lg tracking-wide font-semibold cursor-pointer transition ease-in duration-500"
//                 >
//                   Sign in
//                 </button>
//               </div>

//               <div className="flex items-center justify-center space-x-2 my-5">
//                 <span className="h-px w-16 bg-gray-100"></span>
//                 <span className="text-gray-300 font-normal">or</span>
//                 <span className="h-px w-16 bg-gray-100"></span>
//               </div>

//               <div className="flex justify-center gap-5 w-full">
//                 <button
//                   type="submit"
//                   className="w-full flex items-center justify-center mb-6 md:mb-0 border border-gray-300 hover:border-gray-900 hover:bg-gray-900 text-sm text-gray-500 p-3 rounded-lg tracking-wide font-medium cursor-pointer transition ease-in duration-500"
//                 >
//                   <svg
//                     className="w-4 mr-2"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       fill="#EA4335"
//                       d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z"
//                     />
//                     <path
//                       fill="#34A853"
//                       d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z"
//                     />
//                     <path
//                       fill="#4A90E2"
//                       d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21Z"
//                     />
//                     <path
//                       fill="#FBBC05"
//                       d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.268l-4.026-3.115A11.957 11.957 0 0 0 0 12c0 2.268.779 4.344 2.088 6.025l3.189-2.757Z"
//                     />
//                   </svg>
//                   <span className="hidden sm:block">Sign in with Google</span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TestGrid;

import React from "react";

export default function TestGrid() {
  return (
    <section className="bg-white">
      <div className="py-4 px-2 mx-auto max-w-screen-xl sm:py-4 lg:px-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 h-full">
          <div className="col-span-2 sm:col-span-1 md:col-span-2 bg-gray-50 h-auto md:h-full flex flex-col">
            <a
              href=""
              className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 flex-grow"
            >
              <img
                src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5" />
              <h3 className="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl ">
                Wines
              </h3>
            </a>
          </div>
          <div className="col-span-2 sm:col-span-1 md:col-span-2 bg-stone-50">
            <a
              href=""
              className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 mb-4"
            >
              <img
                src="https://images.unsplash.com/photo-1504675099198-7023dd85f5a3?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5" />
              <h3 className="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">
                Gin
              </h3>
            </a>
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-2">
              <a
                href=""
                className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40"
              >
                <img
                  src="https://images.unsplash.com/photo-1571104508999-893933ded431?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5" />
                <h3 className="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">
                  Whiskey
                </h3>
              </a>
              <a
                href=""
                className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40"
              >
                <img
                  src="https://images.unsplash.com/photo-1626897505254-e0f811aa9bf7?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5" />
                <h3 className="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">
                  Vodka
                </h3>
              </a>
            </div>
          </div>
          <div className="col-span-2 sm:col-span-1 md:col-span-1 bg-sky-50 h-auto md:h-full flex flex-col">
            <a
              href=""
              className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 flex-grow"
            >
              <img
                src="https://images.unsplash.com/photo-1693680501357-a342180f1946?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5" />
              <h3 className="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">
                Brandy
              </h3>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

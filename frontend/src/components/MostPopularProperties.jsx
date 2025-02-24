import React, { Suspense, lazy } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { LuHotel } from "react-icons/lu";
import { IoLibraryOutline } from "react-icons/io5";
import { BsBuildings } from "react-icons/bs";

// Lazy load sections for performance optimization
const HotelSection = lazy(() => import("./HotelSection"));
const PropertySection = lazy(() => import("./PropertySection"));
const InteriorSection = lazy(() => import("./InteriorSection"));

export default function MostPopularProperties() {
  return (
    <div className="my-16 px-6 md:px-20">
      {/* SEO Optimized Header */}
      <header>
        <h1 className="text-2xl sm:text-3xl font-semibold text-center md:text-left">
          Popular Hotels and Properties
        </h1>
        <p className="text-gray-500 mb-6 text-center md:text-left">
          Discover the best hotels, properties, and interiors to make your next stay unforgettable.
        </p>
      </header>

      {/* SEO Optimization: Hotels Section */}
      <section>
        <header>
          <h2 className="text-xl sm:text-2xl p-2 flex items-center gap-2 justify-between md:justify-start">
            <LuHotel className="text-2xl" />
            Hotels
            <FaArrowRightLong
              size={20}
              className="hover:translate-x-3 transition duration-300 cursor-pointer"
            />
          </h2>
        </header>
        <Suspense fallback={<div>Loading Hotels...</div>}>
          <HotelSection limit={4} />
        </Suspense>
      </section>

      {/* SEO Optimization: Properties Section */}
      <section className="my-10">
        <header>
          <h2 className="text-xl sm:text-2xl p-2 flex items-center gap-2 justify-between md:justify-start">
            <BsBuildings className="text-2xl" />
            Properties
            <FaArrowRightLong
              size={20}
              className="hover:translate-x-3 transition duration-300 cursor-pointer"
            />
          </h2>
        </header>
        <Suspense fallback={<div>Loading Properties...</div>}>
          <PropertySection limit={4} />
        </Suspense>
      </section>

      {/* SEO Optimization: Interiors Section */}
      <section>
        <header>
          <h2 className="text-xl sm:text-2xl p-2 flex items-center gap-2 justify-between md:justify-start">
            <IoLibraryOutline className="text-2xl" />
            Interiors
            <FaArrowRightLong
              size={20}
              className="hover:translate-x-3 transition duration-300 cursor-pointer"
            />
          </h2>
        </header>
        <Suspense fallback={<div>Loading Interiors...</div>}>
          <InteriorSection limit={4} />
        </Suspense>
      </section>

    </div>
  );
}


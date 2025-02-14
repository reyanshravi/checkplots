import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";

export default function ExploreSection() {
  const image =
    "https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <div
      className="relative bg-cover bg-center h-[75vh] flex flex-col justify-center items-center text-center text-white p-10 bg-opacity-60"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className="absolute top-0 left-0 right-0 bottom-0 p-6 bg-black bg-opacity-20 z-0"></div>

      <div className="z-10 flex justify-center items-center flex-col">
        <h1 className="text-4xl md:text-5xl font-medium text-shadow-lg mb-4 max-w-lg leading-tight z-10">
          Discover a Place You Love to Live
        </h1>
        <p className="text-base md:text-lg font-light mb-8 max-w-2xl text-shadow-md">
          Explore beautiful, modern homes and find your perfect place to call
          home. Whether you're looking for a cozy apartment or a luxurious
          mansion, we have something for everyone.
        </p>
        <button className="flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300 hover:scale-110">
          Explore <FaArrowRightLong className="ml-2" />
        </button>
      </div>
    </div>
  );
}

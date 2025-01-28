import React from "react";
import interior from "../assets/interior.png";
import property from "../assets/property.png";
import hotel from "../assets/hotel.png";

export default function Category() {
  return (
    <div className="my-20 px-4 md:px-12">
      {/* Section Heading */}
      <h2 className="text-3xl font-bold text-left mb-12">
        Explore Our Categories
      </h2>

      {/* Cards Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Card 1: Interior */}
        <div className="relative flex flex-col bg-white shadow-lg border border-slate-200 rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
          <div className="relative h-56 w-full overflow-hidden">
            <img
              src={interior}
              alt="Interior"
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
            />
          </div>
          <div className="p-6">
            <span className="mb-4 rounded-full bg-cyan-600 py-1 px-4 text-xs text-white text-center font-medium">
              POPULAR
            </span>
            <h6 className="mb-3 text-xl font-semibold text-slate-800">
              Interior
            </h6>
            <p className="text-slate-600 text-sm font-light">
              Explore the most stylish and modern interior designs.
            </p>
          </div>
        </div>

        {/* Card 2: Property */}
        <div className="relative flex flex-col bg-white shadow-lg border border-slate-200 rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
          <div className="relative h-56 w-full overflow-hidden">
            <img
              src={property}
              alt="Property"
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
            />
          </div>
          <div className="p-6">
            <span className="mb-4 rounded-full bg-blue-500 py-1 px-4 text-xs text-white text-center font-medium">
              NEW
            </span>
            <h6 className="mb-3 text-xl font-semibold text-slate-800">
              Property
            </h6>
            <p className="text-slate-600 text-sm font-light">
              Find your dream home with the best property listings across the
              city.
            </p>
          </div>
        </div>

        {/* Card 3: Hotel */}
        <div className="relative flex flex-col bg-white shadow-lg border border-slate-200 rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
          <div className="relative h-56 w-full overflow-hidden">
            <img
              src={hotel}
              alt="Hotel"
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
            />
          </div>
          <div className="p-6">
            <span className="mb-4 rounded-full bg-red-500 py-1 px-4 text-xs text-white text-center font-medium">
              LUXURY
            </span>
            <h6 className="mb-3 text-xl font-semibold text-slate-800">Hotel</h6>
            <p className="text-slate-600 text-sm font-light">
              Discover luxurious and relaxing hotel experiences for your
              vacation.
            </p>
          </div>
        </div>
      </div>
    </div>
    
  );
}

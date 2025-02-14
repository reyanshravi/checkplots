import React from "react";
import HotelSection from "./HotelSection";
import PropertySection from "./PropertySection";
import InteriorSection from "./InteriorSection";
import { FaArrowRightLong } from "react-icons/fa6";
import { LuHotel } from "react-icons/lu";
import { IoLibraryOutline } from "react-icons/io5";
import { BsBuildings } from "react-icons/bs";


export default function MostPopularProperties() {
  return (
    <div className="my-16 md:px-20">
      <h1 className="text-2xl font-semibold ">Popular hotels and properties</h1>
      <p className=" text-gray-500 mb-6">
        Each place is a good choice; it will help you make the right decision.
        Discover our wonderful properties.
      </p>
      <div>
        <h1 className="text-2xl p-2 flex items-center gap-2">
          <LuHotel />
          Hotels{" "}
          <FaArrowRightLong
            size={20}
            className="hover:translate-x-3 transition duration-300 cursor-pointer"
          />
        </h1>
        <HotelSection limit={4} />
      </div>
      <div className="my-10">
        <h1 className="text-2xl p-2 flex items-center gap-2">
          <BsBuildings />
          Properties{" "}
          <FaArrowRightLong
            size={20}
            className="hover:translate-x-3 transition duration-300 cursor-pointer"
          />
        </h1>
        <PropertySection limit={4} />
      </div>
      <div>
        <h1 className="text-2xl p-2 flex items-center gap-2">
          <IoLibraryOutline />
          Interiors{" "}
          <FaArrowRightLong
            size={20}
            className="hover:translate-x-3 transition duration-300 cursor-pointer"
          />
        </h1>
        <InteriorSection limit={4} />
      </div>
    </div>
  );
}

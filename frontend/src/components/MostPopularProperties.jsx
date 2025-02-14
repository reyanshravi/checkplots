import React from "react";
import HotelSection from "./HotelSection";

export default function MostPopularProperties() {
  return (
    <div className="my-16 md:px-20">
      <h1 className="text-2xl font-semibold ">Popular hotels and properties</h1>
      <p className=" text-gray-500 mb-6">
        Each place is a good choice; it will help you make the right decision.
        Discover our wonderful properties.
      </p>
      <div>
        <HotelSection limit={4} />
      </div>
    </div>
  );
}

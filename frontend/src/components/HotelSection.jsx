import React from "react";
import HotelCard from "./HotelCard";
import hotels from "../Data/hotel";
export default function HotelSection() {
  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {hotels.map((hotel) => (
        <HotelCard key={hotel.id} hotel={hotel} />
      ))}
    </div>
  );
}

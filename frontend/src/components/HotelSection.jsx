import React from "react";
import HotelCard from "./HotelCard";
import hotels from "../Data/hotel";
export default function HotelSection({ limit }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mx-auto">
      {hotels.slice(0, limit).map((hotel) => (
        <HotelCard key={hotel.id} hotel={hotel} />
      ))}
    </div>
  );
}

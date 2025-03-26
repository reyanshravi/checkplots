import React, { useContext, useMemo } from "react";
import HotelCard from "./HotelCard";
import { DataContext } from "../Context/DataProvider";

export default function HotelSection({ limit }) {
  const { hotelData } = useContext(DataContext); // Fetch hotels from context

  // Early return to avoid unnecessary renders while data is being loaded
  if (!hotelData) return   <div 
  className="grid grid-cols-1 md:grid-cols-4 gap-6">
    <div className="bg-white rounded-xl p-4 shadow-lg space-y-3">
      <div className="w-full h-72 rounded animate-shimmer"></div>
      <div className="h-4 w-3/4 animate-shimmer rounded"></div>
      <div className="h-3 w-1/2 animate-shimmer rounded"></div>
    </div>
    <div className="bg-white rounded-xl p-4 shadow-lg space-y-3">
      <div className="w-full h-72 rounded animate-shimmer"></div>
      <div className="h-4 w-3/4 animate-shimmer rounded"></div>
      <div className="h-3 w-1/2 animate-shimmer rounded"></div>
    </div>
    <div className="bg-white rounded-xl p-4 shadow-lg space-y-3">
      <div className="w-full h-72 rounded animate-shimmer"></div>
      <div className="h-4 w-3/4 animate-shimmer rounded"></div>
      <div className="h-3 w-1/2 animate-shimmer rounded"></div>
    </div>
    <div className="bg-white rounded-xl p-4 shadow-lg space-y-3">
      <div className="w-full h-72 rounded animate-shimmer"></div>
      <div className="h-4 w-3/4 animate-shimmer rounded"></div>
      <div className="h-3 w-1/2 animate-shimmer rounded"></div>
    </div>
  </div>;

  // Memoize the hotels slice based on limit, to avoid unnecessary re-calculation
  const Hotels = useMemo(
    () => hotelData.hotels.slice(0, limit),
    [hotelData, limit] // Recalculate only if hotels or limit changes
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mx-auto place-items-center">
      {Hotels.map((hotel,index) => (
        <HotelCard key={index} hotel={hotel} />
      ))}
    </div>
  );
}

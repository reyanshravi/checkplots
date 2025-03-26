import React, { useMemo, useContext } from "react"; // Added useContext import
import InteriorCard from "./InteriorCard";
import { DataContext } from "../Context/DataProvider";

export default function InteriorSection({ limit }) {
  const { interiorData } = useContext(DataContext); // Corrected useContext

  if (!interiorData)
    return (
      <div 
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
      </div>
    ); // Changed hotelData to interiorData

  const interiors = useMemo(() => {
    return interiorData.interiors.slice(0, limit); // Corrected useMemo return syntax
  }, [interiorData, limit]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mx-auto place-items-center">
      {interiors.map((interior, index) => (
        <InteriorCard key={index} interior={interior} />
      ))}
    </div>
  );
}

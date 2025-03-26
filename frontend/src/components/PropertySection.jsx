import React, { useContext, useMemo } from "react";
import PropertyCard from "./PropertyCard";
import { DataContext } from "../Context/DataProvider";

export default function PropertySection({ limit }) {
  const { propertyData } = useContext(DataContext);

  // Early return to avoid unnecessary renders while data is being loaded
  if (!propertyData) return   <div 
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

  // Memoize properties slice based on limit, to avoid unnecessary re-calculation
  const properties = useMemo(
    () => propertyData.properties.slice(0, limit),
    [propertyData, limit]
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mx-auto place-items-center">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}

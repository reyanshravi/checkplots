import React from "react";
import property from "../Data/property";
import PropertyCard from "./PropertyCard";

export default function PropertySection({limit}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mx-auto">
      {property.slice(0,limit).map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}

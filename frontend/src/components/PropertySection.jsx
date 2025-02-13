import React from "react";
import property from "../Data/property";
import PropertyCard from "./PropertyCard";

export default function PropertySection() {
  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {property.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}

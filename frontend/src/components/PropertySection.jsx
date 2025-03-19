import React, { useContext, useMemo } from "react";
import PropertyCard from "./PropertyCard";
import { DataContext } from "../Context/DataProvider";

export default function PropertySection({ limit }) {
  const { propertyData } = useContext(DataContext);

  // Early return to avoid unnecessary renders while data is being loaded
  if (!propertyData) return <div>Loading...</div>;

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

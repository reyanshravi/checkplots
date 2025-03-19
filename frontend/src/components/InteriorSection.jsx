import React, { useMemo, useContext } from "react"; // Added useContext import
import InteriorCard from "./InteriorCard";
import { DataContext } from "../Context/DataProvider";

export default function InteriorSection({ limit }) {
  const { interiorData } = useContext(DataContext); // Corrected useContext

  if (!interiorData) return <div>Loading...</div>; // Changed hotelData to interiorData

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

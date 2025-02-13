import React from "react";
import InteriorCard from "./InteriorCard";
import interiors from "../Data/interior";

export default function InteriorSection() {
  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {interiors.map((interior) => (
        <InteriorCard key={interior.id} interior={interior} />
      ))}
    </div>
  );
}

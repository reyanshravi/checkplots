import React from "react";
import InteriorCard from "./InteriorCard";
import interiors from "../Data/interiors";

export default function InteriorSection({limit}) {
  return (
    <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mx-auto place-items-center">
      {interiors.slice(0,limit).map((interior) => (
        <InteriorCard key={interior.id} interior={interior} />
      ))}
    </div>
  );
}


import React, { useState, useCallback } from "react";
import image from "../../assets/hero_image.jpeg";
import DomainSearch from "./DomainSearch";

const HeroSection = () => {
  return (
    <section
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
      className="relative text-white flex flex-col items-center justify-center text-center"
    >
      <div className="absolute inset-0 bg-black opacity-40 z-0"></div>

      <div className="relative z-10 px-4 py-8 w-full max-w-6xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-medium text-white mb-2 tracking-tight">
          Find Your Dream Home
        </h2>
        <p className="text-lg sm:text-xl text-gray-200 mb-8">
          Search properties across the country.
        </p>
      </div>
      <DomainSearch />
    </section>
  );
};

export default HeroSection;

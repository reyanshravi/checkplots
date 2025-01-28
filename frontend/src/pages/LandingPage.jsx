import React from "react";
import HeroSection from "../components/HeroSection";
import Category from "../components/Category";
import Properties from "../components/Properties";
import MostPopularProperties from "../components/MostPopularProperties";
import Slider from "../components/Slider";

export default function LandingPage() {
  return (
    <>
      <div>
        <HeroSection />
        <Category />
        <Properties />
        <MostPopularProperties />
        <Slider />
      </div>
    </>
  );
}

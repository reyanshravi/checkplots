import React, { useEffect } from "react";
import HeroSection from "../components/HeroSection/HeroSection";
import Category from "../components/Category";
import Properties from "../components/Properties";
import MostPopularProperties from "../components/MostPopularProperties";
import Slider from "../components/Slider";
import { useLocation } from "react-router-dom";

export default function LandingPage() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
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

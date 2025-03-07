import React, { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection/HeroSection";
import Category from "../components/Category";
import MostPopularProperties from "../components/MostPopularProperties";
import { useLocation } from "react-router-dom";
import HotelsByLocation from "../components/HotelsByLocation";
import News from "../components/News";
import { FaArrowUpLong } from "react-icons/fa6";
import ExploreSection from "../components/ExploreSection";

export default function LandingPage() {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const checkScroll = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  }, []);

  return (
    <>
      <div className="container mx-auto ">
        {/* Hero Section */}
        <HeroSection />

        {/* Category Section */}
        <Category />

        {/* Most Popular Properties Section */}
        <MostPopularProperties />

        {/* Hotels By Location Section */}
        <HotelsByLocation />

        {/* News Section */}
        <News />

        {/* Explore Section */}
        <ExploreSection />

        {/* Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          className={`flex justify-center items-center fixed bottom-5 right-5 md:bottom-10 md:right-10 h-12 w-12 md:h-10 md:w-10 bg-gray-500 text-white font-extrabold rounded-full shadow-lg transition-opacity duration-300 ${
            isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <FaArrowUpLong />
        </button>
      </div>
    </>
  );
}

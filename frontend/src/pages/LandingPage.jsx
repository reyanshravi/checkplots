import React, { useEffect ,useState} from "react";
import HeroSection from "../components/HeroSection/HeroSection";
import Category from "../components/Category";
import Properties from "../components/Properties";
import MostPopularProperties from "../components/MostPopularProperties";
import Slider from "../components/Slider";
import { useLocation } from "react-router-dom";

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
      <div>
        <HeroSection />
        <Category />
        <Properties />
        <MostPopularProperties />
        <Slider />

        <button
          onClick={scrollToTop}
          className={`fixed bottom-5 right-5 h-10 w-10 bg-gray-500 text-white font-extrabold rounded-full shadow-lg transition-opacity duration-300 ${
            isVisible ? "opacity-100" : "opacity-0 pointer-events-none "
          }`}
        >
          ↑
        </button>
      </div>
    </>
  );
}

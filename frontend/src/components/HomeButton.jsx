import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomeButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <button
      onClick={handleClick}
      className="absolute top-10  right-8 flex items-center justify-center gap-3 px-6 py-3 rounded-full shadow-lg transition-all duration-300 z-50"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px", 
      }}
    >
      <img
        src="/CheckPlots.png"
        alt="Home"
        className="w-10 h-10 object-contain" 
      />
      <span className="font-semibold text-lg">Home</span> 
    </button>
  );
}

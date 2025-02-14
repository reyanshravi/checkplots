// TabButton.js
import React from "react";

const TabButton = ({ icon: Icon, label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full py-3 px-4 text-left text-gray-700 rounded-md flex items-center transition-all ${
        isActive
          ? "bg-gray-800 text-white"
          : "hover:bg-gray-100"
      }`}
    >
      <Icon className="mr-3 text-lg" /> {label}
    </button>
  );
};

export default TabButton;

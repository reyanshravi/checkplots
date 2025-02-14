// NavButton.js
import React from 'react';

const NavButton = ({ icon: Icon, label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center text-gray-300 relative group transition-all duration-300 hover:text-white focus:outline-none"
    >
      {/* Icon with smooth scale and color change */}
      <Icon className="text-3xl transition-transform duration-200 transform group-hover:scale-125 group-hover:text-white" />

      {/* Label with fade-in and smooth upward transition */}
      <span className="text-lg text-transparent group-hover:text-gray-800 font-medium mt-3 absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out">
        {label}
      </span>

    </button>
  );
};

export default NavButton;

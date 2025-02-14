// DropdownMenu.js
import React from "react";
import { BsFillCaretDownFill } from "react-icons/bs";

import { IoLogOutOutline, IoKeyOutline } from "react-icons/io5";

const DropdownMenu = ({ isOpen, onToggle, onLogout }) => {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="bg-gray-200 text-gray-700 p-3 rounded-full flex items-center space-x-3 shadow-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-all ease-in-out duration-200"
      >
         <BsFillCaretDownFill className="inline-block text-lg text-gray-600" />
        <span className="text-sm font-medium text-gray-800">Account</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 bg-white shadow-lg rounded-md mt-3 w-48 p-2">
          <button
            onClick={onLogout}
            className="w-full px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md flex items-center space-x-2 transition-all duration-200"
          >
            <IoLogOutOutline className="inline-block text-lg text-gray-600" />
            <span className="text-sm font-medium">Logout</span>
          </button>
          <button
            onClick={onLogout}
            className="w-full px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md flex items-center space-x-2 transition-all duration-200"
          >
            <IoKeyOutline className="inline-block text-lg text-gray-600" />
            <span className="text-sm font-medium">Change password</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null); // Reference for dropdown menu

  // Fetch user details from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token
    // alert("Logged out successfully");
    navigate("/"); // Redirect to the login page
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-gray-800 text-white">
      {/* Logo / Brand Name */}
      <h1 className="text-xl font-bold">Estate Admin</h1>

      {/* Profile Section */}
      <div className="relative flex items-center space-x-4">
        {/* User Profile Image */}
        <span>{user.fullName}</span>
        <img
          onClick={() => setShowMenu(!showMenu)}
          src={user.profileImageUrl}
          alt="User"
          className="w-10 h-10 rounded-full border-2 border-gray-300 cursor-pointer"
        />

        {/* Three-dot Menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="focus:outline-none"
          >
            <FaEllipsisV className="text-xl cursor-pointer" />
          </button>

          {/* Dropdown Menu */}
          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 shadow-md rounded-md py-2">
              <button
                className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                onClick={() => {
                  setShowMenu(false);
                  navigate("/profile");
                }}
              >
                View Profile
              </button>
              <button
                className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                onClick={() => {
                  setShowMenu(false);
                  navigate("/change-password");
                }}
              >
                Change Password
              </button>
              <button
                className="block px-4 py-2 w-full text-left text-red-600 hover:bg-gray-200"
                onClick={() => {
                  setShowMenu(false);
                  handleLogout();
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

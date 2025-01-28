import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token
    alert("Logged out successfully");
    navigate("/"); // Redirect to the login page
  };
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-gray-800 text-white">
      <h1 className="text-xl font-bold">Estate Admin</h1>
      <div>
        <button
          className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-500"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;

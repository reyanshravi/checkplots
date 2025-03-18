import React, { useState } from "react";
import { BsFillCaretDownFill } from "react-icons/bs";
import {
  IoLogOutOutline,
  IoKeyOutline,
  IoHelpCircleOutline,
} from "react-icons/io5";
import { IoMdHome } from "react-icons/io";
import { FiUser, FiSettings, FiMessageSquare } from "react-icons/fi";
import { FaListAlt, FaRegHeart } from "react-icons/fa";
import ProfileTab from "./ProfileTab"; // You can reuse the ProfileTab component
import OrdersTab from "./OrdersTab"; // A new component for User's orders
import MessagesTab from "./MessagesTab"; // A new component for Messages
import WishlistTab from "./WishlistTab"; // A new component for the Wishlist
import SettingsTab from "./SettingsTab"; // A new component for Settings
import HelpAndSupportTab from "./HelpAndSupportTab"; // A new component for Help & Support
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    // Confirm logout and remove authentication token
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (!confirmed) return;

    try {
      localStorage.removeItem("token");
      navigate("/user/signin");
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileTab />;
      case "orders":
        return <OrdersTab />;
      case "messages":
        return <MessagesTab />;
      case "wishlist":
        return <WishlistTab />;
      case "settings":
        return <SettingsTab />;
      case "help and support":
        return <HelpAndSupportTab />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <div className="w-full bg-gray-800 text-white py-3 px-6 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-16">
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            User Dashboard
          </h1>

          <div className="relative">
            <button
              onClick={handleDropdownToggle}
              className="bg-gray-200 text-gray-700 p-2 rounded-full flex items-center space-x-3 shadow-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-all ease-in-out duration-200"
            >
              <BsFillCaretDownFill className="h-5 w-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-800">Account</span>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 bg-white shadow-lg rounded-md mt-3 w-48 p-2">
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md flex items-center space-x-2 transition-all duration-200"
                >
                  <IoLogOutOutline className="inline-block text-lg text-gray-600 h-5 w-5" />
                  <span className="text-sm font-medium">Logout</span>
                </button>
                <button
                  onClick={handleLogout}
                  className=" w-full px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md flex items-center space-x-2 transition-all duration-200"
                >
                  <IoKeyOutline className="inline-block text-lg text-gray-600 h-5 w-5" />
                  <span className="text-sm font-medium">Change password</span>
                </button>
              </div>
            )}
          </div>
        </div>
        <IoMdHome
          onClick={() => navigate("/")}
          size={24}
          className="cursor-pointer"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="bg-white w-64 p-6 shadow-lg border-r-2 border-gray-200">
          <div className="space-y-4">
            <button
              onClick={() => handleTabChange("profile")}
              className={`w-full py-3 px-4 text-left text-gray-700 rounded-md flex items-center transition-all ${
                activeTab === "profile"
                  ? "bg-gray-800 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              <FiUser className="mr-3 text-lg" /> Profile
            </button>
            <button
              onClick={() => handleTabChange("orders")}
              className={`w-full py-3 px-4 text-left text-gray-700 rounded-md flex items-center transition-all ${
                activeTab === "orders"
                  ? "bg-gray-800 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              <FaListAlt className="mr-3 text-lg" /> Orders
            </button>
            <button
              onClick={() => handleTabChange("messages")}
              className={`w-full py-3 px-4 text-left text-gray-700 rounded-md flex items-center transition-all ${
                activeTab === "messages"
                  ? "bg-gray-800 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              <FiMessageSquare className="mr-3 text-lg" /> Messages
            </button>
            <button
              onClick={() => handleTabChange("wishlist")}
              className={`w-full py-3 px-4 text-left text-gray-700 rounded-md flex items-center transition-all ${
                activeTab === "wishlist"
                  ? "bg-gray-800 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              <FaRegHeart className="mr-3 text-lg" /> Wishlist
            </button>
            <button
              onClick={() => handleTabChange("settings")}
              className={`w-full py-3 px-4 text-left text-gray-700 rounded-md flex items-center transition-all ${
                activeTab === "settings"
                  ? "bg-gray-800 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              <FiSettings className="mr-3 text-lg" /> Settings
            </button>
            <button
              onClick={() => handleTabChange("help and support")}
              className={`w-full py-3 px-4 text-left text-gray-700 rounded-md flex items-center transition-all ${
                activeTab === "help and support"
                  ? "bg-gray-800 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              <IoHelpCircleOutline className="mr-3 text-xl" /> Help & Support
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white p-6  h-full">{renderTabContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

import React, { useState } from "react";
import { BsFillCaretDownFill } from "react-icons/bs";
import {
  IoLogOutOutline,
  IoKeyOutline,
  IoHelpCircleOutline,
} from "react-icons/io5";
import { FiUser, FiSettings, FiMail } from "react-icons/fi";
import { FaBuilding, FaHotel } from "react-icons/fa";
import { FaCouch } from "react-icons/fa";
import ProfileTab from "./ProfileTab";
import InteriorTab from "./InteriorTab";
import HotelsTab from "./HotelsTab";
import PropertiesTab from "./PropertiesTab";
import EnquiryTab from "./EnquiryTab";

const VendorDashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    console.log("Logging out...");
    // navigate("/login"); // Uncomment to navigate to the login page
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileTab />;
      case "properties":
        return <PropertiesTab />;
      case "hotels":
        return <HotelsTab />;
      case "interior":
        return <InteriorTab />;
      case "enquires":
        return <EnquiryTab />;
      case "settings":
        return (
          <div className="p-6 bg-gray-50">
            <h2 className="text-2xl font-semibold mb-4">Settings</h2>
            <p>Settings content goes here...</p>
          </div>
        );
      case "help and support":
        return (
          <div className="p-6 bg-gray-50">
            <h2 className="text-2xl font-semibold mb-4">Help and Support</h2>
            <p>Help and support content goes here...</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <div className="w-full bg-gray-800 text-white py-4 px-6 flex justify-between items-center shadow-md ">
        <h1 className="text-3xl font-semibold tracking-tight text-white">
          Vendor Dashboard
        </h1>

        <div className="relative">
          <button
            onClick={handleDropdownToggle}
            className="bg-gray-200 text-gray-700 p-3 rounded-full flex items-center space-x-3 shadow-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-all ease-in-out duration-200"
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
                <IoLogOutOutline className="inline-block text-lg text-gray-600" />
                <span className="text-sm font-medium">Logout</span>
              </button>
              <button
                onClick={handleLogout}
                className=" w-full px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md flex items-center space-x-2 transition-all duration-200"
              >
                <IoKeyOutline className="inline-block text-lg text-gray-600" />
                <span className="text-sm font-medium">Change password</span>
              </button>
            </div>
          )}
        </div>
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
              onClick={() => handleTabChange("properties")}
              className={`w-full py-3 px-4 text-left text-gray-700 rounded-md flex items-center transition-all ${
                activeTab === "properties"
                  ? "bg-gray-800 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              <FaBuilding className="mr-3 text-lg" /> Properties
            </button>
            <button
              onClick={() => handleTabChange("hotels")}
              className={`w-full py-3 px-4 text-left text-gray-700 rounded-md flex items-center transition-all ${
                activeTab === "hotels"
                  ? "bg-gray-800 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              <FaHotel className="mr-3 text-lg" /> Hotels
            </button>
            <button
              onClick={() => handleTabChange("interior")}
              className={`w-full py-3 px-4 text-left text-gray-700 rounded-md flex items-center transition-all ${
                activeTab === "interior"
                  ? "bg-gray-800 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              <FaCouch className="mr-3 text-lg" /> Interior
            </button>
            <button
              onClick={() => handleTabChange("enquires")}
              className={`w-full py-3 px-4 text-left text-gray-700 rounded-md flex items-center transition-all ${
                activeTab === "enquires"
                  ? "bg-gray-800 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              <FiMail className="mr-3 text-lg" /> Enquires
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
              <IoHelpCircleOutline className="mr-3 text-xl" /> help and support
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="bg-white p-6 rounded-lg shadow-lg h-full">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;

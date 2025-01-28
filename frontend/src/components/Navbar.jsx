import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/checkPlots.png";
import { useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  PhoneOutlined,
  InfoCircleOutlined,
  GlobalOutlined,
  FileSearchOutlined,
  AppstoreAddOutlined,
  DatabaseOutlined,
  UsergroupAddOutlined,
  CustomerServiceOutlined,
} from "@ant-design/icons";

const Navbar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const sidebarRef = useRef(null);
  const navigate = useNavigate();

  // Toggle sidebar open/close
  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const sidebarButtonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close the sidebar if the click is outside both the sidebar and the button
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !sidebarButtonRef.current.contains(event.target)
      ) {
        setSidebarOpen(false);
      }
    };

    // Add event listener when the sidebar is open
    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      // Cleanup listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  const handleNavigation = (path) => {
    setSidebarOpen(false);
    navigate(path);
  };

  return (
    <>
      <div className="sticky top-0 z-50 flex justify-center">
        <nav className="flex justify-between items-center w-4/5 fixed bg-white pb-4 px-10 rounded-b-3xl shadow-xl">
          <div onClick={() => navigate("/")}>
            <img
              src={logo}
              alt="logo"
              className="h-14 md:h-16 cursor-pointer"
            />
          </div>
          <div className="flex space-x-6 md:space-x-8 items-center">
            {/* Search button */}
            <button
              onClick={() => navigate("/search")}
              className="flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 transition-all duration-300"
            >
              <span className="mr-2">🔍</span>
              <span>Search</span>
            </button>

            {/* List property button with badge */}
            <button className="md:flex hidden items-center px-4 py-2 border border-transparent rounded-full hover:bg-gray-50 transition-all duration-300">
              <span className="mr-2 text-lg">📜</span>
              <span className="whitespace-nowrap text-sm font-semibold">
                List Property
              </span>
              <span className="ml-2 text-xs bg-red-500 text-white rounded-full px-2 py-1">
                Free
              </span>
            </button>

            {/* Sign In dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="md:flex hidden items-center text-sm font-semibold text-gray-600 hover:text-gray-900 transition-all duration-300"
              >
                <span className="mr-2">🔑</span>
                <span>Sign In</span>
                <span className="ml-2 text-xl">▼</span>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 border bg-white rounded-lg shadow-lg w-36">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition duration-200"
                  >
                    Login as User
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition duration-200"
                  >
                    Login as Vendor
                  </a>
                </div>
              )}
            </div>

            {/* Hamburger Menu (toggle for mobile) */}
            <div>
              <label
                ref={sidebarButtonRef}
                onClick={toggleSidebar}
                className="flex flex-col gap-2 w-8 cursor-pointer"
              >
                <div
                  className={`h-[3px] w-full bg-black rounded-full transition-all duration-300 transform ${
                    isSidebarOpen ? "rotate-45 translate-y-[6px]" : ""
                  }`}
                />
                <div
                  className={`h-[3px] w-full bg-black rounded-full transition-all duration-300 transform ${
                    isSidebarOpen ? "opacity-0" : ""
                  }`}
                />
                <div
                  className={`h-[3px] w-full bg-black rounded-full transition-all duration-300 transform ${
                    isSidebarOpen ? "-rotate-45 -translate-y-[16px]" : ""
                  }`}
                />
              </label>
            </div>
          </div>
        </nav>
      </div>

      {/* Sidebar */}
      <div className="relative z-50">
        {/* Sidebar overlay */}
        {isSidebarOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-40 z-30" />
        )}

        <div
          ref={sidebarRef}
          className={`fixed z-40 top-0 left-0 h-full w-72 bg-gradient-to-b from-gray-800 via-gray-900 to-black text-white shadow-xl transition-transform duration-300 ease-in-out transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Logo */}
          <div className="flex justify-center py-8 ">
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
              CheckPLots
            </h2>
          </div>

          {/* Menu Items */}
          <div className="space-y-6">
            <ul>
              <li>
                <a
                  href="#"
                  className="flex items-center space-x-4 p-3 text-white hover:bg-indigo-700 rounded-md transition duration-200 group"
                >
                  <GlobalOutlined className="text-2xl group-hover:text-white" />
                  <span className="text-lg font-medium group-hover:text-white group-hover:scale-105 transition-all transform">
                    Language
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center space-x-4 p-3 text-white hover:bg-indigo-700 rounded-md transition duration-200 group"
                >
                  <FileSearchOutlined className="text-2xl group-hover:text-white" />
                  <span className="text-lg font-medium group-hover:text-white group-hover:scale-105 transition-all transform">
                    List Property
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center space-x-4 p-3 text-white hover:bg-indigo-700 rounded-md transition duration-200 group"
                >
                  <AppstoreAddOutlined className="text-2xl group-hover:text-white" />
                  <span className="text-lg font-medium group-hover:text-white group-hover:scale-105 transition-all transform">
                    Vendor Package
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center space-x-4 p-3 text-white hover:bg-indigo-700 rounded-md transition duration-200 group"
                >
                  <DatabaseOutlined className="text-2xl group-hover:text-white" />
                  <span className="text-lg font-medium group-hover:text-white group-hover:scale-105 transition-all transform">
                    All Cities
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center space-x-4 p-3 text-white hover:bg-indigo-700 rounded-md transition duration-200 group"
                >
                  <UsergroupAddOutlined className="text-2xl group-hover:text-white" />
                  <span className="text-lg font-medium group-hover:text-white group-hover:scale-105 transition-all transform">
                    Buying Guide
                  </span>
                </a>
              </li>
              <li>
                <a
                  onClick={() => handleNavigation("/aboutus")}
                  className="flex items-center space-x-4 p-3 text-white hover:bg-indigo-700 rounded-md transition duration-200 group"
                >
                  <InfoCircleOutlined className="text-2xl group-hover:text-white" />
                  <span className="text-lg font-medium group-hover:text-white group-hover:scale-105 transition-all transform">
                    About Us
                  </span>
                </a>
              </li>
            </ul>
          </div>

          {/* Bottom Navigation */}
          <div className="absolute bottom-12 w-full px-6">
            <button
              onClick={() => handleNavigation("/")}
              className="w-full py-3 text-white flex items-center justify-start hover:bg-indigo-600 rounded-md transition-all duration-200 transform hover:scale-105 mb-4"
            >
              <HomeOutlined className="mr-3 text-2xl" />
              <span className="text-lg">Home</span>
            </button>
            <button
              onClick={() => handleNavigation("/contact")}
              className="w-full py-3 text-white flex items-center justify-start hover:bg-indigo-600 rounded-md transition-all duration-200 transform hover:scale-105 mb-4"
            >
              <PhoneOutlined className="mr-3 text-2xl" />
              <span className="text-lg">Contact</span>
            </button>
            <button
              onClick={() => handleNavigation("/contact")}
              className="w-full py-3 text-white flex items-center justify-start hover:bg-indigo-600 rounded-md transition-all duration-200 transform hover:scale-105 mb-4"
            >
              <CustomerServiceOutlined className="mr-3 text-2xl" />
              <span className="text-lg">Help</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

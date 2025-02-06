import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/checkPlots.png";
import { Link, useNavigate } from "react-router-dom";
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
  const sidebarButtonRef = useRef(null);
  const dropdownRef = useRef(null);
  const dropdownButtonRef = useRef(null);
  const navigate = useNavigate();

  // Check if the user is logged in and fetch user data
  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user ? user.fullName : null;

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !sidebarButtonRef.current.contains(event.target)
      ) {
        setSidebarOpen(false);
      }
      // Check if the click was outside the dropdown
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !dropdownButtonRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isSidebarOpen || isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen, isDropdownOpen]);

  const handleNavigation = (path) => {
    setSidebarOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    // Clear the user data from localStorage and navigate to the home page
    localStorage.removeItem("user");
    navigate("/user/signin");
  };

  const SidebarButton = ({ Icon, label, onClick, className = "" }) => (
    <button
      onClick={onClick}
      className={`flex items-center px-4 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-300 w-full ${className}`}
    >
      <Icon className="mr-2 text-xl" />
      <span className="text-sm">{label}</span>
    </button>
  );

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
            <button className="md:flex hidden items-center px-4 py-2 border border-transparent rounded-full hover:bg-gray-50 transition-all duration-300">
              <span className="mr-2 text-lg">📜</span>
              <span className="whitespace-nowrap text-sm font-semibold">
                List Property
              </span>
              <span className="ml-2 text-xs bg-red-500 text-white rounded-full px-2 py-1">
                Free
              </span>
            </button>
            <div className="relative">
              <button
                ref={dropdownButtonRef}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="md:flex hidden items-center text-sm font-semibold text-black transition-all duration-300 border px-4 py-2 rounded-full"
              >
                {userName ? (
                  // Show "Hi, [User Name]" if the user is logged in
                  <span className="mr-2">👋</span>
                ) : (
                  <span className="mr-2">🔑</span>
                )}
                <span>{userName ? `Hi, ${userName}` : "Sign In"}</span>
                <span className="ml-2 text-xl">▼</span>
              </button>
              {isDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className={`absolute right-0 mt-2 w-64 rounded-3xl shadow-lg bg-white border p-2 transform transition-all duration-500 ease-in-out ${
                    isDropdownOpen
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 translate-y-4 scale-95"
                  } backdrop-blur-sm`}
                >
                  {userName ? (
                    // If the user is logged in, show additional options
                    <>
                      <Link
                        to="/profile"
                        className="block px-6 py-4 text-sm text-gray-800 hover:text-indigo-600 rounded-lg transition duration-300 transform hover:scale-105 hover:bg-indigo-50 border-b border-indigo-200"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block px-6 py-4 text-sm text-red-600 hover:text-red-800 rounded-lg transition duration-300 transform hover:scale-105 hover:bg-red-50 w-full text-left"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    // If not logged in, show login/signup options
                    <>
                      <Link
                        to="/user/signin"
                        className="block px-6 py-4 text-sm text-gray-800 hover:text-indigo-600 rounded-lg transition duration-300 transform hover:scale-105 hover:bg-indigo-50 border-b border-indigo-200"
                      >
                        Login as User
                      </Link>
                      <div className="px-6 py-4 text-sm text-gray-800">
                        <p>
                          New to CheckPlots?{" "}
                          <Link
                            to="/signup"
                            onClick={() => setIsDropdownOpen(false)}
                            className="text-indigo-600 hover:underline"
                          >
                            Sign up
                          </Link>
                        </p>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
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
        </nav>
      </div>

      {isSidebarOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-40 z-30" />
          <div
            ref={sidebarRef}
            className={`fixed z-50 top-0 left-0 h-full w-72 bg-gradient-to-b from-gray-800 via-gray-900 to-black text-white shadow-xl transition-transform duration-300 ease-in-out transform ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {/* Main content */}
            <div className="flex flex-col h-full flex-grow justify-between">
              <div>
                {/* Header */}
                <div className="flex py-8 px-4">
                  <h2 className="text-3xl font-extrabold text-transparent bg-clip-text text-white">
                    CheckPLots
                  </h2>
                </div>
                {/* Navigation Links */}
                <div className="space-y-6 px-4">
                  <SidebarButton
                    Icon={GlobalOutlined}
                    label="Language"
                    onClick={() => {}}
                  />
                  <SidebarButton
                    Icon={FileSearchOutlined}
                    label="List Property"
                    onClick={() => {}}
                  />
                  <SidebarButton
                    Icon={AppstoreAddOutlined}
                    label="Vendor Package"
                    onClick={() => {}}
                  />
                  <SidebarButton
                    Icon={DatabaseOutlined}
                    label="All Cities"
                    onClick={() => {}}
                  />
                  <SidebarButton
                    Icon={UsergroupAddOutlined}
                    label="Buying Guide"
                    onClick={() => {}}
                  />
                  <SidebarButton
                    Icon={InfoCircleOutlined}
                    label="About Us"
                    onClick={() => handleNavigation("/aboutus")}
                  />
                </div>
              </div>

              {/* Bottom buttons (horizontal layout) */}
              <div className="grid grid-cols-3 divide-x text-center text-black bg-white">
                <button
                  onClick={() => handleNavigation("/")}
                  className="py-2 hover:bg-gray-700 hover:text-white "
                >
                  <HomeOutlined />
                </button>
                <button
                  onClick={() => handleNavigation("/help")}
                  className="py-2 hover:bg-gray-700 hover:text-white "
                >
                  <CustomerServiceOutlined />
                </button>
                <button
                  onClick={() => handleNavigation("/contact")}
                  className="py-2 hover:bg-gray-700 hover:text-white  "
                >
                  <PhoneOutlined />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;

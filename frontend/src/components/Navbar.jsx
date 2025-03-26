import React, { useState, useCallback, useEffect, useRef } from "react";
import logo from "../assets/checkPlots.png";
import { Link, useNavigate } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";
import Sidebar from "./Sidebar"; // Import the Sidebar component
import { CiUser } from "react-icons/ci";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const sidebarRef = useRef(null);
  const sidebarButtonRef = useRef(null);
  const dropdownRef = useRef(null);
  const dropdownButtonRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const vendor = JSON.parse(localStorage.getItem("vendor"));
  const userName = user?.fullName;
  const vendorName = vendor?.fullName;

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const handleNavigation = useCallback(
    (path) => {
      setSidebarOpen(false);
      navigate(path);
    },
    [navigate]
  );

  // Logout function
  const handleLogout = () => {
    // Confirm logout and remove authentication token
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (!confirmed) return;

    // Clear the localStorage based on user type (user or vendor)
    if (user) {
      localStorage.removeItem("user");
    } else if (vendor) {
      localStorage.removeItem("vendor");
    }
    localStorage.removeItem("token");

    // Show a success toast notification
    toast.success("You have logged out successfully!");

    navigate("/");
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

  return (
    <>
      <div className="fixed w-full top-0 z-50 flex justify-center">
        <nav className="flex items-center w-full px-4 bg-white rounded-b-3xl shadow-md relative">
          <div onClick={() => navigate("/")}>
            <img
              src={logo}
              alt="logo"
              className="cursor-pointer h-16 md:h-20"
            />
          </div>

          <div className="absolute left-1/2 transform -translate-x-1/2">
            <ul className="space-x-8 text-gray-800 hidden md:flex">
              <li>
                <Link
                  to="/"
                  className="text-sm font-medium hover:text-indigo-600 transition duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-sm font-medium hover:text-indigo-600 transition duration-200"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm font-medium hover:text-indigo-600 transition duration-200"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link className="text-sm font-medium hover:text-indigo-600 transition duration-200">
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/aboutus"
                  className="text-sm font-medium hover:text-indigo-600 transition duration-200"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex items-center space-x-2 ml-auto">
            <div className="relative">
              <button
                ref={dropdownButtonRef}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center text-sm font-medium text-black transition-all duration-200 border md:px-3 md:py-2 p-2 md:rounded-lg rounded-full  hover:bg-gray-100"
              >
                {userName || vendorName ? (
                  <span className="mr-2 hidden md:block">👋</span>
                ) : (
                  <span className="mr-2 hidden md:block">🔑</span>
                )}
                <span className="hidden md:block">
                  {userName || vendorName
                    ? `Hi, ${userName || vendorName}`
                    : "Sign In"}
                </span>
                <RiArrowDropDownLine size={25} className="hidden md:block" />
                <CiUser className="block md:hidden" />
              </button>
              {isDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 mt-2 w-56 rounded-xl shadow-lg bg-white border p-2 transform transition-all duration-300 backdrop-blur-sm"
                >
                  {userName ? (
                    <>
                      <Link
                        to="/user/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:text-indigo-600 rounded-md transition duration-150"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block px-4 py-2 text-sm text-red-600 hover:text-red-800 rounded-md transition duration-150 w-full text-left"
                      >
                        Logout
                      </button>
                    </>
                  ) : vendorName ? (
                    <>
                      <Link
                        to="/vendor/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:text-indigo-600 rounded-md transition duration-150"
                      >
                        Vendor Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block px-4 py-2 text-sm text-red-600 hover:text-red-800 rounded-md transition duration-150 w-full text-left"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/user/signin"
                        className="block px-4 py-2 text-sm text-gray-700 hover:text-indigo-600 rounded-md transition duration-150"
                      >
                        Login as User
                      </Link>
                      <div className="px-4 py-2 text-sm text-gray-700">
                        <p>
                          New to CheckPlots?{" "}
                          <Link
                            to="/user/signup"
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

            <Link to="/property/post">
              <button className="hidden md:flex items-center px-3 py-2 border border-transparent rounded-lg hover:bg-gray-100 transition-all duration-200">
                <span className="mr-1 text-lg">📜</span>
                <span className="whitespace-nowrap text-sm font-medium">
                  List Property
                </span>
                <span className="ml-1 text-xs bg-red-500 text-white rounded-full px-2 py-1">
                  Free
                </span>
              </button>
            </Link>

            <label
              onClick={toggleSidebar}
              className="flex flex-col gap-1 w-6 cursor-pointer md:hidden"
            >
              <div
                className={`h-[2px] w-full bg-black rounded-full transition-all duration-200 transform ${
                  isSidebarOpen ? "rotate-45 translate-y-[6px]" : ""
                }`}
              />
              <div
                className={`h-[2px] w-full bg-black rounded-full transition-all duration-200 transform ${
                  isSidebarOpen ? "opacity-0" : ""
                }`}
              />
              <div
                className={`h-[2px] w-full bg-black rounded-full transition-all duration-200 transform ${
                  isSidebarOpen ? "-rotate-45 -translate-y-[6px]" : ""
                }`}
              />
            </label>
          </div>
        </nav>
      </div>

      <ToastContainer />

      <Sidebar
        isSidebarOpen={isSidebarOpen}
        handleNavigation={handleNavigation}
        toggleSidebar={toggleSidebar}
      />
    </>
  );
};

export default Navbar;

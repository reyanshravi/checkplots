// import React, { useState, useRef, useCallback, useEffect } from "react";
// import logo from "../assets/checkPlots.png";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   HomeOutlined,
//   PhoneOutlined,
//   InfoCircleOutlined,
//   GlobalOutlined,
//   FileSearchOutlined,
//   UsergroupAddOutlined,
// } from "@ant-design/icons";
// import { RiArrowDropDownLine } from "react-icons/ri";

// // Sidebar button component
// const SidebarButton = ({ Icon, label, onClick, className = "" }) => (
//   <button
//     onClick={onClick}
//     className={`flex items-center px-4 py-3 text-sm font-medium text-gray-600 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-300 w-full ${className}`}
//   >
//     <Icon className="mr-3 text-xl" />
//     <span className="text-sm">{label}</span>
//   </button>
// );

// // Logout confirmation popup component
// const LogoutPopup = ({ confirmLogout, cancelLogout }) => (
//   <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
//     <div className="rounded-lg bg-white p-8 shadow-2xl z-50">
//       <h2 className="text-lg font-bold">Are you sure you want to log out?</h2>
//       <p className="mt-2 text-sm text-gray-500">
//         Logging out will end your session. Are you 100% sure you want to log
//         out?
//       </p>
//       <div className="mt-4 flex gap-2">
//         <button
//           type="button"
//           onClick={confirmLogout}
//           className="rounded-sm bg-green-50 px-4 py-2 text-sm font-medium text-green-600"
//         >
//           Yes, log me out
//         </button>
//         <button
//           type="button"
//           onClick={cancelLogout}
//           className="rounded-sm bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600"
//         >
//           No, stay logged in
//         </button>
//       </div>
//     </div>
//   </div>
// );

// const Navbar = () => {
//   const [isSidebarOpen, setSidebarOpen] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isPopupVisible, setPopupVisible] = useState(false);

//   const sidebarRef = useRef(null);
//   const sidebarButtonRef = useRef(null);
//   const dropdownRef = useRef(null);
//   const dropdownButtonRef = useRef(null);
//   const navigate = useNavigate();

//   const user = JSON.parse(localStorage.getItem("user"));
//   const vendor = JSON.parse(localStorage.getItem("vendor"));
//   const userName = user?.fullName;
//   const vendorName = vendor?.fullName;

//   const toggleSidebar = () => setSidebarOpen((prev) => !prev);

//   const handleNavigation = useCallback(
//     (path) => {
//       setSidebarOpen(false);
//       navigate(path);
//     },
//     [navigate]
//   );

//   const confirmLogout = () => {
//     if (user) {
//       localStorage.removeItem("user");
//     } else if (vendor) {
//       localStorage.removeItem("vendor");
//     }

//     navigate("/");
//     setPopupVisible(false); // Close the popup after confirmation
//   };

//   const cancelLogout = () => setPopupVisible(false);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         sidebarRef.current &&
//         !sidebarRef.current.contains(event.target) &&
//         !sidebarButtonRef.current.contains(event.target)
//       ) {
//         setSidebarOpen(false);
//       }

//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target) &&
//         !dropdownButtonRef.current.contains(event.target)
//       ) {
//         setIsDropdownOpen(false);
//       }
//     };

//     if (isSidebarOpen || isDropdownOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isSidebarOpen, isDropdownOpen]);

//   return (
//     <>
//       <div className="fixed w-full top-0 z-50 flex justify-center">
//         {isPopupVisible && (
//           <LogoutPopup
//             confirmLogout={confirmLogout}
//             cancelLogout={cancelLogout}
//           />
//         )}

//         <nav className="flex items-center w-full px-4 bg-white rounded-b-3xl shadow-md relative">
//           <div onClick={() => navigate("/")}>
//             <img src={logo} alt="logo" className="h-20 cursor-pointer" />
//           </div>

//           {/* Centering the list items */}
//           <div className="absolute left-1/2 transform -translate-x-1/2">
//             <ul className=" space-x-8 text-gray-800 hidden md:flex">
//               <li>
//                 <Link
//                   to="/"
//                   className="text-sm font-medium hover:text-indigo-600 transition duration-200"
//                 >
//                   Home
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/services"
//                   className="text-sm font-medium hover:text-indigo-600 transition duration-200"
//                 >
//                   Services
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/contact"
//                   className="text-sm font-medium hover:text-indigo-600 transition duration-200"
//                 >
//                   Contact
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/blog"
//                   className="text-sm font-medium hover:text-indigo-600 transition duration-200"
//                 >
//                   Blog
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/aboutus"
//                   className="text-sm font-medium hover:text-indigo-600 transition duration-200"
//                 >
//                   About
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Right-aligned buttons */}
//           <div className="flex items-center space-x-4 ml-auto">
//             {/* Sign In button */}
//             <div className="relative">
//               <button
//                 ref={dropdownButtonRef}
//                 onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//                 className="hidden md:flex items-center text-sm font-medium text-black transition-all duration-200 border px-3 py-2 rounded-lg hover:bg-gray-100"
//               >
//                 {userName || vendorName ? (
//                   <span className="mr-2">👋</span>
//                 ) : (
//                   <span className="mr-2">🔑</span>
//                 )}
//                 <span>
//                   {userName || vendorName
//                     ? `Hi, ${userName || vendorName}`
//                     : "Sign In"}
//                 </span>
//                 <RiArrowDropDownLine size={25} />
//               </button>
//               {isDropdownOpen && (
//                 <div
//                   ref={dropdownRef}
//                   className="absolute right-0 mt-2 w-56 rounded-xl shadow-lg bg-white border p-2 transform transition-all duration-300 backdrop-blur-sm"
//                 >
//                   {userName ? (
//                     <>
//                       <Link
//                         to="/profile"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:text-indigo-600 rounded-md transition duration-150"
//                       >
//                         Profile
//                       </Link>
//                       <button
//                         onClick={() => setPopupVisible(true)}
//                         className="block px-4 py-2 text-sm text-red-600 hover:text-red-800 rounded-md transition duration-150 w-full text-left"
//                       >
//                         Logout
//                       </button>
//                     </>
//                   ) : vendorName ? (
//                     <>
//                       <Link
//                         to="/vendor/profile"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:text-indigo-600 rounded-md transition duration-150"
//                       >
//                         Vendor Profile
//                       </Link>
//                       <button
//                         onClick={() => setPopupVisible(true)}
//                         className="block px-4 py-2 text-sm text-red-600 hover:text-red-800 rounded-md transition duration-150 w-full text-left"
//                       >
//                         Logout
//                       </button>
//                     </>
//                   ) : (
//                     <>
//                       <Link
//                         to="/user/signin"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:text-indigo-600 rounded-md transition duration-150"
//                       >
//                         Login as User
//                       </Link>
//                       <div className="px-4 py-2 text-sm text-gray-700">
//                         <p>
//                           New to CheckPlots?{" "}
//                           <Link
//                             to="/signup"
//                             onClick={() => setIsDropdownOpen(false)}
//                             className="text-indigo-600 hover:underline"
//                           >
//                             Sign up
//                           </Link>
//                         </p>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               )}
//             </div>

//             {/* List Property button */}
//             <button className="hidden md:flex items-center px-3 py-2 border border-transparent rounded-lg hover:bg-gray-100 transition-all duration-200">
//               <span className="mr-1 text-lg">📜</span>
//               <span className="whitespace-nowrap text-sm font-medium">
//                 List Property
//               </span>
//               <span className="ml-1 text-xs bg-red-500 text-white rounded-full px-2 py-1">
//                 Free
//               </span>
//             </button>

//             {/* Hamburger menu for mobile */}
//             <label
//               ref={sidebarButtonRef}
//               onClick={toggleSidebar}
//               className="flex flex-col gap-2 w-8 cursor-pointer md:hidden"
//             >
//               <div
//                 className={`h-[3px] w-full bg-black rounded-full transition-all duration-200 transform ${
//                   isSidebarOpen ? "rotate-45 translate-y-[6px]" : ""
//                 }`}
//               />
//               <div
//                 className={`h-[3px] w-full bg-black rounded-full transition-all duration-200 transform ${
//                   isSidebarOpen ? "opacity-0" : ""
//                 }`}
//               />
//               <div
//                 className={`h-[3px] w-full bg-black rounded-full transition-all duration-200 transform ${
//                   isSidebarOpen ? "-rotate-45 -translate-y-[6px]" : ""
//                 }`}
//               />
//             </label>
//           </div>
//         </nav>
//       </div>

//       <div
//         ref={sidebarRef}
//         className={`${
//           isSidebarOpen ? "block" : "hidden"
//         } fixed top-0 left-0 z-50 w-64 bg-white shadow-xl py-8 rounded-br-3xl md:hidden transition-all duration-300`}
//       >
//         <div className="space-y-6 px-4">
//           <SidebarButton
//             Icon={HomeOutlined}
//             label="Home"
//             onClick={() => handleNavigation("/")}
//           />
//           <SidebarButton
//             Icon={InfoCircleOutlined}
//             label="About"
//             onClick={() => handleNavigation("/aboutus")}
//           />
//           <SidebarButton
//             Icon={FileSearchOutlined}
//             label="Search"
//             onClick={() => handleNavigation("/search")}
//           />
//           <SidebarButton
//             Icon={GlobalOutlined}
//             label="Services"
//             onClick={() => handleNavigation("/services")}
//           />
//           <SidebarButton
//             Icon={UsergroupAddOutlined}
//             label="Contact"
//             onClick={() => handleNavigation("/contact")}
//           />
//           <SidebarButton
//             Icon={PhoneOutlined}
//             label="Blog"
//             onClick={() => handleNavigation("/blog")}
//           />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Navbar;
import React, { useState, useCallback, useEffect, useRef } from "react";
import logo from "../assets/checkPlots.png";
import { Link, useNavigate } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";
import Sidebar from "./Sidebar"; // Import the Sidebar component

const Navbar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPopupVisible, setPopupVisible] = useState(false);

  const sidebarRef = useRef(null);
  const sidebarButtonRef = useRef(null);
  const dropdownRef = useRef(null);
  const dropdownButtonRef = useRef(null); // Define the ref here
  const navigate = useNavigate();

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

  // Logout confirmation popup component
  const LogoutPopup = ({ confirmLogout, cancelLogout }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="rounded-lg bg-white p-8 shadow-2xl z-50">
        <h2 className="text-lg font-bold">Are you sure you want to log out?</h2>
        <p className="mt-2 text-sm text-gray-500">
          Logging out will end your session. Are you 100% sure you want to log
          out?
        </p>
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={confirmLogout}
            className="rounded-sm bg-green-50 px-4 py-2 text-sm font-medium text-green-600"
          >
            Yes, log me out
          </button>
          <button
            type="button"
            onClick={cancelLogout}
            className="rounded-sm bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600"
          >
            No, stay logged in
          </button>
        </div>
      </div>
    </div>
  )

  const confirmLogout = () => {
    if (user) {
      localStorage.removeItem("user");
    } else if (vendor) {
      localStorage.removeItem("vendor");
    }

    navigate("/");
    setPopupVisible(false); // Close the popup after confirmation
  };

  const cancelLogout = () => setPopupVisible(false);

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
        !dropdownButtonRef.current.contains(event.target) // This ref is now defined
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
        {isPopupVisible && (
          <LogoutPopup
            confirmLogout={confirmLogout}
            cancelLogout={cancelLogout}
          />
        )}

        <nav className="flex items-center w-full px-4 bg-white rounded-b-3xl shadow-md relative">
          <div onClick={() => navigate("/")}>
            <img src={logo} alt="logo" className="h-20 cursor-pointer" />
          </div>

          <div className="absolute left-1/2 transform -translate-x-1/2">
            <ul className=" space-x-8 text-gray-800 hidden md:flex">
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
                <Link
                  to="/blog"
                  className="text-sm font-medium hover:text-indigo-600 transition duration-200"
                >
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

          <div className="flex items-center space-x-4 ml-auto">
            <div className="relative">
              <button
                ref={dropdownButtonRef}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="hidden md:flex items-center text-sm font-medium text-black transition-all duration-200 border px-3 py-2 rounded-lg hover:bg-gray-100"
              >
                {userName || vendorName ? (
                  <span className="mr-2">👋</span>
                ) : (
                  <span className="mr-2">🔑</span>
                )}
                <span>
                  {userName || vendorName
                    ? `Hi, ${userName || vendorName}`
                    : "Sign In"}
                </span>
                <RiArrowDropDownLine size={25} />
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
                        onClick={() => setPopupVisible(true)}
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
                        onClick={() => setPopupVisible(true)}
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
              className="flex flex-col gap-2 w-8 cursor-pointer md:hidden"
            >
              <div
                className={`h-[3px] w-full bg-black rounded-full transition-all duration-200 transform ${
                  isSidebarOpen ? "rotate-45 translate-y-[6px]" : ""
                }`}
              />
              <div
                className={`h-[3px] w-full bg-black rounded-full transition-all duration-200 transform ${
                  isSidebarOpen ? "opacity-0" : ""
                }`}
              />
              <div
                className={`h-[3px] w-full bg-black rounded-full transition-all duration-200 transform ${
                  isSidebarOpen ? "-rotate-45 -translate-y-[6px]" : ""
                }`}
              />
            </label>
          </div>
        </nav>
      </div>

      <Sidebar
        isSidebarOpen={isSidebarOpen}
        handleNavigation={handleNavigation}
        toggleSidebar={toggleSidebar}
      />
    </>
  );
};

export default Navbar;

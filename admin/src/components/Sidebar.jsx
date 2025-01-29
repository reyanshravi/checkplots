import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  IoSettingsOutline,
  IoPeopleOutline,
  IoBusinessOutline,
  IoHomeOutline,
  IoLibraryOutline,
  IoDesktopOutline,
  IoLogOutOutline,
} from "react-icons/io5";
import { SiAffinitydesigner } from "react-icons/si";

const Sidebar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token
    alert("Logged out successfully");
    navigate("/"); // Redirect to the login page
  };

  const links = [
    { name: "Dashboard", path: "/dashboard", icon: <IoDesktopOutline /> },
    { name: "Properties", path: "/properties", icon: <IoHomeOutline /> },
    {
      name: "Interior",
      path: "/interior",
      icon: <IoLibraryOutline />,
    },
    { name: "Hotels", path: "/hotels", icon: <IoBusinessOutline /> },
    { name: "Users", path: "/users", icon: <IoPeopleOutline /> },
    { name: "Vendors", path: "/vendors", icon: <IoPeopleOutline /> },
    { name: "Settings", path: "/settings", icon: <IoSettingsOutline /> },
  ];

  return (
    <div className="w-64 min-h-screen bg-gray-800 text-white">
      <div className="px-6 py-4">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
      </div>
      <ul>
        {links.map((link) => (
          <li key={link.name}>
            <Link
              to={link.path}
              className="px-6 py-2 hover:bg-gray-700 flex items-center justify-start gap-2"
            >
              {link.icon} {link.name}
            </Link>
          </li>
        ))}
        <li className="px-6 py-2 hover:bg-gray-700 flex items-center justify-start gap-2">
          <IoLogOutOutline />
          <button
            className=" py-2 text-red-300 font-bold"
            onClick={handleLogout}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

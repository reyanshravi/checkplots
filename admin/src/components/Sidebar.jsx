import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const links = [
    { name: "Dashboard", path: "/" },
    { name: "Properties", path: "/properties" },
    { name: "Interior", path: "/interior" },
    { name: "Hotels", path: "/hotels" },
    { name: "Users", path: "/users" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <div className="w-64 min-h-screen bg-gray-800 text-white">
      <div className="px-6 py-4">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
      </div>
      <ul>
        {links.map((link) => (
          <li key={link.name} className="px-6 py-2 hover:bg-gray-700">
            <Link to={link.path}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

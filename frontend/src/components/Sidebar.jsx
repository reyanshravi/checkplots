import React from 'react';
import SidebarButton from './SidebarButton';
import { useNavigate } from "react-router-dom";
import { HomeOutlined, PhoneOutlined, InfoCircleOutlined, GlobalOutlined, FileSearchOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { CloseOutlined } from "@ant-design/icons"; // Close icon for the sidebar

const Sidebar = ({ isSidebarOpen, handleNavigation, toggleSidebar }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } fixed top-0 left-0 bottom-0 z-50 w-64 bg-white shadow-xl py-8 rounded-br-3xl md:hidden transition-transform duration-300 h-full`}
    >
      <div className="flex justify-between items-center px-4 mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Menu</h2>
        <button
          onClick={toggleSidebar}
          className="text-gray-800 hover:text-gray-600 focus:outline-none"
        >
          <CloseOutlined />
        </button>
      </div>

      <div className="space-y-6 px-4">
        <SidebarButton
          Icon={HomeOutlined}
          label="Home"
          onClick={() => handleNavigation("/")}
        />
        <SidebarButton
          Icon={InfoCircleOutlined}
          label="About"
          onClick={() => handleNavigation("/aboutus")}
        />
        <SidebarButton
          Icon={FileSearchOutlined}
          label="Search"
          onClick={() => handleNavigation("/search")}
        />
        <SidebarButton
          Icon={GlobalOutlined}
          label="Services"
          onClick={() => handleNavigation("/services")}
        />
        <SidebarButton
          Icon={UsergroupAddOutlined}
          label="Contact"
          onClick={() => handleNavigation("/contact")}
        />
        <SidebarButton
          Icon={PhoneOutlined}
          label="Blog"
          onClick={() => handleNavigation("/blog")}
        />
      </div>
    </div>
  );
};

export default Sidebar;

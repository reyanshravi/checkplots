import React from 'react';
import  SidebarButton  from './SidebarButton'; 
import { Link, useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  PhoneOutlined,
  InfoCircleOutlined,
  GlobalOutlined,
  FileSearchOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";

const Sidebar = ({ isSidebarOpen, handleNavigation, toggleSidebar }) => {
  return (
    <div
      className={`${
        isSidebarOpen ? "block" : "hidden"
      } fixed top-0 left-0 z-50 w-64 bg-white bg-opacity-70 shadow-xl py-8 rounded-br-3xl md:hidden transition-all duration-300 h-full`}
    >
      <div className="space-y-6 px-4 ">
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

import React, { useState, useCallback } from "react";
import { FiUser, FiSettings, FiMail } from "react-icons/fi";
import { FaBuilding, FaHotel, FaCouch } from "react-icons/fa";
import ProfileTab from "./ProfileTab";
import PropertiesTab from "./PropertiesTab";
import HotelsTab from "./HotelsTab";
import InteriorTab from "./InteriorTab";
import EnquiryTab from "./EnquiryTab";
import SettingsTab from "./SettingsTab";
import TabButton from "../../components/TabButton";
import DropdownMenu from "../../components/DropdownMenu";
import NavButton from "../../components/NavButton";

const tabConfig = [
  { id: "profile", label: "Profile", icon: FiUser, component: <ProfileTab /> },
  {
    id: "properties",
    label: "Properties",
    icon: FaBuilding,
    component: <PropertiesTab />,
  },
  { id: "hotels", label: "Hotels", icon: FaHotel, component: <HotelsTab /> },
  {
    id: "interior",
    label: "Interior",
    icon: FaCouch,
    component: <InteriorTab />,
  },
  {
    id: "enquires",
    label: "Enquires",
    icon: FiMail,
    component: <EnquiryTab />,
  },
  {
    id: "settings",
    label: "Settings",
    icon: FiSettings,
    component: <SettingsTab />,
  },
];

const VendorDashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
  }, []);

  const handleDropdownToggle = useCallback(() => {
    setIsDropdownOpen((prev) => !prev);
  }, []);

  const handleLogout = useCallback(() => {
    console.log("Logging out...");
    // navigate("/login"); // Uncomment to navigate to the login page
  }, []);

  const renderTabContent = () => {
    const activeTabConfig = tabConfig.find((tab) => tab.id === activeTab);
    return activeTabConfig ? activeTabConfig.component : null;
  };

  const renderTabButtons = (isSidebar) => {
    return tabConfig.map(({ id, label, icon }) => (
      <TabButton
        key={id}
        icon={icon}
        label={label}
        isActive={activeTab === id}
        onClick={() => handleTabChange(id)}
        isSidebar={isSidebar}
      />
    ));
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 ">
      {/* Navbar */}
      <div className="w-full bg-gray-800 text-white py-4 px-6 flex justify-between items-center shadow-md">
        <h1 className="text-3xl font-semibold tracking-tight text-white">
          Vendor Dashboard
        </h1>
        <DropdownMenu
          isOpen={isDropdownOpen}
          onToggle={handleDropdownToggle}
          onLogout={handleLogout}
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="bg-white w-64 p-6 shadow-lg border-b-2 lg:border-r-2 lg:border-gray-200 lg:flex-shrink-0 hidden lg:block">
          <div className="space-y-4">{renderTabButtons(true)}</div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-lg overflow-y-auto m-4">
          {renderTabContent()}
        </div>
      </div>

      {/* Bottom Navigation (Mobile) */}
      <div className="lg:hidden fixed bottom-0 w-full bg-gray-800 text-white shadow-md p-4">
        <div className="flex justify-around items-center">
          {renderTabButtons(false).map((button, index) => (
            <NavButton
              key={index}
              icon={button.props.icon}
              label={button.props.label}
              onClick={button.props.onClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;

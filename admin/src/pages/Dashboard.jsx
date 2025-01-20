import React from "react";
import DashboardCard from "../components/DashboardCard";
import { FaHome, FaUsers, FaChartLine } from "react-icons/fa";
import { LiaHotelSolid } from "react-icons/lia";
import { SiAffinitydesigner } from "react-icons/si";

const Dashboard = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard
          title="Properties"
          value="150"
          icon={<FaHome size={24} />}
        />
        <DashboardCard
          title="Hotels Count"
          value="2,500"
          icon={<LiaHotelSolid size={24} />}
        />
        <DashboardCard
          title="Interior Designs"
          value="101"
          icon={<SiAffinitydesigner size={24} />}
        />

        <DashboardCard
          title="Users"
          value="1200"
          icon={<FaUsers size={24} />}
        />
        <DashboardCard
          title="Revenue"
          value="$25,000"
          icon={<FaChartLine size={24} />}
        />
      </div>
    </div>
  );
};

export default Dashboard;

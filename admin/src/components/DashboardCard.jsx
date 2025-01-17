import React from "react";

const DashboardCard = ({ title, value, icon }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex items-center">
      <div className="p-4 bg-blue-100 rounded-full">{icon}</div>
      <div className="ml-4">
        <h4 className="text-lg font-semibold">{title}</h4>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default DashboardCard;

import React, { useState } from "react";
import { FaRegCheckCircle, FaRegClock } from "react-icons/fa";
import { BsCardList } from "react-icons/bs";
import { VscTable } from "react-icons/vsc";
import { BsSearch } from "react-icons/bs";

const OrdersTab = () => {
  const dummyOrders = [
    {
      id: 1,
      orderNumber: "12345",
      property: "Downtown Apartment",
      status: "Completed",
      date: "2025-01-20",
    },
    {
      id: 2,
      orderNumber: "12346",
      property: "Beachfront Villa",
      status: "Pending",
      date: "2025-02-10",
    },
    {
      id: 3,
      orderNumber: "12347",
      property: "Mountain Cabin",
      status: "Completed",
      date: "2025-02-01",
    },
  ];

  const [orders, setOrders] = useState(dummyOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [view, setView] = useState("card");

  // Filter orders based on search term and status
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.property
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const toggleView = (viewMode) => {
    setView(viewMode);
  };

  return (
    <div className="orders-tab bg-gray-50 p-6 rounded-lg shadow-lg w-full h-full mx-auto space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Orders</h2>

      {/* Search & Filter Section */}
      <div className="flex justify-between items-center space-x-4 mb-4">
        {/* View Toggle Buttons */}
        <div className="inline-flex">
          <button
            onClick={() => toggleView("card")}
            className={`p-2 border rounded-l-md ${
              view === "card" ? "bg-gray-100" : "hover:bg-gray-50"
            }`}
          >
            <BsCardList className="h-4 w-4" />
          </button>
          <button
            onClick={() => toggleView("table")}
            className={`p-2 border rounded-r-md ${
              view === "table" ? "bg-gray-100" : "hover:bg-gray-50"
            }`}
          >
            <VscTable className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-white border border-gray-300 rounded-md p-2">
            <BsSearch className="text-gray-500" />
            <input
              type="text"
              placeholder="Search by property"
              className="w-full text-sm outline-none bg-transparent "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="p-2 border border-gray-300 rounded-md text-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Display Orders - Card or Table View */}
      {view === "card" ? (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="flex justify-between items-center p-4 border rounded-md shadow-sm hover:shadow-lg transition duration-200"
            >
              <div>
                <p className="text-sm font-medium text-gray-700">
                  {order.property}
                </p>
                <p className="text-xs text-gray-500">
                  Order Number: {order.orderNumber}
                </p>
                <p className="text-xs text-gray-500">Date: {order.date}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    order.status === "Completed"
                      ? "bg-green-200 text-green-700"
                      : "bg-yellow-200 text-yellow-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <table className="w-full table-auto text-sm">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-2 text-left">Property</th>
              <th className="px-4 py-2 text-left">Order Number</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-100">
                <td className="px-4 py-2">{order.property}</td>
                <td className="px-4 py-2">{order.orderNumber}</td>
                <td className="px-4 py-2">{order.date}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      order.status === "Completed"
                        ? "bg-green-200 text-green-700"
                        : "bg-yellow-200 text-yellow-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrdersTab;

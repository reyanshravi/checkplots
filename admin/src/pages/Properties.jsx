import React from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import PaginationBar from "../components/PaginationBar";

const Properties = () => {
  const navigate = useNavigate();

  const handleCreateClick = () => {
    navigate("./CreateProperty"); // Navigate to CreateProperty page
  };

  const dummyData = [
    {
      id: 1,
      image: "https://via.placeholder.com/50",
      name: "Greenwood Villas",
      amount: "8,450",
      code: "GV123",
      date: "2024-03-15",
      status: "Renting",
      approval: "Approved",
    },
    {
      id: 2,
      image: "https://via.placeholder.com/50",
      name: "Silverstone Residences",
      amount: "5,678",
      code: "SS456",
      date: "2024-07-21",
      status: "Selling",
      approval: "Pending",
    },
    {
      id: 3,
      image: "https://via.placeholder.com/50",
      name: "Lakeside Apartments",
      amount: "9,020",
      code: "LA789",
      date: "2024-02-10",
      status: "Renting",
      approval: "Approved",
    },
    {
      id: 4,
      image: "https://via.placeholder.com/50",
      name: "Hilltop Homes",
      amount: "6,200",
      code: "HH101",
      date: "2024-05-18",
      status: "Selling",
      approval: "Pending",
    },
    {
      id: 5,
      image: "https://via.placeholder.com/50",
      name: "Oceanview Condos",
      amount: "7,345",
      code: "OC111",
      date: "2024-11-07",
      status: "Renting",
      approval: "Approved",
    },
    {
      id: 6,
      image: "https://via.placeholder.com/50",
      name: "Pinewood Estates",
      amount: "8,750",
      code: "PE222",
      date: "2024-04-22",
      status: "Selling",
      approval: "Pending",
    },
    {
      id: 7,
      image: "https://via.placeholder.com/50",
      name: "Maplewood Flats",
      amount: "4,567",
      code: "MF333",
      date: "2024-09-12",
      status: "Renting",
      approval: "Approved",
    },
    {
      id: 8,
      image: "https://via.placeholder.com/50",
      name: "Sunset Villas",
      amount: "10,200",
      code: "SV444",
      date: "2024-06-30",
      status: "Selling",
      approval: "Pending",
    },
    {
      id: 9,
      image: "https://via.placeholder.com/50",
      name: "Golden Sands Apartments",
      amount: "5,400",
      code: "GSA555",
      date: "2024-08-05",
      status: "Renting",
      approval: "Approved",
    },
    {
      id: 10,
      image: "https://via.placeholder.com/50",
      name: "Cedar Heights",
      amount: "9,800",
      code: "CH666",
      date: "2024-10-14",
      status: "Selling",
      approval: "Pending",
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Dashboard / Properties</h2>
      <div className="flex justify-between items-center mb-4">
        <div>
          {/* <button className="px-4 py-2 bg-gray-200 rounded-md mr-2">
            Bulk Actions
          </button> */}
          <button className="px-4 py-2 bg-gray-200 rounded-md">Filters</button>
        </div>
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 border rounded-md"
        />
        <div>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2  text-center"
            onClick={handleCreateClick}
          >
            Create
          </button>
          {/* <button className="px-4 py-2 bg-gray-200 rounded-md mr-2">
            Import Properties
          </button>
          <button className="px-4 py-2 bg-gray-200 rounded-md mr-2">
            Export Properties
          </button> */}
          <button className="px-4 py-2 bg-gray-200 rounded-md">Reload</button>
        </div>
      </div>
      <table className="w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 text-left">ID</th>
            <th className="py-2 px-4 text-left">Image</th>
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Views</th>
            <th className="py-2 px-4 text-left">Unique ID</th>
            <th className="py-2 px-4 text-left">Created At</th>
            <th className="py-2 px-4 text-left">Status</th>
            <th className="py-2 px-4 text-left">Moderation Status</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {dummyData.map((row) => (
            <tr key={row.id}>
              <td className="py-2 px-4">{row.id}</td>
              <td className="py-2 px-4">
                <img
                  src={row.image}
                  alt={row.name}
                  className="w-12 h-12 object-cover rounded-md"
                />
              </td>
              <td className="py-2 px-4">{row.name}</td>
              <td className="py-2 px-4">{row.amount}</td>
              <td className="py-2 px-4">{row.code}</td>
              <td className="py-2 px-4">{row.date}</td>
              <td className="py-2 px-4">
                <span
                  className={`px-2 py-1 rounded-md ${
                    row.status === "Renting"
                      ? "bg-green-200 text-green-800"
                      : "bg-yellow-200 text-yellow-800"
                  }`}
                >
                  {row.status}
                </span>
              </td>
              <td className="py-2 px-4">{row.approval}</td>
              <td className="py-2 px-4">
                <button className="px-3 py-1 bg-blue-500 text-white rounded-md mr-2">
                  <FaEdit />
                </button>
                <button className="px-3 py-1 bg-red-500 text-white rounded-md">
                  <MdDeleteForever />
                </button>
              </td>
            </tr>
          ))}

          {/* Add more rows based on your data */}
        </tbody>
      </table>
      <PaginationBar totalRecords={10} />
    </div>
  );
};

export default Properties;

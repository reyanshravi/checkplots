import React from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import PaginationBar from "../components/PaginationBar";

const Hotels = () => {
  const navigate = useNavigate();

  const handleCreateClick = () => {
    navigate("./CreateHotel"); // Navigate to CreateProperty page
  };

  const hotelData = [
    {
      id: 1,
      image: "https://via.placeholder.com/50",
      name: "Grand Plaza Hotel",
      amount: "12,500",
      code: "GP123",
      date: "2024-03-10",
      status: "Vacant",
      price: "999",
    },
    {
      id: 2,
      image: "https://via.placeholder.com/50",
      name: "Sea Breeze Resort",
      amount: "15,800",
      code: "SB456",
      date: "2024-04-25",
      status: "Reserved",
      price: "1995",
    },
    {
      id: 3,
      image: "https://via.placeholder.com/50",
      name: "Mountain View Lodge",
      amount: "10,200",
      code: "MV789",
      date: "2024-05-12",
      status: "Vacant",
      price: "1995",
    },
    {
      id: 4,
      image: "https://via.placeholder.com/50",
      name: "Royal Orchid Suites",
      amount: "18,000",
      code: "RO101",
      date: "2024-06-30",
      status: "Reserved",
      price: "1995",
    },
    {
      id: 5,
      image: "https://via.placeholder.com/50",
      name: "Palm Paradise Inn",
      amount: "14,750",
      code: "PP111",
      date: "2024-07-20",
      status: "Vacant",
      price: "2995",
    },
    {
      id: 6,
      image: "https://via.placeholder.com/50",
      name: "Skyline Tower Hotel",
      amount: "20,400",
      code: "ST222",
      date: "2024-08-15",
      status: "Reserved",
      price: "1995",
    },
    {
      id: 7,
      image: "https://via.placeholder.com/50",
      name: "Lakeview Retreat",
      amount: "8,900",
      code: "LR333",
      date: "2024-09-05",
      status: "Vacant",
      price: "1995",
    },
    {
      id: 8,
      image: "https://via.placeholder.com/50",
      name: "Golden Horizon Hotel",
      amount: "11,300",
      code: "GH444",
      date: "2024-10-10",
      status: "Reserved",
      price: "1999",
    },
    {
      id: 9,
      image: "https://via.placeholder.com/50",
      name: "Emerald Bay Suites",
      amount: "13,600",
      code: "EB555",
      date: "2024-11-01",
      status: "Vacant",
      price: "1995",
    },
    {
      id: 10,
      image: "https://via.placeholder.com/50",
      name: "Sunrise Luxury Inn",
      amount: "16,500",
      code: "SL666",
      date: "2024-12-15",
      status: "Reserved",
      price: "3000",
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard / Hotels</h2>
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
            <th className="py-2 px-4 text-left">Price</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {hotelData.map((row) => (
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
                    row.status === "Vacant"
                      ? "bg-green-200 text-green-800"
                      : "bg-yellow-200 text-yellow-800"
                  }`}
                >
                  {row.status}
                </span>
              </td>
              <td className="py-2 px-4">{row.price}</td>
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

export default Hotels;

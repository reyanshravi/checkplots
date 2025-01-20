import React from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import PaginationBar from "../components/PaginationBar";
import { LiaRupeeSignSolid } from "react-icons/lia";

const Interior = () => {
  const navigate = useNavigate();

  const handleCreateClick = () => {
    navigate("./CreateInterior"); // Navigate to CreateInterior page
  };

  const interiorDesignData = [
    {
      id: 1,
      image: "https://via.placeholder.com/50",
      name: "Modern Living Spaces",
      amount: "12,500",
      code: "ML123",
      date: "2024-03-10",
      status: "Active",
      pricePerSqFt: "999",
      segment: "Normal",
    },
    {
      id: 2,
      image: "https://via.placeholder.com/50",
      name: "Coastal Comfort Designs",
      amount: "15,800",
      code: "CC456",
      date: "2024-04-25",
      status: "Inactive",
      pricePerSqFt: "1995",
      segment: "Moderate",
    },
    {
      id: 3,
      image: "https://via.placeholder.com/50",
      name: "Mountain Elegance Interiors",
      amount: "10,200",
      code: "ME789",
      date: "2024-05-12",
      status: "Active",
      pricePerSqFt: "1995",
      segment: "Normal",
    },
    {
      id: 4,
      image: "https://via.placeholder.com/50",
      name: "Royal Heritage Designs",
      amount: "18,000",
      code: "RH101",
      date: "2024-06-30",
      status: "Inactive",
      pricePerSqFt: "1995",
      segment: "Premium",
    },
    {
      id: 5,
      image: "https://via.placeholder.com/50",
      name: "Tropical Paradise Interiors",
      amount: "14,750",
      code: "TP111",
      date: "2024-07-20",
      status: "Active",
      pricePerSqFt: "2995",
      segment: "Moderate",
    },
    {
      id: 6,
      image: "https://via.placeholder.com/50",
      name: "Skyline Design Studio",
      amount: "20,400",
      code: "SD222",
      date: "2024-08-15",
      status: "Inactive",
      pricePerSqFt: "1995",
      segment: "Premium",
    },
    {
      id: 7,
      image: "https://via.placeholder.com/50",
      name: "Lakeside Interior Concepts",
      amount: "8,900",
      code: "LI333",
      date: "2024-09-05",
      status: "Active",
      pricePerSqFt: "1995",
      segment: "Normal",
    },
    {
      id: 8,
      image: "https://via.placeholder.com/50",
      name: "Golden Horizon Designs",
      amount: "11,300",
      code: "GH444",
      date: "2024-10-10",
      segment: "Premium",
      status: "Inactive",
      pricePerSqFt: "1999",
    },
    {
      id: 9,
      image: "https://via.placeholder.com/50",
      name: "Emerald Bay Interiors",
      amount: "13,600",
      code: "EB555",
      date: "2024-11-01",
      segment: "Premium",
      status: "Active",
      pricePerSqFt: "1995",
    },
    {
      id: 10,
      image: "https://via.placeholder.com/50",
      name: "Sunrise Creative Studio",
      amount: "16,500",
      code: "SC666",
      segment: "Premium",
      date: "2024-12-15",
      status: "Inactive",
      pricePerSqFt: "3000",
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Dashboard / Interiors</h2>
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
            <th className="py-2 px-4 text-left">Design ID</th>
            <th className="py-2 px-4 text-left">Segment</th>
            <th className="py-2 px-4 text-left">Created At</th>
            <th className="py-2 px-4 text-left">Status</th>
            <th className="py-2 px-4 text-left">Price</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {interiorDesignData.map((row) => (
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

              <td className="py-2 px-4">{row.segment}</td>
              <td className="py-2 px-4">{row.date}</td>
              <td className="py-2 px-4">
                <span
                  className={`px-2 py-1 rounded-md ${
                    row.status === "Active"
                      ? "bg-green-200 text-green-800"
                      : "bg-yellow-200 text-yellow-800"
                  }`}
                >
                  {row.status}
                </span>
              </td>
              <td className="py-2 px-4 flex items-center">
                <LiaRupeeSignSolid />
                {row.pricePerSqFt}
              </td>
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

export default Interior;

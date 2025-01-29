import React from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import PaginationBar from "../components/PaginationBar";

const Users = () => {
  // Dummy data
  const userData = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      mobile: "1234567890",
      role: "Admin",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      mobile: "2345678901",
      role: "User",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Mike Ross",
      email: "mike@example.com",
      mobile: "3456789012",
      role: "Moderator",
      status: "Active",
    },
    {
      id: 4,
      name: "Rachel Green",
      email: "rachel@example.com",
      mobile: "4567890123",
      role: "User",
      status: "Active",
    },
    {
      id: 5,
      name: "Joey Tribbiani",
      email: "joey@example.com",
      mobile: "5678901234",
      role: "User",
      status: "Inactive",
    },
    {
      id: 6,
      name: "Ross Geller",
      email: "ross@example.com",
      mobile: "6789012345",
      role: "Admin",
      status: "Active",
    },
    {
      id: 7,
      name: "Monica Geller",
      email: "monica@example.com",
      mobile: "7890123456",
      role: "Moderator",
      status: "Inactive",
    },
    {
      id: 8,
      name: "Chandler Bing",
      email: "chandler@example.com",
      mobile: "8901234567",
      role: "User",
      status: "Active",
    },
    {
      id: 9,
      name: "Phoebe Buffay",
      email: "phoebe@example.com",
      mobile: "9012345678",
      role: "User",
      status: "Active",
    },
    {
      id: 10,
      name: "Gunther",
      email: "gunther@example.com",
      mobile: "0123456789",
      role: "Support",
      status: "Inactive",
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
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
            // onClick={handleCreateClick}
          >
            Add User
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
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Email</th>
            <th className="py-2 px-4 text-left">Mobile</th>
            <th className="py-2 px-4 text-left">Role</th>
            <th className="py-2 px-4 text-left">Status</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => (
            <tr key={user.id}>
              <td className="py-2 px-4">{user.id}</td>
              <td className="py-2 px-4">{user.name}</td>
              <td className="py-2 px-4">{user.email}</td>
              <td className="py-2 px-4">{user.mobile}</td>
              <td className="py-2 px-4">{user.role}</td>
              <td className="py-2 px-4">
                <span
                  className={`px-2 py-1 rounded-md ${
                    user.status === "Active"
                      ? "bg-green-200 text-green-800"
                      : "bg-yellow-200 text-yellow-800"
                  }`}
                >
                  {user.status}
                </span>
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
        </tbody>
      </table>
      <PaginationBar totalRecords={10} />
    </div>
  );
};

export default Users;

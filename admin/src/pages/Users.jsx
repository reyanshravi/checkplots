import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import PaginationBar from "../components/PaginationBar";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:7002/api/auth/users");
      setUsers(response.data.users);
      setLoading(false);
      console.log(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const viewDetails = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 border rounded-md"
          value={searchTerm}
          onChange={handleSearch}
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={fetchUsers}
        >
          Reload
        </button>
      </div>

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table className="w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left">ID</th>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Mobile</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">More</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user._id}>
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{user.fullName}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">{user.phone}</td>
                <td className="py-2 px-4">
                  <span
                    className={`px-3 py-1 rounded-md text-white text-sm ${
                      selectedUser.status.toLowerCase() === "active"
                        ? "bg-green-500"
                        : selectedUser.status.toLowerCase() === "inactive"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  >
                    {selectedUser.status.toUpperCase()}
                  </span>
                </td>
                <td className="py-2 px-4">
                  <button
                    className="px-3 py-1 bg-blue-500 text-white rounded-md mr-2"
                    onClick={() => viewDetails(user)}
                  >
                    <FaEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <PaginationBar totalRecords={users.length} />

      {/* User Details Modal */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-2xl shadow-lg w-1/2 max-w-2xl">
            <div className="flex justify-between items-center border-b pb-4">
              <h3 className="text-2xl font-bold text-gray-800">User Details</h3>
              <button
                className="text-gray-500 hover:text-gray-800 text-xl"
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-4 text-gray-700">
              <p className="flex items-center">
                <span className="font-semibold w-40">Name:</span>{" "}
                {selectedUser.fullName}
              </p>
              <p className="flex items-center">
                <span className="font-semibold w-40">Email:</span>{" "}
                {selectedUser.email}
              </p>
              <p className="flex items-center">
                <span className="font-semibold w-40">Mobile:</span>{" "}
                {selectedUser.phone}
              </p>
              {/* dob */}
              <p className="flex items-center">
                <span className="font-semibold w-40">Date of Birth:</span>{" "}
                {new Date(selectedUser.dob).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </p>

              {/* address */}
              <p className="flex items-center">
                <span className="font-semibold w-40">Address:</span>{" "}
                {[selectedUser.city, selectedUser.state, selectedUser.country]
                  .filter(Boolean)
                  .join(", ")}
              </p>

              <p className="flex items-center">
                <span className="font-semibold w-40">Created At:</span>{" "}
                {new Date(selectedUser.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}{" "}
                (
                {new Date(selectedUser.createdAt).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
                )
              </p>

              <p className="flex items-center">
                <span className="font-semibold w-40">Status:</span>
                <span
                  className={`px-3 py-1 rounded-md text-white text-sm ${
                    selectedUser.status.toLowerCase() === "active"
                      ? "bg-green-500"
                      : selectedUser.status.toLowerCase() === "inactive"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                >
                  {selectedUser.status.toUpperCase()}
                </span>
              </p>
            </div>

            <div className="flex justify-end mt-6">
              <button
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;

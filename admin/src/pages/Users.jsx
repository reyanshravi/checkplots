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
  const [newStatus, setNewStatus] = useState("");
  const [showStatusPopup, setShowStatusPopup] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:7002/api/auth/allUsers"
      );
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

  const openStatusPopup = (user) => {
    setSelectedUser(user);
    setNewStatus(user.status);
    setShowStatusPopup(true);
  };

  const closeStatusPopup = () => {
    setSelectedUser(null);
    setShowStatusPopup(false);
  };

  const handleStatusUpdate = async () => {
    if (!selectedUser) return;
    try {
      const response = await axios.put(
        `http://localhost:7002/api/auth/${selectedUser._id}/updateStatus`,
        { status: newStatus }
      );
      if (response.status === 200) {
        alert("User status updated successfully!");
        fetchUsers();
        closeStatusPopup();
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update user status.");
    }
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
              <th className="py-2 px-4 text-left">Address</th>
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
                  {user.state.charAt(0).toUpperCase() +
                    user.state.slice(1).toLowerCase()}
                  ,
                  {user.country.charAt(0).toUpperCase() +
                    user.country.slice(1).toLowerCase()}
                </td>

                <td className="py-2 px-4">
                  <button
                    onClick={() => openStatusPopup(user)}
                    className={`px-3 py-1 rounded-md text-white text-sm ${
                      user.status.toLowerCase() === "active"
                        ? "bg-green-500"
                        : user.status.toLowerCase() === "pending"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  >
                    {user.status.toUpperCase()}
                  </button>
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

      {showStatusPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-semibold mb-4">Update Status</h3>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="inactive">Inactive</option>
            </select>
            <div className="flex justify-end mt-4">
              <button
                onClick={closeStatusPopup}
                className="px-4 py-2 bg-gray-300 rounded-md mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleStatusUpdate}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;

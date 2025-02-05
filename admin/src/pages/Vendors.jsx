import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import PaginationBar from "../components/PaginationBar";

const Users = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showStatusPopup, setShowStatusPopup] = useState(false);
  const [currentStatusVendor, setCurrentStatusVendor] = useState(null);

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const response = await axios.get(
        "http://localhost:7002/api/vendor/allVendors"
      ); // API endpoint
      setVendors(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching vendors:", error);
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredVendors = vendors.filter(
    (vendor) =>
      vendor.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openStatusPopup = (vendor) => {
    setSelectedVendor(vendor);
    setNewStatus(vendor.status);
    setShowPopup(true);
  };

  const closeStatusPopup = () => {
    setSelectedVendor(null);
    setShowPopup(false);
  };

  // Change Vendor Status
  const handleStatusUpdate = async () => {
    if (!selectedVendor) return;

    try {
      const response = await axios.put(
        `http://localhost:7002/api/vendor/${selectedVendor._id}/updateStatus`,
        { status: newStatus }
      );

      if (response.status === 200) {
        alert("Vendor status updated successfully!");
        fetchVendors(); // Refresh the list
        closeStatusPopup();
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update vendor status.");
    }
  };

  // Open Modal with Vendor Details
  const viewDetails = (vendor) => {
    setSelectedVendor(vendor);
    setShowModal(true);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Vendors</h2>
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
          onClick={fetchVendors}
        >
          Reload
        </button>
      </div>

      {loading ? (
        <p>Loading vendors...</p>
      ) : (
        <table className="w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left">ID</th>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Phone</th>
              <th className="py-2 px-4 text-left">Business Name</th>
              <th className="py-2 px-4 text-left">Business Type</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVendors.map((vendor, index) => (
              <tr key={vendor._id}>
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{vendor.fullName}</td>
                <td className="py-2 px-4">{vendor.email}</td>
                <td className="py-2 px-4">{vendor.phone}</td>
                <td className="py-2 px-4">{vendor.businessName}</td>
                <td className="py-2 px-4">{vendor.businessType}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => openStatusPopup(vendor)}
                    className={`px-2 py-1 rounded-md ${
                      vendor.status === "Active"
                        ? "bg-green-200 text-green-800"
                        : vendor.status === "Inactive"
                        ? "bg-red-200 text-red-800"
                        : "bg-yellow-200 text-yellow-800"
                    }`}
                  >
                    {vendor.status}
                  </button>
                </td>

                <td className="py-2 px-4">
                  <button
                    className="px-3 py-1 bg-blue-500 text-white rounded-md mr-2"
                    onClick={() => viewDetails(vendor)}
                  >
                    <FaEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <PaginationBar totalRecords={vendors.length} />

      {/* Status Change Confirmation Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-semibold mb-4">Update Status</h3>

            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="Pending">Pending</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
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

      {/* Vendor Details Modal */}
      {showModal && selectedVendor && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-2xl shadow-lg w-1/2 max-w-2xl transform transition-all duration-300 scale-100">
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-4">
              <h3 className="text-2xl font-bold text-gray-800">
                Vendor Details
              </h3>
              <button
                className="text-gray-500 hover:text-gray-800 text-xl"
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>
            </div>

            {/* Vendor Details */}
            <div className="mt-4 space-y-4 text-gray-700">
              <p className="flex items-center">
                <span className="font-semibold w-40">Name:</span>{" "}
                {selectedVendor.fullName}
              </p>
              <p className="flex items-center">
                <span className="font-semibold w-40">Email:</span>{" "}
                {selectedVendor.email}
              </p>
              <p className="flex items-center">
                <span className="font-semibold w-40">Phone:</span>{" "}
                {selectedVendor.phone}
              </p>
              <p className="flex items-center">
                <span className="font-semibold w-40">Business Name:</span>{" "}
                {selectedVendor.businessName}
              </p>
              <p className="flex items-center">
                <span className="font-semibold w-40">Business Type:</span>{" "}
                {selectedVendor.businessType}
              </p>
              <p className="flex items-center">
                <span className="font-semibold w-40">Status:</span>
                <span
                  className={`px-3 py-1 rounded-md text-white text-sm ${
                    selectedVendor.status === "Active"
                      ? "bg-green-500"
                      : selectedVendor.status === "Inactive"
                      ? "bg-red-500"
                      : "bg-yellow-500"
                  }`}
                >
                  {selectedVendor.status}
                </span>
              </p>
            </div>

            {/* Footer */}
            <div className="flex justify-end mt-6">
              <button
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
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

import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import PaginationBar from "../components/PaginationBar";

const Package = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [showStatusPopup, setShowStatusPopup] = useState(false);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [newPackage, setNewPackage] = useState({
    packageName: "",
    packageDescription: "",
    packageTerm: "",
    packagePrice: "",
    packageStatus: "active",
    numberOfLeads: "",
    numberOfListings: "",
  });



  const fetchPackages = async () => {
    try {
        const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:7002/api/head/get-all-packages",{ headers: { Authorization: `Bearer ${token}` } });
      console.log(response.data.packages); // Log API response
    setPackages(response.data.packages); // Update state
      
      
      setLoading(false);
    } catch (error) {
      console.error("Error fetching packages:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const openStatusPopup = (pkg) => {
    setSelectedPackage(pkg);
    setNewStatus(pkg.packageStatus);
    setShowStatusPopup(true);
  };

  const closeStatusPopup = () => {
    setSelectedPackage(null);
    setShowStatusPopup(false);
  };

  const handleStatusUpdate = async () => {
    if (!selectedPackage) return;
    try {
      await axios.put(`http://localhost:7002/api/packages/${selectedPackage._id}/updateStatus`, {
        packageStatus: newStatus,
      });
      alert("Package status updated successfully!");
      fetchPackages();
      closeStatusPopup();
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update package status.");
    }
  };

  const handleAddPackage = async () => {
    try {
      await axios.post("http://localhost:7002/api/head/add-package", newPackage);
      alert("Package added successfully!");
      fetchPackages();
      setShowAddPopup(false);
    } catch (error) {
      console.error("Error adding package:", error);
      alert("Failed to add package.");
    }
  };

  
  const filteredPackages = packages.filter(
    (pkg) =>
        pkg.name?.toLowerCase().includes(searchTerm?.toLowerCase() || "") ||
        pkg.description?.toLowerCase().includes(searchTerm?.toLowerCase() || "")
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Packages</h2>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 border rounded-md"
          value={searchTerm}
          onChange={handleSearch}
        />
        <div>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-md mr-2"
            onClick={() => setShowAddPopup(true)}
          >
            Add Package
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md" onClick={fetchPackages}>
            Reload
          </button>
        </div>
      </div>

      {loading ? (
        <p>Loading packages...</p>
      ) : (
        <table className="w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left">ID</th>
              <th className="py-2 px-4 text-left">Package Name</th>
              <th className="py-2 px-4 text-left">Term</th>
              <th className="py-2 px-4 text-left">Price</th>
              <th className="py-2 px-4 text-left">Leads</th>
              <th className="py-2 px-4 text-left">Listings</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPackages.map((pkg, index) => (
              <tr key={pkg._id}>
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{pkg.name}</td>
                <td className="py-2 px-4">{pkg.term}</td>
                <td className="py-2 px-4">${pkg.price}</td>
                <td className="py-2 px-4">{pkg.leads}</td>
                <td className="py-2 px-4">{pkg.listings}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => openStatusPopup(pkg)}
                    className={`px-3 py-1 rounded-md text-sm ${
                      pkg.status.toLowerCase() === "active"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {pkg.status.toUpperCase()}
                  </button>
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
      )}

      <PaginationBar totalRecords={packages.length} />

      {showAddPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Add New Package</h3>
            <input
              type="text"
              placeholder="Package Name"
              className="w-full px-3 py-2 border rounded-md mb-2"
              value={newPackage.packageName}
              onChange={(e) => setNewPackage({ ...newPackage, packageName: e.target.value })}
            />
            <input
              type="text"
              placeholder="Description"
              className="w-full px-3 py-2 border rounded-md mb-2"
              value={newPackage.packageDescription}
              onChange={(e) => setNewPackage({ ...newPackage, packageDescription: e.target.value })}
            />
            <input
              type="text"
              placeholder="Term"
              className="w-full px-3 py-2 border rounded-md mb-2"
              value={newPackage.packageTerm}
              onChange={(e) => setNewPackage({ ...newPackage, packageTerm: e.target.value })}
            />
            <input
              type="number"
              placeholder="Price"
              className="w-full px-3 py-2 border rounded-md mb-2"
              value={newPackage.packagePrice}
              onChange={(e) => setNewPackage({ ...newPackage, packagePrice: e.target.value })}
            />
            <input
              type="number"
              placeholder="Number of Leads"
              className="w-full px-3 py-2 border rounded-md mb-2"
              value={newPackage.numberOfLeads}
              onChange={(e) => setNewPackage({ ...newPackage, numberOfLeads: e.target.value })}
            />
            <input
              type="number"
              placeholder="Number of Listings"
              className="w-full px-3 py-2 border rounded-md mb-2"
              value={newPackage.numberOfListings}
              onChange={(e) => setNewPackage({ ...newPackage, numberOfListings: e.target.value })}
            />
            <button onClick={handleAddPackage} className="px-4 py-2 bg-blue-500 text-white rounded-md">
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Package;

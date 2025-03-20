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
  const [editPackage, setEditPackage] = useState({
    packageName: "",
    packageDescription: "",
    packageTerm: "",
    packagePrice: "",
    packageStatus: "",
    numberOfLeads: "",
    numberOfListings: "",
    listingLimit: ""
  });
  const [newPackage, setNewPackage] = useState({
    packageName: "",
    packageDescription: "",
    packageTerm: "",
    packagePrice: "",
    packageStatus: "active",
    numberOfLeads: "",
    numberOfListings: "",
    listingLimit: ""
  });

  const fetchPackages = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:7002/api/head/get-all-packages", { 
        headers: { Authorization: `Bearer ${token}` } 
      });
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
    setNewStatus(pkg.status);
    setShowStatusPopup(true);
  };

  const closeStatusPopup = () => {
    setSelectedPackage(null);
    setShowStatusPopup(false);
  };

  const handleStatusUpdate = async () => {
    if (!selectedPackage) return;
    try {
      const token = localStorage.getItem("token");
      console.log("Updating status...", newStatus);
      
      await axios.put(`http://localhost:7002/api/head/update-package-status/${selectedPackage._id}`, {
        packageStatus: newStatus,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Package status updated successfully!");
      fetchPackages();
      closeStatusPopup();
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update package status.");
    }
  };

  const closeAddPopup = () => {
    setShowAddPopup(false);
    setNewPackage({
      packageName: "",
      packageDescription: "",
      packageTerm: "",
      packagePrice: "",
      packageStatus: "Active",
      numberOfLeads: "",
      numberOfListings: "",
      listingType: ""
    });
  };

  const openEditModal = (pkg) => {
    setSelectedPackage(pkg);
    setEditPackage({
      packageName: pkg.packageName || "",
      packageDescription: pkg.packageDescription || "",
      packageTerm: pkg.packageTerm || "",
      packagePrice: pkg.packagePrice || "",
      packageStatus: pkg.packageStatus || "Active",
      numberOfLeads: pkg.numberOfLeads || "",
      listingType: pkg.listingType || "",
      numberOfListings: pkg.numberOfListings || ""
    });
    setShowModal(true);
  };

  const closeEditModal = () => {
    setShowModal(false);
    setSelectedPackage(null);
  };

  const handleEditPackage = async () => {
    if (!selectedPackage) return;
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:7002/api/head/update-package/${selectedPackage._id}`, {
        packageName: editPackage.packageName,
        packageDescription: editPackage.packageDescription,
        packageTerm: editPackage.packageTerm,
        packagePrice: editPackage.packagePrice,
        packageStatus: editPackage.packageStatus,
        numberOfLeads: editPackage.numberOfLeads,
        listingType: editPackage.listingType,
        ...(newPackage.listingType === "Limited" && { numberOfListings: editPackage.numberOfListings }),
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Package updated successfully!");
      fetchPackages();
      closeEditModal();
    } catch (error) {
      console.error("Error updating package:", error);
      alert("Failed to update package.");
    }
  };

  const handleAddPackage = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Adding package...", newPackage);
      
      await axios.post("http://localhost:7002/api/head/add-package", {
        packageName: newPackage.packageName,
        packageDescription: newPackage.packageDescription,
        packageTerm: newPackage.packageTerm,
        packagePrice: newPackage.packagePrice,
        packageStatus: newPackage.packageStatus,
        numberOfLeads: newPackage.numberOfLeads,
        listingType: newPackage.listingType,
        ...(newPackage.listingType === "Limited" && { numberOfListings: newPackage.numberOfListings }) // ✅ Correct conditional assignment
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Package added successfully!");
      fetchPackages();
      closeAddPopup();
    } catch (error) {
      console.error("Error adding package:", error);
      alert("Failed to add package.");
    }
  };

  const handleDeletePackage = async (packageId) => {
    if (window.confirm("Are you sure you want to delete this package?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:7002/api/head/delete-package/${packageId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert("Package deleted successfully!");
        fetchPackages();
      } catch (error) {
        console.error("Error deleting package:", error);
        alert("Failed to delete package.");
      }
    }
  };

  const filteredPackages = packages.filter(
    (pkg) =>
      pkg.packageName?.toLowerCase().includes(searchTerm?.toLowerCase() || "") ||
      pkg.packageDescription?.toLowerCase().includes(searchTerm?.toLowerCase() || "")
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
                <td className="py-2 px-4">{pkg.packageName}</td>
                <td className="py-2 px-4">{pkg.packageTerm}</td>
                {/* rupees sign */}
                <td className="py-2 px-4">₹ {pkg.packagePrice}</td>
                <td className="py-2 px-4">{pkg.numberOfLeads}</td>
                <td className="py-2 px-4">
                  {pkg.listingType === "Limited" ? `${pkg.listingType} (${pkg.numberOfListings})` : pkg.listingType}
                </td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => openStatusPopup(pkg)}
                    className={`px-3 py-1 rounded-md text-sm ${
                      pkg.packageStatus?.toLowerCase() === "active"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {pkg.packageStatus?.toUpperCase() || "N/A"}
                  </button>
                </td>
                <td className="py-2 px-4">
                  <button 
                    className="px-3 py-1 bg-blue-500 text-white rounded-md mr-2"
                    onClick={() => openEditModal(pkg)}
                  >
                    <FaEdit />
                  </button>
                  <button 
                    className="px-3 py-1 bg-red-500 text-white rounded-md"
                    onClick={() => handleDeletePackage(pkg._id)}
                  >
                    <MdDeleteForever />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <PaginationBar totalRecords={packages.length} />

      {/* Status Update status Popup */}
      {showStatusPopup && selectedPackage && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h3 className="text-lg font-semibold mb-4">Update Package Status</h3>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Status</label>
              <select
                className="w-full px-4 py-2 border rounded-md"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
              >
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={closeStatusPopup}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
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

      {/* Add New Package Popup */}
      {showAddPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-lg shadow-xl w-[500px]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Add New Package</h3>
              <button onClick={closeAddPopup} className="text-gray-500 hover:text-gray-800 text-2xl">
                ✕
              </button>
            </div>
        
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Package Name"
                className="w-full px-4 py-2 border rounded-md"
                value={newPackage.packageName}
                onChange={(e) => setNewPackage({ ...newPackage, packageName: e.target.value })}
              />
        
              <input
                type="text"
                placeholder="Description"
                className="w-full px-4 py-2 border rounded-md"
                value={newPackage.packageDescription}
                onChange={(e) => setNewPackage({ ...newPackage, packageDescription: e.target.value })}
              />
        
              <div className="flex space-x-4">
                <input
                  type="number"
                  placeholder="Term (in months)"
                  className="w-1/2 px-4 py-2 border rounded-md"
                  value={newPackage.packageTerm}
                  onChange={(e) => setNewPackage({ ...newPackage, packageTerm: e.target.value })}
                />
        
                <input
                  type="number"
                  placeholder="Price (in ₹)"
                  className="w-1/2 px-4 py-2 border rounded-md"
                  value={newPackage.packagePrice}
                  onChange={(e) => setNewPackage({ ...newPackage, packagePrice: e.target.value })}
                />
              </div>
        
              <input
                type="number"
                placeholder="Number of Leads"
                className="w-full px-4 py-2 border rounded-md"
                value={newPackage.numberOfLeads}
                onChange={(e) => setNewPackage({ ...newPackage, numberOfLeads: e.target.value })}
              />
        
              <select
                className="w-full px-4 py-2 border rounded-md"
                value={newPackage.listingType}
                onChange={(e) => setNewPackage({ ...newPackage, listingType: e.target.value })}
              >
                <option value="">Select Number of Listings</option>
                <option value="Limited">Limited</option>
                <option value="Unlimited">Unlimited</option>
              </select>

              {newPackage.listingType === "Limited" && (
                <input
                  type="number"
                  placeholder="Number of Listings Allowed"
                  className="w-full px-4 py-2 border rounded-md"
                  value={newPackage.numberOfListings}
                  onChange={(e) => setNewPackage({ ...newPackage, numberOfListings: e.target.value })}
                />
              )}
            </div>
        
            <div className="flex justify-end mt-6 space-x-4">
              <button onClick={closeAddPopup} className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400">
                Cancel
              </button>
              <button onClick={handleAddPackage} className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                Add Package
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Package Modal */}
      {showModal && selectedPackage && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-lg shadow-xl w-[500px]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Edit Package</h3>
              <button onClick={closeEditModal} className="text-gray-500 hover:text-gray-800 text-2xl">
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Package Name"
                className="w-full px-4 py-2 border rounded-md"
                value={editPackage.packageName}
                onChange={(e) => setEditPackage({ ...editPackage, packageName: e.target.value })}
              />
        
              <input
                type="text"
                placeholder="Description"
                className="w-full px-4 py-2 border rounded-md"
                value={editPackage.packageDescription}
                onChange={(e) => setEditPackage({ ...editPackage, packageDescription: e.target.value })}
              />
        
              <div className="flex space-x-4">
                <input
                  type="number"
                  placeholder="Term (in months)"
                  className="w-1/2 px-4 py-2 border rounded-md"
                  value={editPackage.packageTerm}
                  onChange={(e) => setEditPackage({ ...editPackage, packageTerm: e.target.value })}
                />
        
                <input
                  type="number"
                  placeholder="Price (in ₹)"
                  className="w-1/2 px-4 py-2 border rounded-md"
                  value={editPackage.packagePrice}
                  onChange={(e) => setEditPackage({ ...editPackage, packagePrice: e.target.value })}
                />
              </div>
        
              <input
                type="number"
                placeholder="Number of Leads"
                className="w-full px-4 py-2 border rounded-md"
                value={editPackage.numberOfLeads}
                onChange={(e) => setEditPackage({ ...editPackage, numberOfLeads: e.target.value })}
              />
        
              <select
                className="w-full px-4 py-2 border rounded-md"
                value={editPackage.listingType}
                onChange={(e) => setEditPackage({ ...editPackage, numberOfListings: e.target.value })}
              >
                <option value="">Select Number of Listings</option>
                <option value="Limited">Limited</option>
                <option value="Unlimited">Unlimited</option>
              </select>

              {editPackage.listingType === "Limited" && (
                <input
                  type="number"
                  placeholder="Number of Listings Allowed"
                  className="w-full px-4 py-2 border rounded-md"
                  value={editPackage.numberOfListings}
                  onChange={(e) => setEditPackage({ ...editPackage, listingLimit: e.target.value })}
                />
              )}

              
            </div>
            
            <div className="flex justify-end mt-6 space-x-4">
              <button 
                onClick={closeEditModal} 
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button 
                onClick={handleEditPackage} 
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Update Package
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Package;
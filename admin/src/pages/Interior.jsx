import React, { useState, useEffect } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PaginationBar from "../components/PaginationBar";
import { LiaRupeeSignSolid } from "react-icons/lia";
import axios from "axios";

const Interior = () => {
  const navigate = useNavigate();
  const [interiors, setInteriors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedInterior, setSelectedInterior] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [showStatusPopup, setShowStatusPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  const fetchInteriors = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:7002/api/vendor/interiors");
        setInteriors(response.data.interiors || []);
       
    } catch (err) {
      console.error("Error fetching interiors:", err);
      setError(err.response?.data?.message || err.message || "Failed to fetch interiors");
    } finally {
      setLoading(false);
    }
  };


  // Initial fetch
  useEffect(() => {
    fetchInteriors();
  }, []);


  const filteredInterior = interiors.filter((interior) =>
    interior.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    };

  const handleCreateClick = () => {
    navigate("./CreateInterior");
  };

  const openStatusPopup = (interior) => {
    setSelectedInterior(interior);
    setNewStatus(interior.status === 0 ? "Active" : "Inactive");
    setShowStatusPopup(true);
  };

  const closeStatusPopup = () => {
    setSelectedInterior(null);
    setShowStatusPopup(false);
  };

  const handleStatusUpdate = async () => {
    if (!selectedInterior) return;
    
    try {
      const newStatusValue = newStatus === "Active" ? 0 : 1;
      
      const response = await axios.put(
        `http://localhost:7002/api/vendor/interior/${selectedInterior._id}/updateStatus`,
        { status: newStatus },
      );
      
      if (response.status === 200) {
        alert("Interior status updated successfully!");
        fetchInteriors();
        closeStatusPopup();
      } else {
        throw new Error(response.data?.message || "Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert(error.response?.data?.message || error.message || "Failed to update interior status");
    }
  };

  // const handleDelete = async (interiorId) => {
  //   if (window.confirm("Are you sure you want to delete this interior design?")) {
  //     try {
  //       const response = await axios.delete(
  //         `${API_BASE_URL}/api/vendor/interior/${interiorId}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem("token")}`,
  //           },
  //         }
  //       );
        
  //       if (response.data && response.data.success) {
  //         // Remove the deleted interior from the state
  //         const updatedInteriors = interiors.filter(interior => interior._id !== interiorId);
  //         setInteriors(updatedInteriors);
  //         setTotalItems(prev => prev - 1);
  //         alert("Interior design deleted successfully!");
  //       } else {
  //         throw new Error(response.data?.message || "Failed to delete interior");
  //       }
  //     } catch (error) {
  //       console.error("Error deleting interior:", error);
  //       alert(error.response?.data?.message || error.message || "Failed to delete interior design");
  //     }
  //   }
  // };

  const viewDetails = (interior) => {
    setSelectedInterior(interior);
    setShowModal(true);
  };

  const renderPropertyValue = (value, defaultValue = "N/A") => {
    if (value === undefined || value === null) return defaultValue;
    return value;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    
    try {
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      }).format(new Date(dateString));
    } catch (error) {
      return dateString;
    }
  };

  const InteriorTable = () => {
    if (loading) return (
      <div className="w-full flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
    
    if (error) return <p className="text-red-500 text-center py-4">{error}</p>;
    
    if (interiors.length === 0) return (
      <div className="text-center py-8">
        <p className="text-gray-500">No interior designs found.</p>
        <button 
          onClick={handleCreateClick}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Create New Interior Design
        </button>
      </div>
    );
    
    return (
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left">S. No</th>
              <th className="py-2 px-4 text-left">Image</th>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Type</th>
              <th className="py-2 px-4 text-left">Address</th>
              <th className="py-2 px-4 text-left">Created At</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Price/SqFt</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {interiors.map((interior, index) => (
              <tr key={interior._id || index} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td className="py-2 px-4">
                  <img
                    src={interior.image?.[0] || "https://via.placeholder.com/50"}
                    alt={interior.name}
                    className="w-12 h-12 object-cover rounded-md"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/50";
                    }}
                  />
                </td>
                <td className="py-2 px-4">{renderPropertyValue(interior.name)}</td>
                <td className="py-2 px-4">{renderPropertyValue(interior.type)}</td>
                <td className="py-2 px-4">{renderPropertyValue(interior.address)}</td>
                <td className="py-2 px-4">{formatDate(interior.createdAt)}</td>
                <td className="py-2 px-4">
                <button
                  onClick={() => openStatusPopup(interior)}
                  className={`px-2 py-1 rounded-md ${
                    interior.status === 1
                      ? "bg-green-200 text-green-800"  // Active
                      : interior.status === 2
                      ? "bg-yellow-200 text-yellow-800" // Pending
                      : "bg-red-200 text-red-800" // Inactive
                  }`}
                >
                  {interior.status === 1
                    ? "Active"
                    : interior.status === 2
                    ? "Pending"
                    : "Inactive"}
                </button>

                </td>
                <td className="py-2 px-4 flex items-center justify-start">
                  <LiaRupeeSignSolid />
                  {renderPropertyValue(interior.price)}
                </td>
                <td className="py-2 px-4">
                  <button
                    className="px-3 py-1 bg-blue-500 text-white rounded-md mr-2 hover:bg-blue-600 transition"
                    onClick={() => viewDetails(interior)}
                    title="View/Edit Details"
                  >
                    <FaEdit />
                  </button>
                  <button 
                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                    onClick={() => handleDelete(interior._id)}
                    title="Delete Interior"
                  >
                    <MdDeleteForever />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const StatusUpdateModal = () => {
    if (!showStatusPopup) return null;
    
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-80">
          <h3 className="text-lg font-semibold mb-4">Update Status</h3>
          <select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Pending">Pending</option>
          </select>
          <div className="flex justify-end mt-4">
            <button
              onClick={closeStatusPopup}
              className="px-4 py-2 bg-gray-300 rounded-md mr-2 hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleStatusUpdate}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              Update
            </button>
          </div>
        </div>
      </div>

    );
  };

  const InteriorDetailsModal = () => {
    if (!showModal || !selectedInterior) return null;
    
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg w-4/5 max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Interior Design Details</h2>
            <button onClick={() => setShowModal(false)} className="text-lg">
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p><strong>Name:</strong> {renderPropertyValue(selectedInterior.name)}</p>
            <p><strong>Unique ID:</strong> {renderPropertyValue(selectedInterior._id)}</p>
            <p><strong>Design Code:</strong> {renderPropertyValue(selectedInterior.code)}</p>
            <p><strong>Details:</strong> {renderPropertyValue(selectedInterior.details)}</p>
            <p><strong>Price per Sq.Ft:</strong> ₹{renderPropertyValue(selectedInterior.pricePerSqFt)}</p>
            <p><strong>Segment:</strong> {renderPropertyValue(selectedInterior.segment)}</p>
            <p><strong>Views:</strong> {renderPropertyValue(selectedInterior.views, 0)}</p>
            <p><strong>Status:</strong> {selectedInterior.status === 0 ? "Active" : "Inactive"}</p>
            <p><strong>Verified:</strong> {selectedInterior.verified ? "Yes" : "No"}</p>
            <p><strong>Rating:</strong> {renderPropertyValue(selectedInterior.rating)} ⭐</p>
            <p><strong>Reviews:</strong> {renderPropertyValue(selectedInterior.reviews, 0)}</p>
            <p><strong>Created At:</strong> {formatDate(selectedInterior.createdAt)}</p>

            {selectedInterior.contactNumber && (
              <p><strong>Contact:</strong> {selectedInterior.contactNumber}</p>
            )}

            {selectedInterior.address && (
              <p><strong>Address:</strong> {selectedInterior.address}</p>
            )}

            {selectedInterior.facilities?.length > 0 && (
              <p><strong>Facilities:</strong> {selectedInterior.facilities.join(", ")}</p>
            )}

            {selectedInterior.specialOffers && (
              <p><strong>Special Offers:</strong> {selectedInterior.specialOffers}</p>
            )}

            {selectedInterior.dimension && (
              <p><strong>Dimensions:</strong> {selectedInterior.dimension}</p>
            )}

            {selectedInterior.materials?.length > 0 && (
              <p><strong>Materials:</strong> {selectedInterior.materials.join(", ")}</p>
            )}

            {selectedInterior.description && (
              <div className="col-span-1 md:col-span-2">
                <strong>Description:</strong>
                <p className="mt-1">{selectedInterior.description}</p>
              </div>
            )}

            {selectedInterior.image?.length > 0 && (
              <div className="col-span-1 md:col-span-2 mt-4">
                <strong>Images:</strong>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                  {selectedInterior.image.map((img, index) => (
                    <img 
                      key={index}
                      src={img} 
                      alt={`Interior Design ${index + 1}`} 
                      className="w-full h-48 object-cover rounded-lg" 
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/300x200?text=Image+Not+Found";
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex mt-6 gap-4">
            <button
              onClick={() => {
                navigate(`./EditInterior/${selectedInterior._id}`);
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded-md flex-1 hover:bg-blue-600 transition"
            >
              Edit
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 bg-gray-600 text-white rounded-md flex-1 hover:bg-gray-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Dashboard / Interiors</h2>
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <button className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition">
            Filters
          </button>
        </div>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={handleSearch}
          className="px-4 py-2 border rounded-md w-full md:w-64"
        />
        <div className="flex items-center gap-2 w-full md:w-auto">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            onClick={handleCreateClick}
          >
            Create
          </button>
          <button
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
            onClick={() => fetchInteriors(currentPage, searchTerm)}
          >
            Reload
          </button>
        </div>
      </div>
      
      <InteriorTable />
      
      <div className="mt-4">
        <PaginationBar 
          currentPage={currentPage}
          totalRecords={totalItems} 
          pageSize={itemsPerPage}
        />
      </div>
      
      <StatusUpdateModal />
      <InteriorDetailsModal />
    </div>
  );
};

export default Interior;
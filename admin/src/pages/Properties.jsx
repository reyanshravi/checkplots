import React, { useState, useEffect } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PaginationBar from "../components/PaginationBar";
import axios from "axios";

const Properties = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [showStatusPopup, setShowStatusPopup] = useState(false);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7002/api/vendor/properties"
        );
        setProperties(response.data.properties); // Assuming API returns an array of properties
        console.log(response.data);
      } catch (err) {
        setError("Failed to fetch properties.");
      } finally {
        setLoading(false);
        console.log(properties);
        
      }
    };

    fetchProperties();
  }, []);

  const handleCreateClick = () => {
    navigate("./CreateProperty"); // Navigate to CreateProperty page
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

  const viewDetails = (property) => {
    setSelectedProperty(property);
    setShowModal(true);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Dashboard / Properties</h2>
      <div className="flex justify-between items-center mb-4">
        <button className="px-4 py-2 bg-gray-200 rounded-md">Filters</button>
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 border rounded-md"
        />
        <div>
          {/* <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
            onClick={handleCreateClick}
          >
            Create
          </button> */}
          <button
            className="px-4 py-2 bg-gray-200 rounded-md"
            onClick={() => window.location.reload()}
          >
            Reload
          </button>
        </div>
      </div>

      {loading ? (
        <p>Loading properties...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <table className="w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left">S. No.</th>
              <th className="py-2 px-4 text-left">Image</th>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Property Type</th>
              <th className="py-2 px-4 text-left">Created At</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Available For</th>
              <th className="py-2 px-4 text-left">Address</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property, index) => (
              
              
              <tr key={property.id}>
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">
                  <img
                    src={property.image || "https://via.placeholder.com/50"}
                    alt={property.name}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                </td>
                <td className="py-2 px-4">{property.name}</td>
                <td className="py-2 px-4 ">{property.type}</td>
                <td className="py-2 px-4">
                {new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric" }).format(new Date(property.createdAt))}


                </td>
                <td className="py-2 px-4">
                  <span
                    className={`px-2 py-1 rounded-md ${
                      property.status === 1
                        ? "bg-green-200 text-green-800" // Approved
                        : "bg-yellow-200 text-yellow-800" // Pending
                    }`}
                  >
                    {property.status === 1 ? "Approved" : "Pending"}
                  </span>
                </td>

                <td className="py-2 px-4">{property.availableFor}</td>
                <td className="py-2 px-4">{property.address}</td>
                <td className="py-2 px-4">
                  <button className="px-3 py-1 bg-blue-500 text-white rounded-md mr-2"
                  onClick={() => viewDetails(property)}>
                    <FaEdit />
                  </button>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <PaginationBar totalRecords={properties.length} />

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

      {showModal && selectedProperty && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-sm">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-4/5 max-w-5xl">
          <div className="flex justify-between items-center border-b pb-4">
            <h3 className="text-2xl font-bold text-gray-800">Property Details</h3>
            <button
              className="text-gray-500 hover:text-gray-800 text-xl"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
          </div>
  
          <div className="mt-4 grid grid-cols-2 gap-6 text-gray-700">
            <p><span className="font-semibold">Name:</span> {selectedProperty.name}</p>
            <p><span className="font-semibold">Type:</span> {selectedProperty.type}</p>
            <p><span className="font-semibold">Available For:</span> {selectedProperty.availableFor}</p>
            <p><span className="font-semibold">Ownership Type:</span> {selectedProperty.ownershipType}</p>
            <p><span className="font-semibold">Price:</span> ${selectedProperty.price} ({selectedProperty.pricePerSqft} per sqft)</p>
            <p><span className="font-semibold">Investment Potential:</span> {selectedProperty.investmentPotential}</p>
            <p><span className="font-semibold">Bedrooms:</span> {selectedProperty.numberOfBedroom}</p>
            <p><span className="font-semibold">Bathrooms:</span> {selectedProperty.numberOfBathroom}</p>
            <p><span className="font-semibold">Facing:</span> {selectedProperty.facing}</p>
            <p><span className="font-semibold">Landmark:</span> {selectedProperty.landmark}</p>
            <p><span className="font-semibold">Address:</span> {selectedProperty.address}</p>
            <p><span className="font-semibold">Contact:</span> {selectedProperty.contactNumber}</p>
            {/* <p>
              <span className="font-semibold">Website:</span>
              <a href={selectedProperty.website} target="_blank" className="text-blue-500 underline ml-2">
                {selectedProperty.website}
              </a>
            </p> */}
            <p>
              <span className="font-semibold">Status:</span>
              <span className={`ml-2 px-3 py-1 rounded-md text-white text-sm ${selectedProperty.status === 1 ? "bg-green-500" : "bg-yellow-500"}`}>
                {selectedProperty.status === 1 ? "Approved" : "Pending"}
              </span>
            </p>
            <p><span className="font-semibold">Created At:</span> {new Date(selectedProperty.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" })}</p>
            {selectedProperty.amenities && (
              <p className="col-span-2">
                <span className="font-semibold">Amenities:</span> {selectedProperty.amenities.join(", ")}
              </p>
            )}
            {selectedProperty.image && (
              <div className="col-span-2">
                <span className="font-semibold block mb-2">Image:</span>
                <img src={selectedProperty.image[0]} alt="Property" className="w-full h-64 object-cover rounded-md" />
              </div>
            )}
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

export default Properties;

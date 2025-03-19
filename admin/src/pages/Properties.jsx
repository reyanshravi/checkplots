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
                  <button className="px-3 py-1 bg-blue-500 text-white rounded-md mr-2">
                    <FaEdit />
                  </button>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <PaginationBar totalRecords={properties.length} />
    </div>
  );
};

export default Properties;

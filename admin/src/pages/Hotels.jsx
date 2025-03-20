import React, { useState, useEffect } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PaginationBar from "../components/PaginationBar";
import { LiaRupeeSignSolid } from "react-icons/lia";
import axios from "axios";

const Hotels = () => {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [showStatusPopup, setShowStatusPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchHotels = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:7002/api/vendor/hotels");
      setHotels(response.data.hotels);
    } catch (err) {
      setError("Failed to fetch hotels.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const filteredHotels = hotels.filter((hotel) =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCreateClick = () => {
    navigate("./CreateHotel");
  };

  const openStatusPopup = (hotel) => {
    setSelectedHotel(hotel);
    setNewStatus(hotel.status === "Vacant" ? "Vacant" : "Reserved");
    setShowStatusPopup(true);
  };

  const closeStatusPopup = () => {
    setSelectedHotel(null);
    setShowStatusPopup(false);
  };

  const handleStatusUpdate = async () => {
    if (!selectedHotel) return;
    
    try {
      const response = await axios.put(
        `http://localhost:7002/api/vendor/hotel/${selectedHotel._id}/updateStatus`,
        { status: newStatus }
      );
      
      if (response.status === 200) {
        alert("Hotel status updated successfully!");
        fetchHotels();
        closeStatusPopup();
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update hotel status.");
    }
  };

  const handleDelete = async (hotelId) => {
    if (window.confirm("Are you sure you want to delete this hotel?")) {
      try {
        const response = await axios.delete(
          `http://localhost:7002/api/vendor/hotel/${hotelId}`
        );
        
        if (response.status === 200) {
          alert("Hotel deleted successfully!");
          fetchHotels();
        }
      } catch (error) {
        console.error("Error deleting hotel:", error);
        alert("Failed to delete hotel.");
      }
    }
  };

  const viewDetails = (hotel) => {
    setSelectedHotel(hotel);
    setShowModal(true);
  };

  const HotelTable = () => {
    if (loading) return <p>Loading hotels...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    
    return (
      <table className="w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 text-left">S. No</th>
            <th className="py-2 px-4 text-left">Image</th>
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Type</th>
            <th className="py-2 px-4 text-left">CheckIn / CheckOut</th>
            <th className="py-2 px-4 text-left">Created At</th>
            <th className="py-2 px-4 text-left">Status</th>
            <th className="py-2 px-4 text-left">Price</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredHotels.map((hotel, index) => (
            <tr key={hotel._id || index}>
              <td className="py-2 px-4">{index + 1}</td>
              <td className="py-2 px-4">
                <img
                  src={hotel.image?.[0] || "https://via.placeholder.com/50"}
                  alt={hotel.name}
                  className="w-12 h-12 object-cover rounded-md"
                />
              </td>
              <td className="py-2 px-4">{hotel.name}</td>
              <td className="py-2 px-4">{hotel.type || 0}</td>
              <td className="py-2 px-4">{hotel.checkInTime} / {hotel.checkOutTime}</td>
              <td className="py-2 px-4">
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                }).format(new Date(hotel.createdAt))}
              </td>
              <td className="py-2 px-4">
              <button
                onClick={() => openStatusPopup(hotel)}
                className={`px-2 py-1 rounded-md ${
                  hotel.status === 0
                    ? "bg-green-200 text-green-800"
                    : "bg-yellow-200 text-yellow-800"
                }`}
              >
                {hotel.status === 0 ? "Vacant" : "Reserved"}
              </button>
              </td>
              <td className="py-2 px-4 flex items-center justify-start">
                <LiaRupeeSignSolid />
                {hotel.price || "N/A"}
              </td>
              <td className="py-2 px-4">
                <button
                  className="px-3 py-1 bg-blue-500 text-white rounded-md mr-2"
                  onClick={() => viewDetails(hotel)}
                >
                  <FaEdit />
                </button>
                <button 
                  className="px-3 py-1 bg-red-500 text-white rounded-md"
                  onClick={() => handleDelete(hotel._id)}
                >
                  <MdDeleteForever />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const StatusUpdateModal = () => {
    if (!showStatusPopup) return null;
    
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-80">
          <h3 className="text-lg font-semibold mb-4">Update Status</h3>
          <select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="Vacant">Vacant</option>
            <option value="Reserved">Reserved</option>
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
    );
  };

  const HotelDetailsModal = () => {
    if (!showModal || !selectedHotel) return null;
    
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-4/5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Hotel Details</h2>
          <button onClick={() => setShowModal(false)} className="text-lg">
            ✕
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <p><strong>Name:</strong> {selectedHotel.name}</p>
          <p><strong>Unique ID:</strong> {selectedHotel._id || "N/A"}</p>
          <p><strong>Type:</strong> {selectedHotel.type || "N/A"}</p>
          <p><strong>Details:</strong> {selectedHotel.details || "N/A"}</p>
          <p><strong>Price:</strong> ₹{selectedHotel.price || "N/A"}</p>
          <p><strong>Price per Night:</strong> ₹{selectedHotel.pricePerNight || "N/A"}</p>
          <p><strong>Available Rooms:</strong> {selectedHotel.availableRooms || 0}</p>
          <p><strong>Views:</strong> {selectedHotel.views || 0}</p>
          <p><strong>Address:</strong> {selectedHotel.address || "N/A"}</p>
          <p><strong>Contact:</strong> {selectedHotel.contactNumber || "N/A"}</p>
          {/* <p><strong>Website:</strong> {selectedHotel.website || "N/A"}</p> */}
          <p><strong>Status:</strong> {selectedHotel.status === 1 ? "Reserved" : "Vacant"}</p>
          <p><strong>Verified:</strong> {selectedHotel.verified ? "Yes" : "No"}</p>
          <p><strong>Under Renovation:</strong> {selectedHotel.underRenovation ? "Yes" : "No"}</p>
          <p><strong>Check-in Time:</strong> {selectedHotel.checkInTime || "N/A"}</p>
          <p><strong>Check-out Time:</strong> {selectedHotel.checkOutTime || "N/A"}</p>
          <p><strong>Rating:</strong> {selectedHotel.rating || "N/A"} ⭐</p>
          <p><strong>Reviews:</strong> {selectedHotel.reviews || 0}</p>
          <p><strong>Created At:</strong> {new Date(selectedHotel.createdAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}</p>

          {selectedHotel.amenities?.length > 0 && (
            <p><strong>Amenities:</strong> {selectedHotel.amenities.join(", ")}</p>
          )}

          {selectedHotel.facilities?.length > 0 && (
            <p><strong>Facilities:</strong> {selectedHotel.facilities.join(", ")}</p>
          )}

          {selectedHotel.nearbyAttractions?.length > 0 && (
            <p><strong>Nearby Attractions:</strong> {selectedHotel.nearbyAttractions.join(", ")}</p>
          )}

          {selectedHotel.cancellationPolicy && (
            <p><strong>Cancellation Policy:</strong> {selectedHotel.cancellationPolicy}</p>
          )}

          {selectedHotel.specialOffers && (
            <p ><strong>Special Offers:</strong> {selectedHotel.specialOffers}</p>
          )}

          {selectedHotel.image?.length > 0 && (
            <div className="col-span-2 text-center">
              <strong>Image:</strong>
              <img src={selectedHotel.image[0]} alt="Hotel" className="w-1/3 mt-2 rounded-lg" />
            </div>
          )}
        </div>

        <button
          onClick={() => setShowModal(false)}
          className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-md w-full"
        >
          Close
        </button>
      </div>
    </div>
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Dashboard / Hotels</h2>
      <div className="flex justify-between items-center mb-4">
        <button className="px-4 py-2 bg-gray-200 rounded-md">Filters</button>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="px-4 py-2 border rounded-md"
        />
        <div>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
            onClick={handleCreateClick}
          >
            Create
          </button>
          <button
            className="px-4 py-2 bg-gray-200 rounded-md"
            onClick={() => fetchHotels()}
          >
            Reload
          </button>
        </div>
      </div>
      
      <HotelTable />
      <PaginationBar totalRecords={filteredHotels.length} />
      
      <StatusUpdateModal />
      <HotelDetailsModal />
    </div>
  );
};

export default Hotels;
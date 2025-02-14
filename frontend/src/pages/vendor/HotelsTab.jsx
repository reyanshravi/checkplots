import React, { useState } from "react";
import { VscTable, VscFilter } from "react-icons/vsc";
import { BsCardList } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import hotels from "../../Data/hotel";
const HotelTab = () => {
  const [view, setView] = useState("card"); // Toggle between card and table views
  const [hotelList, setHotelList] = useState(hotels); // Hotel list state
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBy, setFilterBy] = useState(""); // "name" or "price"
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Function to toggle view
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Function to handle filter change
  const handleFilterChange = (filterType) => {
    setFilterBy(filterType);
    setIsDropdownOpen(false); // Close dropdown after selection
  };

  // Function to toggle view
  const toggleView = (newView) => {
    setView(newView);
  };

  // Handle delete action (placeholder)
  const handleDelete = (index) => {
    setHotelList(hotelList.filter((_, i) => i !== index));
  };

  // Handle edit action (placeholder)
  const handleEdit = (index) => {
    alert(`Edit hotel at index ${index}`);
  };

  // Handle add action (placeholder)
  const handleAdd = () => {
    alert("Add new hotel service");
  };

  const filteredHotels = hotelList.filter((hotel) => {
    if (filterBy === "name") {
      return hotel.name.toLowerCase().includes(searchQuery.toLowerCase());
    } else if (filterBy === "price") {
      return hotel.pricePerNight
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    } else {
      return (
        hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotel.pricePerNight.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  });

  return (
    <div className="h-full flex flex-col p-6 bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        {/* Heading */}
        <h2 className="text-3xl font-semibold mb-6">Hotel Services</h2>

        {/* Add Button */}
        <button
          onClick={handleAdd}
          className="bg-gray-500 text-white px-6 py-2 rounded-md mb-4 hover:bg-gray-600 transition"
        >
          Add Service
        </button>
      </div>

      <div className="flex justify-between items-center mb-6 bg-white p-2 px-4 rounded-xl shadow-md">
        {/* Toggle Buttons for Card/Table View */}
        <div className="inline-flex">
          <button
            onClick={() => toggleView("card")}
            className={`p-2 border rounded-l-md ${
              view === "card" ? "bg-gray-100" : "hover:bg-gray-50"
            }`}
          >
            <BsCardList className="h-4 w-4" />
          </button>
          <button
            onClick={() => toggleView("table")}
            className={`p-2 border rounded-r-md ${
              view === "table" ? "bg-gray-100" : "hover:bg-gray-50"
            }`}
          >
            <VscTable className="h-4 w-4" />
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center  ">
            <FaSearch className="text-gray-500 mr-3 text-lg" />
            <input
              type="search"
              placeholder="Search..."
              className="p-3 w-full rounded-md border-b outline-none text-sm text-gray-700 "
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div>
            <VscFilter
              className="h-6 w-6 cursor-pointer"
              onClick={toggleDropdown}
            />
            {isDropdownOpen && (
              <div className="absolute right-2 mt-4 bg-white border rounded-md shadow-lg w-40">
                <ul className="space-y-2 p-2">
                  <li>
                    <button
                      className="w-full text-left p-2 hover:bg-gray-100"
                      onClick={() => handleFilterChange("name")}
                    >
                      Filter by Name
                    </button>
                  </li>
                  <li>
                    <button
                      className="w-full text-left p-2 hover:bg-gray-100"
                      onClick={() => handleFilterChange("price")}
                    >
                      Filter by Price
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-slate-500 bg-opacity-10 rounded-lg">
        {/* Card View */}
        {view === "card" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-2">
            {filteredHotels.map((hotel, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg overflow-hidden w-72 mx-auto p-4 relative"
              >
                
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-32 object-cover"
                />
                <div className="p-2">
                  <h3 className="text-sm font-semibold text-gray-800">
                    {hotel.name}
                  </h3>
                  <p className="text-xs text-gray-500">{hotel.type}</p>
                  <p className="text-xs text-gray-700 mt-2">{hotel.details}</p>
                  <p className="text-xs text-gray-700 mt-2">{hotel.address}</p>
                  <p className="text-xs text-gray-700 mt-2">{hotel.price}</p>
                  <div className="flex justify-between mt-3">
                    <button
                      onClick={() => handleEdit(index)}
                      className="text-gray-500 text-xs hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-500 text-xs hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Table View
          <table className="min-w-full bg-white table-auto shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-left">Price</th>
                <th className="px-4 py-2 text-left">Details</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredHotels.map((hotel, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{hotel.name}</td>
                  <td className="px-4 py-2">{hotel.type}</td>
                  <td className="px-4 py-2">{hotel.price}</td>
                  <td className="px-4 py-2 text-xs max-w-xs truncate">
                    {hotel.details}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleEdit(index)}
                      className="text-gray-500 text-xs hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-500 text-xs hover:underline ml-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default HotelTab;

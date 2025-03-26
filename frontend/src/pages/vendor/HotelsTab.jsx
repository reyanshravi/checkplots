import React, { useContext, useEffect, useState } from "react";
import { VscTable, VscFilter } from "react-icons/vsc";
import { BsCardList } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import HotelForm from "./Froms/HotelForm";
import { DataContext } from "../../Context/DataProvider";
import { useNavigate } from "react-router-dom";

const HotelTab = () => {
  const [view, setView] = useState("card");
  const [hotelList, setHotelList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAddingHotel, setIsAddingHotel] = useState(false);
  const { hotelData } = useContext(DataContext);
  const navigate = useNavigate();

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
    setIsAddingHotel(true);
  };

  const handleCancel = () => {
    setIsAddingHotel(false);
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
  useEffect(() => {
    if (hotelData) {
      setHotelList(hotelData.hotels);
    }
  }, [hotelData]);

  const handleNavigate = (id, e) => {
    console.log("click " + id);

    e.stopPropagation();

    const data = { hotelId: id };
    navigate(`/hotel/page`, { state: data });
  };

  return (
    <div className="h-full flex flex-col p-6 bg-gray-50">
      {!isAddingHotel && (
        <>
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
        </>
      )}

      {isAddingHotel ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between">
            <h3 className="text-2xl font-semibold mb-4">Add New Property</h3>
            {/* Cancel Button */}
            <div className="px-3">
              <button
                onClick={handleCancel}
                className="bg-red-500 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
          <HotelForm onButtonClick={handleCancel} />
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto bg-slate-500 bg-opacity-10 rounded-lg">
          {/* Card View */}
          {view === "card" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-2">
              {filteredHotels.map((hotel, index) => (
                <div
                  onClick={(e) => handleNavigate(hotel._id, e)}
                  key={index}
                  className="bg-white cursor-pointer flex flex-col shadow-sm rounded-lg overflow-hidden mx-auto p-3 relative transform transition-all hover:scale-102 duration-200  w-[90%]"
                >
                  <div>
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                    <div className="p-2">
                      <h3 className="text-sm font-medium text-gray-800">
                        {hotel.name}
                      </h3>
                      <p className="text-xs text-gray-500">{hotel.type}</p>
                      <p className="text-xs text-gray-700 mt-2">
                        {hotel.details}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        {hotel.address}
                      </p>
                      <p className="text-sm font-semibold text-gray-900 mt-2">
                        ₹{hotel.price}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between mt-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(index);
                      }}
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
              ))}
            </div>
          ) : (
            // Table View
            <table className="min-w-full bg-white table-auto shadow-lg rounded-lg overflow-hidden">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-700 text-left">
                    Name
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-700 text-left">
                    Type
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-700 text-left">
                    Price
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-700 text-left">
                    Details
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-700 text-left">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {filteredHotels.map((hotel, index) => (
                  <tr
                    key={index}
                    className="border-t border-gray-100 hover:bg-gray-50 transition duration-300"
                  >
                    <td className="px-6 py-4 text-gray-800">{hotel.name}</td>
                    <td className="px-6 py-4 text-gray-600">{hotel.type}</td>
                    <td className="px-6 py-4 text-gray-600 font-medium">
                      {hotel.price}
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-xs max-w-xs truncate">
                      {hotel.details}
                    </td>
                    <td className="px-6 py-4 space-x-2 flex justify-start">
                      <button
                        onClick={() => handleEdit(index)}
                        className="text-indigo-600 hover:text-indigo-800 font-medium text-xs transform hover:scale-105 transition duration-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="text-red-600 hover:text-red-800 font-medium text-xs transform hover:scale-105 transition duration-200"
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
      )}
    </div>
  );
};

export default HotelTab;

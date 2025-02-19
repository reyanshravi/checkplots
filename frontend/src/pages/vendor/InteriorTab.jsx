import React, { useCallback, useState } from "react";
import { VscTable, VscFilter } from "react-icons/vsc";
import { BsCardList } from "react-icons/bs";
import { FaFilter, FaSearch } from "react-icons/fa";
import interiors from "../../Data/interiors";
import InteriorForm from "./Froms/InteriorForm";

const InteriorTab = () => {
  const [view, setView] = useState("card");
  const [interiorList, setInteriorList] = useState(interiors);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBy, setFilterBy] = useState(""); // "name" or "price"
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAddingInterior, setisAddingInterior] = useState(false);

  // submit
  const handleAddInteriorSubmit = useCallback((newInterior) => {
    setInteriorList((prevList) => [...prevList, newInterior]);
    setisAddingInterior(false);
  });

  // Toggle Dropdown
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  // Handle filter change
  const handleFilterChange = (filterType) => {
    setFilterBy(filterType);
    setIsDropdownOpen(false);
  };

  // Toggle between card and table view
  const toggleView = (newView) => setView(newView);

  // Handle delete action
  const handleDelete = (index) => {
    setInteriorList((prevList) => prevList.filter((_, i) => i !== index));
  };

  // Handle edit action
  const handleEdit = (index) => {
    alert(`Edit interior at index ${index}`);
  };

  // Handle add action
  const handleAdd = () => {
    setisAddingInterior(true);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCancel = () => {
    setisAddingInterior(false);
  };

  const filteredInteriors = interiorList.filter((interior) => {
    const searchText = searchQuery.toLowerCase();
    if (filterBy === "name") {
      return interior.name.toLowerCase().includes(searchText);
    } else if (filterBy === "price") {
      return interior.priceRange.toLowerCase().includes(searchText);
    } else {
      return (
        interior.name.toLowerCase().includes(searchText) ||
        interior.priceRange.toLowerCase().includes(searchText)
      );
    }
  });

  return (
    <div className="h-full flex flex-col p-6 bg-gray-50 overflow-y-auto">
      {!isAddingInterior && (
        <>
          <div className="flex justify-between items-center mb-6">
            {/* Heading */}
            <h2 className="text-3xl font-semibold mb-6">
              Interior Design Services
            </h2>

            {/* Add Button */}
            <button
              onClick={handleAdd}
              className="bg-gray-500 text-white px-6 py-2 rounded-md mb-4 hover:bg-gray-600 transition"
            >
              Add Service
            </button>
          </div>

          <div className="flex justify-between items-center mb-6 bg-white px-4 p-2 rounded-xl shadow-md">
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
            <div className="flex items-center space-x-2 ">
              <div className="flex items-center  border-gray-300">
                <FaSearch className="text-gray-500 mr-3 text-lg" />
                <input
                  type="search"
                  placeholder="Search..."
                  className="p-3 w-full border-b outline-none text-sm text-gray-700"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>

              <div>
                <FaFilter
                  className="h-4 w-4 cursor-pointer"
                  onClick={toggleDropdown}
                />
                {/* Dropdown for Filter Options */}
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

      {isAddingInterior ? (
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
          <InteriorForm onSubmit={handleAddInteriorSubmit} />
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto bg-slate-500 bg-opacity-10 rounded-lg">
          {/* Card View */}
          {view === "card" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-2">
              {filteredInteriors.map((interior, index) => (
                <div
                  key={index}
                  className="bg-white shadow-lg rounded-lg overflow-hidden max-w-xs mx-auto p-4"
                >
                  <img
                    src={interior.image}
                    alt={interior.name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-2">
                    <h3 className="text-sm font-semibold text-gray-800">
                      {interior.name}
                    </h3>
                    <p className="text-xs text-gray-500">{interior.type}</p>
                    <p className="text-xs text-gray-700 mt-2">
                      {interior.details}
                    </p>
                    <p className="text-xs text-gray-700 mt-2">
                      {interior.address}
                    </p>
                    <p className="text-xs text-gray-700 mt-2">
                      {interior.price}
                    </p>
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
                {filteredInteriors.map((interior, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2">{interior.name}</td>
                    <td className="px-4 py-2">{interior.type}</td>
                    <td className="px-4 py-2">{interior.price}</td>
                    <td className="px-4 py-2 text-xs max-w-xs truncate">
                      {interior.details}
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
      )}
    </div>
  );
};

export default InteriorTab;

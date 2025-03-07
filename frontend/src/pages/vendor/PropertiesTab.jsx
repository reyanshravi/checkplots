import React, { useState, useMemo, useCallback } from "react";
import { VscTable, VscFilter } from "react-icons/vsc";
import { BsCardList } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import PropertyForm from "./Froms/PropertyForm";
import properties from "../../Data/properties";

const PropertyTab = () => {
  const [view, setView] = useState("card");
  const [propertyList, setPropertyList] = useState(properties);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAddingProperty, setIsAddingProperty] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);

  const toggleView = useCallback((newView) => setView(newView), []);
  const toggleDropdown = useCallback(
    () => setIsDropdownOpen((prev) => !prev),
    []
  );

  const handleSearchChange = useCallback(
    (e) => setSearchQuery(e.target.value),
    []
  );
  const handleFilterChange = useCallback((filterType) => {
    setFilterBy(filterType);
    setIsDropdownOpen(false);
  }, []);

  const handleDelete = useCallback((id) => {
    setPropertyList((prevList) => prevList.filter((property) => property.id !== id));
  }, []);

  const handleEdit = useCallback(
    (id) => {
      // Find the property with the matching id
      const propertyToEdit = propertyList.find(property => property.id === id);
      setEditingProperty(propertyToEdit); // Set the property to be edited
      setIsAddingProperty(true); // Open the form to edit the property

      console.log(propertyToEdit);
      
    },
    [propertyList]
  );

  const handleAdd = useCallback(() => {
    setIsAddingProperty(true);
    setEditingProperty(null); // Clear editing state when adding a new property
  }, []);

  const handleAddPropertySubmit = useCallback(
    (newProperty) => {
      if (editingProperty) {
        // Update the property in the list
        setPropertyList((prevList) =>
          prevList.map((property) =>
            property === editingProperty
              ? { ...property, ...newProperty }
              : property
          )
        );
      } else {
        // Add new property
        setPropertyList((prevList) => [...prevList, newProperty]);
      }
      setIsAddingProperty(false);
      setEditingProperty(null); // Reset after saving changes
    },
    [editingProperty]
  );

  
  const handleCancel = useCallback(() => {
    setIsAddingProperty(false);
    setEditingProperty(null); // Reset when cancelling
  }, []);

  const filteredProperties = useMemo(() => {
    const searchText = searchQuery.toLowerCase();
    return propertyList.filter((property) => {
      if (filterBy === "name") {
        return property.name.toLowerCase().includes(searchText);
      } else if (filterBy === "price") {
        return property.price.toLowerCase().includes(searchText);
      } else {
        return (
          property.name.toLowerCase().includes(searchText) ||
          property.price.toLowerCase().includes(searchText)
        );
      }
    });
  }, [searchQuery, filterBy, propertyList]);

  return (
    <div className="h-full flex flex-col p-6 bg-gray-50 overflow-y-auto">
      {!isAddingProperty && (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-semibold mb-6">Property Listings</h2>
            <button
              onClick={handleAdd}
              className="bg-gray-500 text-white px-6 py-2 rounded-md mb-4 hover:bg-gray-600 transition"
            >
              Add Property
            </button>
          </div>

          <div className="flex justify-between items-center mb-6 bg-white p-2 rounded-xl px-4 shadow-md">
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
              <div className="flex items-center border-gray-300">
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

      {isAddingProperty ? (
        <div className="bg-white p-6 rounded-lg shadow-md ">
          <div className="flex justify-between">
            <h3 className="text-2xl font-semibold mb-4">
              {editingProperty ? "Edit Property" : "Add New Property"}
            </h3>
            <div className="px-3">
              <button
                onClick={handleCancel}
                className="bg-red-500 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
          <PropertyForm
            property={editingProperty} // Pass the property details if editing
            onSubmit={handleAddPropertySubmit}
            onButtonClick={handleCancel}
          />
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto bg-slate-500 bg-opacity-10 rounded-lg">
          {view === "card" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-full py-4">
              {filteredProperties.map((property, index) => (
                <div
                  key={property.id}
                  className="bg-white shadow-lg rounded-lg overflow-hidden max-w-xs mx-auto p-4"
                >
                  <img
                    src={property.image}
                    alt={property.name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-2">
                    <h3 className="text-sm font-semibold text-gray-800">
                      {property.name}
                    </h3>
                    <p className="text-xs text-gray-500">{property.type}</p>
                    <p className="text-xs text-gray-700 mt-2">
                      {property.details}
                    </p>
                    <p className="text-xs text-gray-700 mt-2">
                      {property.address}
                    </p>
                    <p className="text-xs text-gray-700 mt-2">
                      {property.price}
                    </p>
                    <div className="flex justify-between mt-3">
                      <button
                        onClick={() => handleEdit(property.id)}
                        className="text-gray-500 text-xs hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(property.id)}
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
                {filteredProperties.map((property, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2">{property.name}</td>
                    <td className="px-4 py-2">{property.type}</td>
                    <td className="px-4 py-2">{property.price}</td>
                    <td className="px-4 py-2 text-xs max-w-xs truncate">
                      {property.details}
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleEdit(property.id)}
                        className="text-gray-500 text-xs hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(property.id)}
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

export default PropertyTab;

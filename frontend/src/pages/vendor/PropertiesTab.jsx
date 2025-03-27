import React, {
  useState,
  useMemo,
  useCallback,
  useContext,
  useEffect,
} from "react";
import { VscTable, VscFilter } from "react-icons/vsc";
import { BsCardList } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import PropertyForm from "./Froms/PropertyForm";
import { DataContext } from "../../Context/DataProvider";
import { useNavigate } from "react-router-dom";
import PropertyUpdateForm from "./Froms/update/PropertyUpdateForm";

const PropertyTab = () => {
  const [view, setView] = useState("card");
  const [propertyList, setPropertyList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAddingProperty, setIsAddingProperty] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const { propertyData } = useContext(DataContext);
  const navigate = useNavigate();

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
    setPropertyList((prevList) =>
      prevList.filter((property) => property.id !== id)
    );
  }, []);

  const handleEdit = (id) => {
    setEditingProperty(id);
    setIsAddingProperty(true);
  };
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
      setEditingProperty(null);
    },
    [editingProperty]
  );
  useEffect(() => {
    if (propertyData) {
      setPropertyList(propertyData.properties);
    }
  }, [propertyData]);

  const handleCancel = useCallback(() => {
    setIsAddingProperty(false);
    setEditingProperty(null);
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

  const handleClick = (id, e) => {
    console.log("clicked", id);

    e.stopPropagation();

    // Encode the filter data as URL parameters, including the div's id
    const data = { propertyId: id };
    // Navigate to the search results page with the filters as URL parameters
    navigate("/property/page", { state: data });
  };

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

            <button
              onClick={handleCancel}
              className="bg-red-500 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
          {editingProperty ? (
            <PropertyUpdateForm
              propertyId={editingProperty}
              onButtonClick={handleCancel}
            />
          ) : (
            <PropertyForm
              onSubmit={handleAddPropertySubmit}
              onButtonClick={handleCancel}
            />
          )}
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto bg-slate-500 bg-opacity-10 rounded-lg">
          {view === "card" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-full py-4">
              {filteredProperties.map((property, index) => (
                <div
                  onClick={(e) => handleClick(property._id, e)}
                  key={property.id}
                  className="bg-white shadow-md rounded-lg overflow-hidden w-[90%] mx-auto p-3 flex flex-col justify-between cursor-pointer "
                >
                  <div>
                    <img
                      src={property.image}
                      alt={property.name}
                      className="w-full h-40 object-cover rounded-t-lg"
                    />
                    <div className="flex flex-col flex-grow mt-2">
                      <h3 className="text-sm font-semibold text-gray-800 truncate">
                        {property.name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {property.type}
                      </p>
                      <p className="text-xs text-gray-700 mt-2">
                        {property.details}
                      </p>
                      <p className="text-xs text-gray-700 mt-2">
                        {property.address}
                      </p>
                      <p className="text-sm font-semibold text-gray-900 mt-2">
                        ₹ {property.price}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-between  ">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(property._id);
                      }}
                      className="text-blue-600 text-xs font-medium hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        e.stopPropagation();
                        handleDelete(property._id);
                      }}
                      className="text-red-600 text-xs font-medium hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
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
                {filteredProperties.map((property, index) => (
                  <tr
                    key={index}
                    className="border-t border-gray-100 hover:bg-gray-50 transition duration-300"
                  >
                    <td className="px-6 py-4 text-gray-800">{property.name}</td>
                    <td className="px-6 py-4 text-gray-600">{property.type}</td>
                    <td className="px-6 py-4 text-gray-600 font-medium">
                      {property.price}
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-xs max-w-xs truncate">
                      {property.details}
                    </td>
                    <td className="px-6 py-4 space-x-2 flex justify-start">
                      <button
                        onClick={() => handleEdit(property.id)}
                        className="text-indigo-600 hover:text-indigo-800 font-medium text-xs transform hover:scale-105 transition duration-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(property.id)}
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

export default PropertyTab;

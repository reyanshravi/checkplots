import React, { useState } from "react";
import { VscTable, VscFilter } from "react-icons/vsc";
import { BsCardList } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";

// Property Data
const properties = [
  {
    name: "Sunrise Estate Plot",
    type: "Plot",
    details: "5000 sqft • Prime Location • Ready for Construction",
    price: "₹80L",
    pricePerSqft: "₹1,600",
    image: "https://example.com/plot1.png",
    address: "Sector 45, Greater Noida, Uttar Pradesh, India - 201310",
    verified: true,
    underDevelopment: false,
    rating: 4.5,
    reviews: 75,
    plotDimensions: "50 ft x 100 ft",
    facing: "East",
    landmark: "Near Wave City Centre",
    availableFor: "Residential Construction",
    ownershipType: "Freehold",
    amenities: [
      "24/7 Security",
      "Electricity Connection",
      "Water Supply",
      "Paved Roads",
      "Green Area",
      "Nearby Park",
    ],
    contactNumber: "+91 9876 543210",
    website: "https://sunriseestate.com",
    investmentPotential: "High demand area with excellent ROI in 5 years",
  },
  {
    name: "Luxury Heights Apartment",
    type: "Apartment",
    details: "3 BHK • 1800 sqft • Semi-Furnished with Modern Interiors",
    price: "₹1.5 Cr",
    pricePerSqft: "₹8,333",
    image: "https://example.com/apartment1.png",
    address: "Whitefield, Bangalore, Karnataka, India - 560066",
    verified: true,
    underDevelopment: false,
    rating: 4.7,
    reviews: 230,
    plotDimensions: "",
    facing: "North",
    landmark: "Close to IT Hub & Metro Station",
    availableFor: "Residential",
    ownershipType: "Leasehold",
    amenities: [
      "Clubhouse",
      "Swimming Pool",
      "Gym",
      "Children's Play Area",
      "24/7 Power Backup",
      "CCTV Security",
    ],
    contactNumber: "+91 9988 112233",
    website: "https://luxuryheights.com",
    investmentPotential: "Premium locality with high rental yields",
  },
  {
    name: "Ocean Breeze Villa",
    type: "Villa",
    details: "4 BHK • 3000 sqft • Fully Furnished with Scenic Ocean View",
    price: "₹5.2 Cr",
    pricePerSqft: "₹17,333",
    image: "https://example.com/villa1.png",
    address: "Candolim, Goa, India - 403515",
    verified: true,
    underDevelopment: false,
    rating: 4.8,
    reviews: 120,
    plotDimensions: "",
    facing: "West",
    landmark: "Near Candolim Beach",
    availableFor: "Holiday Home / Residential",
    ownershipType: "Freehold",
    amenities: [
      "Private Pool",
      "Fully Equipped Kitchen",
      "Garage",
      "Garden Area",
      "Oceanfront Terrace",
      "24/7 Security",
    ],
    contactNumber: "+91 9700 112233",
    website: "https://oceanbreezevilla.com",
    investmentPotential:
      "High rental potential for vacationers with luxury demand",
  },
  {
    name: "Green Meadows Farmhouse",
    type: "Farmhouse",
    details: "10 Acres • Peaceful Environment • Farm-to-Table Lifestyle",
    price: "₹3 Cr",
    pricePerSqft: "₹3,000",
    image: "https://example.com/farmhouse1.png",
    address: "Sultanpur, Haryana, India - 122001",
    verified: true,
    underDevelopment: false,
    rating: 4.2,
    reviews: 50,
    plotDimensions: "500 ft x 872 ft",
    facing: "South",
    landmark: "Near Sultanpur Bird Sanctuary",
    availableFor: "Agriculture / Farmstay",
    ownershipType: "Freehold",
    amenities: [
      "Swimming Pool",
      "Farm Fresh Produce",
      "Sustainable Water Supply",
      "Organic Garden",
      "Security Services",
    ],
    contactNumber: "+91 9123 765432",
    website: "https://greenmeadowsfarmhouse.com",
    investmentPotential: "Perfect for organic farming or agricultural tourism",
  },
  {
    name: "Skyline Tower Office Space",
    type: "Commercial Office",
    details:
      "5000 sqft • High Rise Building • Fully Equipped with Modern Amenities",
    price: "₹4 Cr",
    pricePerSqft: "₹8,000",
    image: "https://example.com/office1.png",
    address: "MG Road, Gurgaon, Haryana, India - 122018",
    verified: true,
    underDevelopment: false,
    rating: 4.6,
    reviews: 30,
    plotDimensions: "",
    facing: "North-East",
    landmark: "Close to Cyber Hub and Metro Station",
    availableFor: "Commercial / Office Use",
    ownershipType: "Leasehold",
    amenities: [
      "24/7 Power Backup",
      "High-Speed Internet",
      "Conference Rooms",
      "CCTV Surveillance",
      "Elevators",
    ],
    contactNumber: "+91 8888 123456",
    website: "https://skylinetower.com",
    investmentPotential: "Ideal for tech startups and corporate offices",
  },
  {
    name: "Serene Lakeview Apartment",
    type: "Apartment",
    details: "2 BHK • 1200 sqft • Semi-Furnished with Scenic Lake Views",
    price: "₹85L",
    pricePerSqft: "₹7,083",
    image: "https://example.com/apartment2.png",
    address: "Lakeside Road, Pune, Maharashtra, India - 411041",
    verified: true,
    underDevelopment: false,
    rating: 4.4,
    reviews: 65,
    plotDimensions: "",
    facing: "West",
    landmark: "Near Vishwa Lake",
    availableFor: "Residential",
    ownershipType: "Freehold",
    amenities: [
      "Gymnasium",
      "Clubhouse",
      "Children's Play Area",
      "24/7 Water Supply",
      "CCTV Surveillance",
    ],
    contactNumber: "+91 9999 543210",
    website: "https://serenelakeview.com",
    investmentPotential:
      "Ideal for first-time homebuyers with growing locality",
  },
];

const PropertyTab = () => {
  const [view, setView] = useState("card");
  const [propertyList, setPropertyList] = useState(properties);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBy, setFilterBy] = useState(""); // "name" or "price"
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
    setPropertyList((prevList) => prevList.filter((_, i) => i !== index));
  };

  // Handle edit action
  const handleEdit = (index) => {
    alert(`Edit property at index ${index}`);
  };

  // Handle add action
  const handleAdd = () => {
    alert("Add new property");
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredProperties = propertyList.filter((property) => {
    const searchText = searchQuery.toLowerCase();
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

  return (
    <div className="h-full flex flex-col p-6 bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        {/* Heading */}
        <h2 className="text-3xl font-semibold mb-6">Property Listings</h2>

        {/* Add Button */}
        <button
          onClick={handleAdd}
          className="bg-gray-500 text-white px-6 py-2 rounded-md mb-4 hover:bg-gray-600 transition"
        >
          Add Property
        </button>
      </div>

      <div className="flex justify-between items-center mb-6 bg-white p-2 rounded-xl px-4 shadow-md">
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

      <div className="flex-1 overflow-y-auto bg-slate-500 bg-opacity-10 rounded-lg">
        {/* Card View */}
        {view === "card" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-full py-4">
            {filteredProperties.map((property, index) => (
              <div
                key={index}
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
                  <p className="text-xs text-gray-700 mt-2">{property.price}</p>
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

export default PropertyTab;

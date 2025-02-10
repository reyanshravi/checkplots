import React, { useState } from "react";
import { VscTable, VscFilter } from "react-icons/vsc";
import { BsCardList } from "react-icons/bs";
import { FaFilter,FaSearch } from "react-icons/fa";

// Interior Data
const interiors = [
  {
    name: "Vibrant Spaces",
    type: "Interior Design & Furnishing",
    details: "Bringing Vibrance to Your Home with Trendy Designs",
    price: "Starts at ₹12,000 per room",
    priceRange: "₹12,000 - ₹6,00,000",
    image: "https://checkplots.com/vendor/img/interior_img_1.png",
    address: "C-34, Sector 23, Gurgaon, Haryana, India - 122001",
    verified: true,
    rating: 4.7,
    reviews: 310,
    services: [
      "Complete Home Interiors",
      "Luxury Bedroom Designs",
      "Modular Wardrobes",
      "Office Workstation Design",
      "Custom Lighting Solutions",
      "Ceiling & Wall Designs",
    ],
    specialOffers: "10% Off for New Customers",
    portfolioLink: "https://vibrantspaces.com/portfolio",
    contactNumber: "+91 9876 999888",
    website: "https://vibrantspaces.com",
    projectTimeline: "Typically 5-7 weeks per project",
    consultation: "Free Consultation for First-time Clients",
    designStyle: ["Contemporary", "Bohemian", "Industrial", "Eclectic"],
    pastClients: ["Sunshine Co. Office", "Elite Homes - Luxury Villas"],
  },
  {
    name: "Sleek Interiors",
    type: "Interior Design & Furnishing",
    details: "Modern and Sleek Designs for a Stylish Living Experience",
    price: "Starts at ₹15,000 per room",
    priceRange: "₹15,000 - ₹8,00,000",
    image: "https://checkplots.com/vendor/img/interior_img_2.png",
    address: "H-12, MG Road, Bengaluru, Karnataka, India - 560001",
    verified: true,
    rating: 4.9,
    reviews: 450,
    services: [
      "Custom Home Interiors",
      "Office Layout & Planning",
      "Smart Home Integration",
      "Luxury Kitchen Designs",
      "Space Optimization",
      "Furniture Selection & Customization",
    ],
    specialOffers: "Free Lighting Design Consultation for New Clients",
    portfolioLink: "https://sleekinteriors.com/portfolio",
    contactNumber: "+91 9500 112233",
    website: "https://sleekinteriors.com",
    projectTimeline: "Typically 6-8 weeks per project",
    consultation: "Free Initial Consultation",
    designStyle: ["Modern", "Sleek", "Industrial", "Contemporary"],
    pastClients: ["TechZone Ltd. Office", "Bella Homes - Premium Residences"],
  },
  {
    name: "UrbanNest Interiors",
    type: "Interior Design & Furnishing",
    details: "Designing Urban Living Spaces with a Touch of Class",
    price: "Starts at ₹18,000 per room",
    priceRange: "₹18,000 - ₹10,00,000",
    image: "https://checkplots.com/vendor/img/interior_img_3.png",
    address: "M-67, Connaught Place, New Delhi, India - 110001",
    verified: true,
    rating: 4.6,
    reviews: 380,
    services: [
      "Urban Apartment Designs",
      "Modern Office Designs",
      "Kitchen & Bathroom Renovations",
      "3D Rendering & Visualizations",
      "Space Planning",
      "Furniture & Decor Sourcing",
    ],
    specialOffers: "15% Discount on Full House Renovation",
    portfolioLink: "https://urbannestinteriors.com/portfolio",
    contactNumber: "+91 8123 654987",
    website: "https://urbannestinteriors.com",
    projectTimeline: "Typically 4-6 weeks per project",
    consultation: "Free Design Consultation",
    designStyle: ["Urban", "Contemporary", "Minimalist", "Scandi"],
    pastClients: [
      "Global Solutions Inc. Office",
      "Laurels Residences - Luxury Apartments",
    ],
  },
  {
    name: "Luxe Interiors",
    type: "Interior Design & Furnishing",
    details: "Exquisite Luxury Interiors for Premium Homes and Offices",
    price: "Starts at ₹20,000 per room",
    priceRange: "₹20,000 - ₹12,00,000",
    image: "https://checkplots.com/vendor/img/property_img_5477141462315.jpeg",
    address: "K-45, Bandra West, Mumbai, Maharashtra, India - 400050",
    verified: true,
    rating: 5.0,
    reviews: 150,
    services: [
      "Luxury Home Interiors",
      "High-end Office Space Design",
      "Bespoke Furniture Design",
      "Lighting & Decor Customization",
      "3D Visualization & Concept Design",
      "Art & Sculpture Curation",
    ],
    specialOffers: "20% Discount for New Luxury Clients",
    portfolioLink: "https://luxeinteriors.com/portfolio",
    contactNumber: "+91 9987 123456",
    website: "https://luxeinteriors.com",
    projectTimeline: "Typically 6-8 weeks per project",
    consultation: "Free High-end Design Consultation",
    designStyle: ["Luxury", "Glam", "Modern", "Classic"],
    pastClients: ["Diamond Corp. Office", "Opulence Villas - Luxury Homes"],
  },
  {
    name: "Creative Interiors",
    type: "Interior Design & Furnishing",
    details: "Innovative Interior Solutions to Enhance Your Living Spaces",
    price: "Starts at ₹8,000 per room",
    priceRange: "₹8,000 - ₹3,00,000",
    image: "https://checkplots.com/vendor/img/interior_img_5.png",
    address: "P-80, Whitefield, Bengaluru, Karnataka, India - 560066",
    verified: true,
    rating: 4.5,
    reviews: 275,
    services: [
      "Budget-friendly Home Interiors",
      "Modern Office Designs",
      "Customized Wall Art",
      "Space-efficient Furniture Solutions",
      "Decor & Styling",
      "Home Renovation",
    ],
    specialOffers: "5% Discount for All Services in the First Month",
    portfolioLink: "https://creativeinteriors.com/portfolio",
    contactNumber: "+91 9900 334455",
    website: "https://creativeinteriors.com",
    projectTimeline: "Typically 3-5 weeks per project",
    consultation: "Free Initial Design Consultation",
    designStyle: ["Modern", "Affordable", "Functional", "Contemporary"],
    pastClients: ["Startup Hub Office", "Cosmic Homes - Affordable Housing"],
  },
];

const InteriorTab = () => {
  const [view, setView] = useState("card");
  const [interiorList, setInteriorList] = useState(interiors);
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
    setInteriorList((prevList) => prevList.filter((_, i) => i !== index));
  };

  // Handle edit action
  const handleEdit = (index) => {
    alert(`Edit interior at index ${index}`);
  };

  // Handle add action
  const handleAdd = () => {
    alert("Add new interior service");
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
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
    <div className="p-6 bg-gray-50">
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
              onChange={(e) => setSearchQuery(e.target.value)}
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

      <div className="h-[420px] overflow-y-auto">
        {/* Card View */}
        {view === "card" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <p className="text-xs text-gray-700 mt-2">{interior.price}</p>
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
    </div>
  );
};

export default InteriorTab;

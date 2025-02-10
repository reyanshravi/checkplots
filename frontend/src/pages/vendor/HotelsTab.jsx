import React, { useState } from "react";
import { VscTable, VscFilter } from "react-icons/vsc";
import { BsCardList } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";

// Hotel Data
const hotels = [
  {
    name: "Grand Royal Hotel",
    type: "Luxury Hotel",
    details: "Executive Suite • 1 King Bed • Ocean View",
    price: "₹18,000 per night",
    pricePerNight: "₹18K",
    image: "https://example.com/hotel1.png",
    address: "Marine Drive, Mumbai, Maharashtra, India - 400020",
    verified: true,
    underRenovation: false,
    rating: 4.9,
    reviews: 1520,
    facilities: [
      "Free Wi-Fi",
      "Infinity Pool",
      "Spa & Wellness",
      "24/7 Room Service",
      "Business Center",
      "Concierge Service",
    ],
    checkInTime: "3:00 PM",
    checkOutTime: "12:00 PM",
    availableRooms: 20,
    nearbyAttractions: [
      "Gateway of India - 2 km",
      "Marine Drive - 500 m",
      "Elephanta Caves - 10 km",
    ],
    cancellationPolicy: "Free cancellation up to 48 hours before check-in",
    specialOffers: "Stay 3 nights & get 1 night free",
    contactNumber: "+91 22 1234 5678",
    website: "https://grandroyalhotel.com",
    amenities: [
      "Air Conditioning",
      "Mini Bar",
      "Tea/Coffee Maker",
      "Luxury Toiletries",
      "Safety Deposit Box",
      "Flat-Screen TV",
    ],
  },
  {
    name: "Horizon Inn",
    type: "Boutique Hotel",
    details: "Deluxe Room • Queen Bed • City Skyline View",
    price: "₹6,500 per night",
    pricePerNight: "₹6.5K",
    image: "https://example.com/hotel2.png",
    address: "Connaught Place, New Delhi, India - 110001",
    verified: true,
    underRenovation: false,
    rating: 4.6,
    reviews: 980,
    facilities: [
      "High-Speed Wi-Fi",
      "Rooftop Restaurant",
      "Gym & Fitness Center",
      "Laundry Services",
      "24-hour Front Desk",
    ],
    checkInTime: "2:00 PM",
    checkOutTime: "11:00 AM",
    availableRooms: 15,
    nearbyAttractions: [
      "India Gate - 4 km",
      "Red Fort - 6 km",
      "Lotus Temple - 8 km",
    ],
    cancellationPolicy: "Free cancellation up to 24 hours before check-in",
    specialOffers: "10% off on direct bookings",
    contactNumber: "+91 11 9876 5432",
    website: "https://horizoninn.com",
    amenities: [
      "Smart TV",
      "Tea/Coffee Maker",
      "Hair Dryer",
      "Rain Shower",
      "Work Desk",
    ],
  },
  {
    name: "Sunset Villas",
    type: "Resort",
    details: "Beachfront Villa • 2 King Beds • Oceanfront View",
    price: "₹25,000 per night",
    pricePerNight: "₹25K",
    image: "https://example.com/hotel3.png",
    address: "Goa, India",
    verified: true,
    underRenovation: false,
    rating: 4.8,
    reviews: 1125,
    facilities: [
      "Private Beach Access",
      "Infinity Pool",
      "Water Sports Equipment",
      "Spa & Wellness",
      "Kids' Club",
    ],
    checkInTime: "4:00 PM",
    checkOutTime: "10:00 AM",
    availableRooms: 10,
    nearbyAttractions: [
      "Baga Beach - 2 km",
      "Anjuna Beach - 5 km",
      "Fort Aguada - 12 km",
    ],
    cancellationPolicy: "Free cancellation up to 72 hours before check-in",
    specialOffers: "Book 5 nights & get 2 nights free",
    contactNumber: "+91 832 1234 5678",
    website: "https://sunsetvillas.com",
    amenities: [
      "Air Conditioning",
      "Private Pool",
      "Mini Bar",
      "Ocean View",
      "Flat-Screen TV",
    ],
  },
  {
    name: "Cityscape Hotel",
    type: "Business Hotel",
    details: "Executive Room • 1 Queen Bed • City View",
    price: "₹7,500 per night",
    pricePerNight: "₹7.5K",
    image: "https://example.com/hotel4.png",
    address: "MG Road, Bengaluru, Karnataka, India - 560001",
    verified: true,
    underRenovation: true,
    rating: 4.3,
    reviews: 800,
    facilities: [
      "Business Center",
      "Conference Room",
      "High-Speed Wi-Fi",
      "Restaurant & Bar",
      "Laundry Services",
    ],
    checkInTime: "2:00 PM",
    checkOutTime: "11:00 AM",
    availableRooms: 25,
    nearbyAttractions: [
      "Cubbon Park - 3 km",
      "Bangalore Palace - 5 km",
      "UB City Mall - 2 km",
    ],
    cancellationPolicy: "Free cancellation up to 48 hours before check-in",
    specialOffers: "15% off on bookings above ₹15,000",
    contactNumber: "+91 80 1234 5678",
    website: "https://cityscapehotel.com",
    amenities: [
      "Air Conditioning",
      "Mini Bar",
      "Tea/Coffee Maker",
      "Hair Dryer",
      "Work Desk",
    ],
  },
  {
    name: "Mountain Retreat",
    type: "Eco Resort",
    details: "Cottage • 1 Double Bed • Mountain View",
    price: "₹8,000 per night",
    pricePerNight: "₹8K",
    image: "https://example.com/hotel5.png",
    address: "Shimla, Himachal Pradesh, India",
    verified: true,
    underRenovation: false,
    rating: 4.7,
    reviews: 600,
    facilities: [
      "Organic Farm",
      "Hiking Trails",
      "Restaurant with Local Cuisine",
      "Yoga & Meditation Center",
      "24/7 Room Service",
    ],
    checkInTime: "12:00 PM",
    checkOutTime: "10:00 AM",
    availableRooms: 12,
    nearbyAttractions: [
      "Kufri - 12 km",
      "The Ridge - 6 km",
      "Jakhoo Temple - 3 km",
    ],
    cancellationPolicy: "Free cancellation up to 48 hours before check-in",
    specialOffers: "Stay 2 nights & get a free guided hike",
    contactNumber: "+91 177 1234 5678",
    website: "https://mountainretreat.com",
    amenities: [
      "Fireplace",
      "Organic Food",
      "Mountain View",
      "Rain Shower",
      "Yoga Mats",
    ],
  },
];

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
    <div className="p-6 bg-gray-50">
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

      <div className="h-[420px] overflow-y-auto">
        {/* Card View */}
        {view === "card" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHotels.map((hotel, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg overflow-hidden max-w-xs mx-auto p-4"
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

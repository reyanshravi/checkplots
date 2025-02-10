import React, { useState } from "react";
import { FaHeart, FaSearch, FaSort, FaRegTrashAlt } from "react-icons/fa";

// Dummy data with images and price info
const dummyWishlist = [
  {
    id: 1,
    name: "Luxury Penthouse",
    location: "New York, USA",
    price: 2000000,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Modern Villa",
    location: "Los Angeles, USA",
    price: 1500000,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Beachfront Cottage",
    location: "Miami, USA",
    price: 850000,
    image: "https://via.placeholder.com/150",
  },
];

const WishlistTab = () => {
  const [wishlist, setWishlist] = useState(dummyWishlist);
  const [isSortedAscending, setIsSortedAscending] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleRemoveFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== id);
    setWishlist(updatedWishlist);
  };

  const handleSortByPrice = () => {
    const sortedWishlist = [...wishlist].sort((a, b) =>
      isSortedAscending ? a.price - b.price : b.price - a.price
    );
    setWishlist(sortedWishlist);
    setIsSortedAscending(!isSortedAscending);
  };

  const handleClearWishlist = () => {
    if (window.confirm("Are you sure you want to clear the wishlist?")) {
      setWishlist([]);
    }
  };

  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredWishlist = wishlist.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="wishlist-tab bg-gray-50 p-6 rounded-lg shadow-lg  mx-auto w-full h-full">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4 flex justify-between items-center">
        Wishlist
        <span className="text-sm text-gray-500">{wishlist.length} items</span>
      </h2>

      {/* Wishlist Controls */}
      <div className="flex justify-between mb-8 items-center">
        <div className="flex items-center space-x-3">
          {/* Search Bar with Icon */}
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-8 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm w-64"
              placeholder="Search items..."
            />
            <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>

          {/* Sort Button */}
          <button
            onClick={handleSortByPrice}
            className="text-gray-600 hover:text-gray-800 flex items-center space-x-1 border px-3 py-2 rounded-md transition duration-200"
          >
            <FaSort />
            <span>
              {isSortedAscending
                ? "Sort by Price: Low to High"
                : "Sort by Price: High to Low"}
            </span>
          </button>
        </div>
        <button
          onClick={handleClearWishlist}
          className="text-red-600 hover:text-red-800 flex items-center space-x-1"
        >
          <FaRegTrashAlt className="text-xl" />
          <span>Clear Wishlist</span>
        </button>
      </div>

      {/* Wishlist Items */}
      <div className="space-y-4">
        {filteredWishlist.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border-b pb-4 hover:bg-gray-50 transition-all duration-200 cursor-pointer"
          >
            <div className="flex space-x-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg shadow-md"
              />
              <div>
                <p className="text-lg font-semibold text-gray-700">
                  {item.name}
                </p>
                <p className="text-sm text-gray-500">{item.location}</p>
                <p className="text-sm font-semibold text-gray-800">
                  ₹{item.price.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleOpenModal(item)}
                className="text-gray-600 hover:text-gray-800"
              >
                View Details
              </button>
              <button
                onClick={() => handleRemoveFromWishlist(item.id)}
                className="text-red-600 hover:text-red-800"
              >
                <FaHeart size={20} className="transform hover:scale-110" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Item Details Modal */}
      {isModalOpen && selectedItem && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              <FaHeart className="text-xl" />
            </button>
            <h3 className="text-xl font-semibold text-gray-700">
              {selectedItem.name}
            </h3>
            <img
              src={selectedItem.image}
              alt={selectedItem.name}
              className="w-full h-48 object-cover rounded-lg my-4"
            />
            <p className="text-sm text-gray-500">{selectedItem.location}</p>
            <p className="text-lg font-semibold text-gray-800 my-2">
              ₹{selectedItem.price.toLocaleString()}
            </p>
            <button
              onClick={handleCloseModal}
              className="mt-4 w-full bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WishlistTab;

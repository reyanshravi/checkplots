import React, { useState, useMemo, useEffect } from "react";
import {
  FaBell,
  FaFilter,
  FaSearch,
  FaChevronDown,
  FaChevronUp,
  FaRegCalendarAlt,
} from "react-icons/fa";
import axios from "axios";

const dummyEnquiries = [
  {
    id: 1,
    customerName: "John Doe",
    date: "2025-02-10",
    message: "Interested in booking a room for 2 nights.",
    status: "pending",
  },
  {
    id: 2,
    customerName: "Jane Smith",
    date: "2025-02-09",
    message: "Inquiry about wedding event packages.",
    status: "responded",
  },
  {
    id: 3,
    customerName: "Alice Johnson",
    date: "2025-02-08",
    message: "Looking for conference room availability.",
    status: "closed",
  },
  {
    id: 4,
    customerName: "Bob Brown",
    date: "2025-02-07",
    message: "Need a quote for a family vacation.",
    status: "pending",
  },
  {
    id: 5,
    customerName: "Charlie Davis",
    date: "2025-02-06",
    message: "Request for a meeting room for a business event.",
    status: "responded",
  },
  {
    id: 6,
    customerName: "Eve Wilson",
    date: "2025-02-05",
    message: "Interested in booking a room for 2 nights.",
    status: "closed",
  },
  {
    id: 7,
    customerName: "Grace Lee",
    date: "2025-02-04",
    message: "Inquiry about wedding event packages.",
    status: "pending",
  },
  {
    id: 8,
    customerName: "Henry Clark",
    date: "2025-02-03",
    message: "Looking for conference room availability.",
    status: "responded",
  },
  {
    id: 9,
    customerName: "Ivy Thomas",
    date: "2025-02-02",
    message: "Need a quote for a family vacation.",
    status: "closed",
  },
  {
    id: 10,
    customerName: "Jack Evans",
    date: "2025-02-01",
    message: "Request for a meeting room for a business event.",
    status: "pending",
  },
];

const statusColors = {
  pending: "bg-yellow-300",
  responded: "bg-gray-300",
  closed: "bg-green-300",
};

export default function EnquiryTab() {
  const [enquiries, setEnquiries] = useState(dummyEnquiries);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [expandedEnquiryId, setExpandedEnquiryId] = useState(null);

  // Fetch enquiries from the backend
  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7002/api/vendor/enquiries"
        ); // Replace with your API URL
        setEnquiries(response.data.enquiries);
        // Set the fetched data into the state
      } catch (error) {
        console.error("Error fetching enquiries:", error);
      }
    };

    fetchEnquiries(); // Call the function to fetch data on component mount
  }, []); // Empty array means this effect runs once when the component mounts

  // Memoize filtered enquiries
  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((enquiry) => {
      const matchesQuery = enquiry.message
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesStatus =
        filterStatus === "all" || enquiry.status === filterStatus;
      return matchesQuery && matchesStatus;
    });
  }, [enquiries, searchQuery, filterStatus]);

  const toggleExpansion = (id) => {
    setExpandedEnquiryId(id === expandedEnquiryId ? null : id);
  };

  // Format date function
  const formatDate = (date) => {
    const formattedDate = new Date(date).toLocaleDateString("en-US", {
      weekday: "long", // e.g., "Tuesday"
      year: "numeric", // e.g., "2025"
      month: "long", // e.g., "April"
      day: "numeric", // e.g., "1"
    });
    return formattedDate;
  };
  

  return (
    <div className="p-6 bg-gray-50">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Enquiries</h2>

      {/* Search bar and filter */}
      <div className="mb-6 flex items-center space-x-4 bg-white p-4 rounded-xl shadow-md">
        {/* Search Bar */}
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search enquiries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 pl-10 border rounded-xl w-full focus:outline-none shadow-md text-sm"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>

        {/* Filter Dropdown */}
        <div className="relative">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="p-2 pl-10 border rounded-xl shadow-md text-sm"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="responded">Responded</option>
            <option value="closed">Closed</option>
          </select>
          <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <FaBell className="text-xl cursor-pointer" />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2 py-1">
            3
          </span>
        </div>
      </div>

      {/* Fixed height container for the cards */}
      <div className="space-y-4 max-h-[420px] overflow-y-auto">
        {filteredEnquiries.length === 0 ? (
          <p className="text-center text-gray-500">No enquiries found</p>
        ) : (
          filteredEnquiries.map((enquiry) => (
            <div
              key={enquiry.id}
              className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all ease-in-out duration-300"
              onClick={() => toggleExpansion(enquiry.id)}
            >
              <div className="flex justify-between items-center mb-2">
                <div>
                  <span className="text-md font-semibold text-gray-800">
                    {enquiry.name}
                  </span>
                  <div className="flex items-center space-x-1 mt-1">
                    <FaRegCalendarAlt className="text-sm text-gray-500" />
                    <span className="text-sm text-gray-500">
                      {formatDate(enquiry.updatedAt)}
                    </span>
                  </div>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    statusColors[enquiry.status]
                  } capitalize`}
                >
                  {enquiry.status}
                </span>
              </div>

              <p className="text-gray-700 text-xs">{enquiry.message}</p>

              {expandedEnquiryId === enquiry.id && (
                <div className="mt-3">
                  <textarea
                    className="p-2 border rounded-xl w-full text-sm"
                    placeholder="Write your response..."
                    rows="3"
                  ></textarea>
                  <div className="flex justify-end mt-3">
                    <button className="bg-blue-600 text-white py-2 px-4 rounded-xl text-sm">
                      Send Response
                    </button>
                  </div>
                </div>
              )}

              <div className="mt-2 flex justify-end text-gray-500">
                {expandedEnquiryId === enquiry.id ? (
                  <FaChevronUp className="text-lg" />
                ) : (
                  <FaChevronDown className="text-lg" />
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

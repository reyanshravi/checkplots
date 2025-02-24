import React, { useState } from "react";
import { FaWhatsapp, FaHome, FaStoreAlt, FaHotel } from "react-icons/fa";

export default function PropertyPost() {
  const [selectedType, setSelectedType] = useState(null);

  const handleTypeSelection = (type) => {
    setSelectedType(type);
  };

  return (
    <div className="flex flex-col lg:flex-row p-10 max-w-screen-xl mx-auto space-y-6 lg:space-y-0 lg:space-x-12 bg-gray-50 my-16 mt-20 md:px-20">
      {/* Left Section - Form */}
      <div className="flex-1 ">
        <h1 className="text-3xl font-semibold mb-2">
          Sell or Rent your Property
        </h1>
        <p className="text-sm mb-6 text-gray-600">
          Get your property sold or rented quickly and easily with our platform
          for <span className="font-semibold text-red-500">FREE</span>
        </p>

        <h2 className="text-xl font-semibold mb-4">Property Details :</h2>

        {/* Property Type Selection */}
        <div className="mb-6">
          <h3 className="text-base font-semibold mb-3">Select Property Type</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <button
              className={`${
                selectedType === "sale"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700"
              } p-4 border border-gray-300 rounded-lg shadow-md hover:bg-blue-100 focus:outline-none w-full flex items-center justify-center text-sm transition duration-200`}
              onClick={() => handleTypeSelection("sale")}
            >
              <FaHome className="mr-2 text-lg" />
              Sale
            </button>
            <button
              className={`${
                selectedType === "rent"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700"
              } p-4 border border-gray-300 rounded-lg shadow-md hover:bg-blue-100 focus:outline-none w-full flex items-center justify-center text-sm transition duration-200`}
              onClick={() => handleTypeSelection("rent")}
            >
              <FaStoreAlt className="mr-2 text-lg" />
              Rent/Lease
            </button>
            <button
              className={`${
                selectedType === "pg"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700"
              } p-4 border border-gray-300 rounded-lg shadow-md hover:bg-blue-100 focus:outline-none w-full flex items-center justify-center text-sm transition duration-200`}
              onClick={() => handleTypeSelection("pg")}
            >
              <FaHotel className="mr-2 text-lg" />
              PG/Hostel
            </button>
          </div>
        </div>

        {/* Property Location */}
        <div className="mb-8">
          <h3 className="text-base font-semibold mb-3">Property Location</h3>
          <label htmlFor="city" className="block text-sm text-gray-700 mb-2">
            City
          </label>
          <input
            type="text"
            name="city"
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 text-sm focus:ring-2 focus:ring-blue-500"
            placeholder="Enter city"
          />

          <label
            htmlFor="locality"
            className="block text-sm text-gray-700 mb-2"
          >
            Locality
          </label>
          <input
            type="text"
            name="locality"
            className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            placeholder="Enter locality"
          />
        </div>

        {/* Exclusivity Checkbox */}
        <div className="mb-3 flex items-center">
          <input
            type="checkbox"
            name="exclusive"
            id="exclusive"
            className="mr-2 text-sm"
          />
          <label htmlFor="exclusive" className="text-sm text-gray-700">
            I am posting this property "exclusively" on Magicbricks
          </label>
        </div>

        {/* WhatsApp Checkbox */}
        <div className="mb-3 flex items-center">
          <input
            type="checkbox"
            name="whatsapp"
            id="whatsapp"
            className="mr-2 text-sm"
          />
          <label htmlFor="whatsapp" className="text-sm text-gray-700">
            I want to receive responses on Whatsapp
          </label>
        </div>
        <div className="mb-3 flex items-start">
          <input
            type="checkbox"
            name="whatsapp"
            id="whatsapp"
            className="mr-2 text-sm"
          />
          <label htmlFor="whatsapp" className="text-xs text-gray-700">
            I am the owner/I have the authority to post this property. I agree
            not to provide incorrect property information or state a
            discriminatory preference. In case, the information does not comply
            with Magicbricks terms, Magicbricks.com has the right to edit/remove
            the property from their site.{" "}
          </label>
        </div>

        <div>
          <button className="px-8 py-3 bg-red-600 text-white hover:bg-red-700 my-7">
            Countinue to post
          </button>
        </div>

        <div className="mt-4">
          <h1 className="font-bold">Looking to Sell or Rent your Flat?</h1>
          <p className="text-sm mt-2 text-gray-500">
            Do you want to Sell your flat or put your house on rent? Magicbricks
            has the right solution for you.Your advertisement will be viewed by
            millions of buyers and tenants in India.Magicbricks provides you the
            best classified for your requirement. Our website offers one free
            property ad that you can use for selling or renting . You will be
            able to sell or rent every real estate property from flat or house
            to land , even commercial property fast and immediately.
          </p>
        </div>
      </div>

      {/* Right Section - Sticky */}
      <div className="w-full lg:w-1/3 sticky top-20 p-6 bg-gray-50 shadow-lg rounded-lg h-96">
        <h2 className="text-xl font-semibold mb-6">
          How to find the right buyer
        </h2>
        <div>
          <div className="mb-6 border p-3 cursor-pointer hover:shadow-md transition-shadow duration-300 ease-out">
            <h3 className="text-lg font-semibold flex items-center mb-3">
              <FaWhatsapp className="mr-3 text-blue-500" />
              Respond to Buyer Enquiries
            </h3>
            <p className="text-sm text-gray-700">
              Connect with buyers when they contact about your property. View up
              to 2 contact details for FREE!
            </p>
          </div>
          <div className="border p-3 cursor-pointer hover:shadow-md transition-shadow duration-300 ease-out">
            <h3 className="text-lg font-semibold flex items-center mb-3">
              <FaStoreAlt className="mr-3 text-blue-500" />
              Connect with Matching Buyers
            </h3>
            <p className="text-sm text-gray-700">
              Actively check for matching buyers and connect with them.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

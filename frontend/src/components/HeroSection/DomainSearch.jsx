// import React, { useState } from "react";
// import { VscSettings } from "react-icons/vsc";

// // React Component
// const DomainSearch = () => {
//   const [filterOpen, setFilterOpen] = useState(false);
//   const [selectedLocation, setSelectedLocation] = useState("US");
//   const [domainName, setDomainName] = useState("");
//   const [priceRange, setPriceRange] = useState(0);
//   const [minBedrooms, setMinBedrooms] = useState("");
//   const [maxBedrooms, setMaxBedrooms] = useState("");

//   // States to track the selected tabs
//   const [activeTab1, setActiveTab1] = useState("rent"); 
//   const [activeTab2, setActiveTab2] = useState("residential"); 
//   const [activeTab3, setActiveTab3] = useState("flat"); 

//   const handleFilterToggle = () => setFilterOpen((prev) => !prev);

//   const handleTabClick = (tab, tabType) => {
//     if (tabType === 1) setActiveTab1(tab);
//     if (tabType === 2) setActiveTab2(tab);
//     if (tabType === 3) setActiveTab3(tab);
//   };

//   return (
//     <div className="container mx-auto bg-black bg-opacity-40 rounded-lg px-6 pt-4 sm:p-8 w-full sm:w-11/12 md:w-2/3 lg:w-1/2 shadow-xl z-10">
//       <div className="flex items-center divide-x sm:max-h-72 overflow-y-auto mb-2 ">
//         {/* Tabs for Rent/Buy */}
//         <div className="flex sm:max-h-full">
//           {["Rent", "Buy"].map((tab) => (
//             <button
//               key={tab}
//               className={`tab text-black py-2 px-4 rounded-lg mb-2 sm:mb-0 focus:outline-none text-sm sm:text-base relative group transition-all duration-300 ease-in-out ${
//                 activeTab1 === tab.toLowerCase()
//                   ? "font-semibold text-white"
//                   : "hover:underline text-gray-500 hover:underline-offset-8 "
//               }`}
//               onClick={() => handleTabClick(tab.toLowerCase(), 1)}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>

//         {/* Tabs for Flat/Property */}
//         <div className="flex px-2 relative sm:max-h-full ">
//           {["Flat", "Property"].map((tab) => (
//             <button
//               key={tab}
//               className={`tab text-black py-2 px-4 rounded-lg mb-2 sm:mb-0 focus:outline-none text-sm sm:text-base relative group transition-all duration-300 ease-in-out ${
//                 activeTab3 === tab.toLowerCase()
//                   ? "font-semibold text-white"
//                   : "hover:underline text-gray-500 hover:underline-offset-8 "
//               }`}
//               onClick={() => handleTabClick(tab.toLowerCase(), 3)}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>

//         {/* Tabs for Residential/Commercial */}
//         <div className="flex px-2 relative sm:max-h-full ">
//           {["Residential", "Commercial"].map((tab) => (
//             <button
//               key={tab}
//               className={`tab text-black py-2 px-4 rounded-lg mb-2 sm:mb-0 focus:outline-none text-sm sm:text-base relative group transition-all duration-300 ease-in-out ${
//                 activeTab2 === tab.toLowerCase()
//                   ? "font-semibold text-white"
//                   : "hover:underline text-gray-500 hover:underline-offset-8  "
//               }`}
//               onClick={() => handleTabClick(tab.toLowerCase(), 2)}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Form for searching domain */}
//       <form>
//         <div className="flex flex-col sm:flex-row items-center bg-white border space-x-2 md:rounded-full overflow-hidden px-3 py-3 md:px-6 justify-between">
//           <div className="flex items-center space-x-2 ">
//             {/* Location Dropdown with icon */}
//             <div className="flex items-center  sm:mb-0 space-x-2  px-2">
//               <img
//                 src="https://img.icons8.com/ios-filled/50/000000/worldwide-location.png"
//                 alt="Location"
//                 className="w-4 h-4 sm:w-5 sm:h-5"
//               />
//               <select
//                 value={selectedLocation}
//                 onChange={(e) => setSelectedLocation(e.target.value)}
//                 className="text-base text-gray-800 outline-none bg-white py-1 rounded-lg transition-all w-16 sm:w-36"
//                 aria-label="Select Location"
//               >
//                 <option value="US">United States</option>
//                 <option value="UK">United Kingdom</option>
//                 <option value="IN">India</option>
//                 <option value="CA">Canada</option>
//               </select>
//             </div>

//             {/* Search input */}
//             <input
//               type="text"
//               placeholder="Search.."
//               value={domainName}
//               onChange={(e) => setDomainName(e.target.value)}
//               className="text-base text-gray-800 flex-grow outline-none px-4 py-2 border-2 rounded-lg  sm:mb-0 border-none transition-all w-full sm:w-64"
//               aria-label="Domain Name Search"
//             />
//             <button
//               type="button"
//               onClick={handleFilterToggle}
//               className="border text-black text-sm sm:text-base rounded-full px-4 sm:px-6 py-2 font-semibold transition-all flex items-center gap-2"
//               aria-label="Toggle Filters"
//             >
//               <VscSettings />
//               <span className="hidden sm:inline">Filter</span>
//             </button>
//           </div>

//           {/* Filter and Search buttons */}
//           <div className="">
//             <button
//               type="button"
//               className="bg-gray-800 text-white text-sm sm:text-base rounded-full px-4 sm:px-6 py-2 font-semibold transition-all hover:bg-gray-500 focus:outline-none w-full"
//               aria-label="Search"
//             >
//               Search
//             </button>
//           </div>
//         </div>

//         {/* Filter options that expand on button click */}
//         <div
//       className={`mt-4 bg-gray-200 p-6 rounded-lg transition-all ease-in-out overflow-hidden ${
//         filterOpen ? "max-h-[1000px] py-6" : "max-h-0 py-0"
//       }`}
//       style={{ transitionProperty: "max-height, padding" }}
//     >
//       <h3 className="text-black font-semibold mb-4">Filter Options</h3>

//       {/* Conditional Inputs based on selected tab */}
//       {activeTab1 === "rent" && (
//         <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4">
//           <div className="w-full sm:w-1/2">
//             <label className="text-gray-500">Price Range</label>
//             <input
//               type="range"
//               min="0"
//               max="1000"
//               value={priceRange}
//               onChange={(e) => setPriceRange(e.target.value)}
//               className="w-full mt-2"
//             />
//             <span className="text-sm text-gray-600">Price: ${priceRange}</span>
//           </div>

//           <div className="w-full sm:w-1/2">
//             <label className="text-gray-500">Bedrooms</label>
//             <div className="flex space-x-4 mt-2">
//               <input
//                 type="number"
//                 value={minBedrooms}
//                 onChange={(e) => setMinBedrooms(e.target.value)}
//                 placeholder="Min"
//                 className="px-2 py-1 border rounded-lg w-full"
//               />
//               <input
//                 type="number"
//                 value={maxBedrooms}
//                 onChange={(e) => setMaxBedrooms(e.target.value)}
//                 placeholder="Max"
//                 className="px-2 py-1 border rounded-lg w-full"
//               />
//             </div>
//           </div>
//         </div>
//       )}

//       {activeTab1 === "buy" && (
//         <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4">
//           <div className="w-full sm:w-1/2">
//             <label className="text-gray-500">Price Range</label>
//             <input
//               type="range"
//               min="0"
//               max="10000"
//               value={priceRange}
//               onChange={(e) => setPriceRange(e.target.value)}
//               className="w-full mt-2"
//             />
//             <span className="text-sm text-gray-600">Price: ${priceRange}</span>
//           </div>

//           <div className="w-full sm:w-1/2">
//             <label className="text-gray-500">Mortgage Option</label>
//             <select
//               value={minBedrooms}
//               onChange={(e) => setMinBedrooms(e.target.value)}
//               className="text-base text-gray-800 outline-none border-2 px-4 py-2 rounded-lg transition-all focus:ring-2 focus:ring-indigo-500"
//               aria-label="Mortgage Option"
//             >
//               <option value="yes">Yes</option>
//               <option value="no">No</option>
//             </select>
//           </div>
//         </div>
//       )}

//       {/* Amenities Section */}
//       <div className="mt-4">
//         <label className="text-gray-500">Amenities</label>
//         <div className="flex space-x-4 mt-2">
//           <label className="text-gray-600">
//             <input type="checkbox" /> Pool
//           </label>
//           <label className="text-gray-600">
//             <input type="checkbox" /> Gym
//           </label>
//           <label className="text-gray-600">
//             <input type="checkbox" /> Parking
//           </label>
//         </div>
//       </div>
//     </div>
//       </form>
//     </div>
//   );
// };

// export default DomainSearch;


import React, { useState } from "react";
import { VscSettings } from "react-icons/vsc";

// React Component
const DomainSearch = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("US");
  const [domainName, setDomainName] = useState("");
  const [priceRange, setPriceRange] = useState(0);
  const [minBedrooms, setMinBedrooms] = useState("");
  const [maxBedrooms, setMaxBedrooms] = useState("");
  const [propertyType, setPropertyType] = useState(""); // New state for property type

  // States to track the selected tabs
  const [activeTab1, setActiveTab1] = useState("rent");
  const [activeTab2, setActiveTab2] = useState("residential");
  const [activeTab3, setActiveTab3] = useState("flat");

  const handleFilterToggle = () => setFilterOpen((prev) => !prev);

  const handleTabClick = (tab, tabType) => {
    if (tabType === 1) setActiveTab1(tab);
    if (tabType === 2) setActiveTab2(tab);
    if (tabType === 3) setActiveTab3(tab);
  };

  return (
    <div className="container mx-auto bg-black bg-opacity-40 rounded-lg px-6 pt-4 sm:p-8 w-full sm:w-11/12 md:w-2/3 lg:w-1/2 shadow-xl z-10">
      <div className="flex items-center divide-x sm:max-h-72 overflow-y-auto mb-2 ">
        {/* Tabs for Rent/Buy */}
        <div className="flex sm:max-h-full">
          {["Rent", "Buy"].map((tab) => (
            <button
              key={tab}
              className={`tab text-black py-2 px-4 rounded-lg mb-2 sm:mb-0 focus:outline-none text-sm sm:text-base relative group transition-all duration-300 ease-in-out ${
                activeTab1 === tab.toLowerCase()
                  ? "font-semibold text-white"
                  : "hover:underline text-gray-500 hover:underline-offset-8 "
              }`}
              onClick={() => handleTabClick(tab.toLowerCase(), 1)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tabs for Flat/Property */}
        <div className="flex px-2 relative sm:max-h-full ">
          {["Flat", "Property"].map((tab) => (
            <button
              key={tab}
              className={`tab text-black py-2 px-4 rounded-lg mb-2 sm:mb-0 focus:outline-none text-sm sm:text-base relative group transition-all duration-300 ease-in-out ${
                activeTab3 === tab.toLowerCase()
                  ? "font-semibold text-white"
                  : "hover:underline text-gray-500 hover:underline-offset-8 "
              }`}
              onClick={() => handleTabClick(tab.toLowerCase(), 3)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tabs for Residential/Commercial */}
        <div className="flex px-2 relative sm:max-h-full ">
          {["Residential", "Commercial"].map((tab) => (
            <button
              key={tab}
              className={`tab text-black py-2 px-4 rounded-lg mb-2 sm:mb-0 focus:outline-none text-sm sm:text-base relative group transition-all duration-300 ease-in-out ${
                activeTab2 === tab.toLowerCase()
                  ? "font-semibold text-white"
                  : "hover:underline text-gray-500 hover:underline-offset-8  "
              }`}
              onClick={() => handleTabClick(tab.toLowerCase(), 2)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Form for searching domain */}
      <form>
        <div className="flex flex-col sm:flex-row items-center bg-white border space-x-2 md:rounded-full overflow-hidden px-3 py-3 md:px-6 justify-between">
          <div className="flex items-center space-x-2 ">
            {/* Location Dropdown with icon */}
            <div className="flex items-center sm:mb-0 space-x-2 px-2">
              <img
                src="https://img.icons8.com/ios-filled/50/000000/worldwide-location.png"
                alt="Location"
                className="w-4 h-4 sm:w-5 sm:h-5"
              />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="text-base text-gray-800 outline-none bg-white py-1 rounded-lg transition-all w-16 sm:w-36"
                aria-label="Select Location"
              >
                <option value="US">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="IN">India</option>
                <option value="CA">Canada</option>
              </select>
            </div>

            {/* Search input */}
            <input
              type="text"
              placeholder="Search.."
              value={domainName}
              onChange={(e) => setDomainName(e.target.value)}
              className="text-base text-gray-800 flex-grow outline-none px-4 py-2 border-2 rounded-lg sm:mb-0 border-none transition-all w-full sm:w-64"
              aria-label="Domain Name Search"
            />
            <button
              type="button"
              onClick={handleFilterToggle}
              className="border text-black text-sm sm:text-base rounded-full px-4 sm:px-6 py-2 font-semibold transition-all flex items-center gap-2"
              aria-label="Toggle Filters"
            >
              <VscSettings />
              <span className="hidden sm:inline">Filter</span>
            </button>
          </div>

          {/* Filter and Search buttons */}
          <div className="">
            <button
              type="button"
              className="bg-gray-800 text-white text-sm sm:text-base rounded-full px-4 sm:px-6 py-2 font-semibold transition-all hover:bg-gray-500 focus:outline-none w-full"
              aria-label="Search"
            >
              Search
            </button>
          </div>
        </div>

        {/* Filter options that expand on button click */}
        <div
          className={`mt-4 bg-gray-200 p-6 rounded-lg transition-all ease-in-out overflow-hidden ${
            filterOpen ? "max-h-[1000px] py-6" : "max-h-0 py-0"
          }`}
          style={{ transitionProperty: "max-height, padding" }}
        >
          <h3 className="text-black font-semibold mb-4">Filter Options</h3>

          {/* Conditional Inputs based on selected tab */}
          {activeTab1 === "rent" && (
            <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="w-full sm:w-1/2">
                <label className="text-gray-500">Price Range</label>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full mt-2"
                />
                <span className="text-sm text-gray-600">Price: ₹{priceRange}</span>
              </div>

              <div className="w-full sm:w-1/2">
                <label className="text-gray-500">Bedrooms</label>
                <div className="flex space-x-4 mt-2">
                  <input
                    type="number"
                    value={minBedrooms}
                    onChange={(e) => setMinBedrooms(e.target.value)}
                    placeholder="Min"
                    className="px-2 py-1 border rounded-lg w-full"
                  />
                  <input
                    type="number"
                    value={maxBedrooms}
                    onChange={(e) => setMaxBedrooms(e.target.value)}
                    placeholder="Max"
                    className="px-2 py-1 border rounded-lg w-full"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab1 === "buy" && (
            <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="w-full sm:w-1/2">
                <label className="text-gray-500">Price Range</label>
                <input
                  type="range"
                  min="0"
                  max="5000000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full mt-2"
                />
                <span className="text-sm text-gray-600">Price: ₹{priceRange}</span>
              </div>

              <div className="w-full sm:w-1/2">
                <label className="text-gray-500">Property Type</label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="text-base text-gray-800 outline-none bg-white py-1 rounded-lg transition-all w-full mt-2"
                >
                  <option value="">Any Type</option>
                  <option value="villa">Villa</option>
                  <option value="hotel">Hotel</option>
                  <option value="flat">Flat</option>
                </select>
              </div>
            </div>
          )}

          {/* Filters for Amenities */}
          <div className="mt-4">
            <label className="text-gray-500">Amenities</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
              <div>
                <input type="checkbox" id="pool" />
                <label htmlFor="pool" className="ml-2">Swimming Pool</label>
              </div>
              <div>
                <input type="checkbox" id="gym" />
                <label htmlFor="gym" className="ml-2">Gym</label>
              </div>
              <div>
                <input type="checkbox" id="parking" />
                <label htmlFor="parking" className="ml-2">Parking</label>
              </div>
              <div>
                <input type="checkbox" id="roomService" />
                <label htmlFor="roomService" className="ml-2">Room Service</label>
              </div>
              <div>
                <input type="checkbox" id="beach" />
                <label htmlFor="beach" className="ml-2">Private Beach Access</label>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DomainSearch;

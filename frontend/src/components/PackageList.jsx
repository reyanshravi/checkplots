import React, { useState } from 'react';

// PackageCard component - Represents each individual package
const PackageCard = ({
  packageName,
  packageDescription,
  packageTerm,
  packagePrice,
  packageStatus,
  numberOfLeads,
  listingType,
  numberOfListings,
  imageUrl,
  onSelectPackage,
  selected
}) => {
  return (
    <div
      className={`max-w-sm rounded-lg overflow-hidden shadow-md bg-white p-5 m-4 border ${selected ? 'border-blue-500' : 'border-gray-300'}`}
      style={{ transition: 'all 0.3s ease-in-out' }}
    >
      {/* Image */}
      <div className="mb-4">
        <img src={imageUrl} alt={packageName} className="w-full h-40 object-cover rounded-md mb-4" />
      </div>

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{packageName}</h3>
        <span
          className={`text-sm px-3 py-1 rounded-full ${packageStatus === 'Active' ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-800'}`}
        >
          {packageStatus}
        </span>
      </div>
      <p className="text-gray-600 text-sm mb-4">{packageDescription}</p>
      <div className="mb-4 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Term:</span>
          <span className="text-gray-800">{packageTerm} Months</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Price:</span>
          <span className="text-gray-800">₹{packagePrice}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Leads:</span>
          <span className="text-gray-800">{numberOfLeads}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Listing Type:</span>
          <span className="text-gray-800">{listingType}</span>
        </div>
        {listingType === 'Limited' && (
          <div className="flex justify-between">
            <span className="text-gray-500">Number of Listings:</span>
            <span className="text-gray-800">{numberOfListings}</span>
          </div>
        )}
      </div>
      <button
        className={`w-full py-2 rounded-lg text-sm font-medium transition duration-300 ${
          selected ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300 cursor-not-allowed'
        } text-white focus:outline-none focus:ring-2 focus:ring-blue-400`}
        onClick={onSelectPackage}
        disabled={!packageStatus || packageStatus === 'Inactive'}
      >
        {packageStatus === 'Inactive' ? 'Package Unavailable' : 'Select Package'}
      </button>
    </div>
  );
};

// Main PackageList component
const PackageList = () => {
  const [userPackage, setUserPackage] = useState(null); // Tracks the current package
  const [packages, setPackages] = useState([
    {
      id: 1,
      packageName: 'Basic Package',
      packageDescription: 'Access to basic features.',
      packageTerm: 6,
      packagePrice: 1999,
      packageStatus: 'Active',
      numberOfLeads: 50,
      listingType: 'Limited',
      numberOfListings: 10,
      imageUrl: 'https://via.placeholder.com/400x200?text=Basic+Package', // Example image
    },
    {
      id: 2,
      packageName: 'Premium Package',
      packageDescription: 'Access to premium features with unlimited leads.',
      packageTerm: 12,
      packagePrice: 4999,
      packageStatus: 'Active',
      numberOfLeads: 100,
      listingType: 'Unlimited',
      numberOfListings: null,
      imageUrl: 'https://via.placeholder.com/400x200?text=Premium+Package', // Example image
    },
    {
      id: 3,
      packageName: 'Enterprise Package',
      packageDescription: 'For large-scale users, with full features.',
      packageTerm: 24,
      packagePrice: 9999,
      packageStatus: 'Inactive',
      numberOfLeads: 500,
      listingType: 'Limited',
      numberOfListings: 50,
      imageUrl: 'https://via.placeholder.com/400x200?text=Enterprise+Package', // Example image
    },
  ]); // List of available packages
  const [selectedPackage, setSelectedPackage] = useState(null); // Stores selected package for the vendor
  const [isUpdating, setIsUpdating] = useState(false); // Flag to check if we are updating the package
  const [error, setError] = useState('');
  const [message, setMessage] = useState(''); // For displaying success or failure messages

  // Function to handle package selection
  const handlePackageSelection = (pkg) => {
    setSelectedPackage(pkg); // Set the selected package
    setMessage(''); // Clear any success/error messages when selecting a new package
  };

  // Function to confirm package selection
  const handleConfirmSelection = () => {
    if (!selectedPackage) {
      setError('Please select a package to continue.');
      return;
    }
    setUserPackage(selectedPackage); // Set the user package to the selected package
    setMessage('Package selected successfully!');
    setError(''); // Clear error message
    setIsUpdating(false); // Exit the update mode after selecting
  };

  // Handle updating the package after it's selected
  const handlePackageUpdate = () => {
    setIsUpdating(true); // Set the update mode on
    setSelectedPackage(null); // Reset selected package to allow selection again
  };

  return (
    <div className="flex flex-col items-center justify-center py-8">
      {/* Display Current Package if Selected */}
      {userPackage && !isUpdating ? (
        <div className="w-full p-4">
          <h3 className="text-3xl font-semibold mb-6 text-center">Your Current Package</h3>
          <PackageCard {...userPackage} onSelectPackage={handlePackageUpdate} selected />
          <button
            className="w-full bg-yellow-500 text-white py-2 mt-4 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            onClick={handlePackageUpdate}
          >
            Update Package
          </button>
        </div>
      ) : (
        <>
          <h3 className="text-2xl font-semibold mb-6 text-center">
            {isUpdating ? 'Update Your Package' : 'Choose the Best Package for You'}
          </h3>
          <div className="flex flex-row flex-wrap justify-center">
            {packages.map((pkg) => (
              <div key={pkg.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
                <PackageCard {...pkg} onSelectPackage={() => handlePackageSelection(pkg)} selected={pkg.id === selectedPackage?.id} />
              </div>
            ))}
          </div>
          {selectedPackage && (
            <div className="w-full mt-6 p-4 text-center">
              <h4 className="text-xl font-semibold mb-4">You have selected: {selectedPackage.packageName}</h4>
              <button
                className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                onClick={handleConfirmSelection}
              >
                Confirm Selection
              </button>
            </div>
          )}
        </>
      )}

      {/* Error or Success Message */}
      {error && <div className="text-red-500 mt-4">{error}</div>}
      {message && <div className="text-green-500 mt-4">{message}</div>}
    </div>
  );
};

export default PackageList;

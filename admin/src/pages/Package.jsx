import { useState } from "react";

const Package = () => {
  // Dummy package data
  const [packages, setPackages] = useState([
    {
      id: 1,
      name: "Premium Package",
      price: "$299",
      discountedPrice: "$249",
      leadLimit: "100",
      listing: "Unlimited",
      validity: "6 Months",
      image:
        "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    },
    {
      id: 2,
      name: "Basic Package",
      price: "$149",
      discountedPrice: "$99",
      leadLimit: "50",
      listing: "Limited",
      validity: "3 Months",
      image:
        "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    },
  ]);

  // Function to add a new package
  const addNewPackage = () => {
    const newPackage = {
      id: packages.length + 1,
      name: `Special Package ${packages.length + 1}`,
      price: "$399",
      discountedPrice: "$349",
      leadLimit: "150",
      listing: "Unlimited",
      validity: "12 Months",
      image:
        "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    };
    setPackages([...packages, newPackage]);
  };

  return (
    <div className="max-w-7xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Available Packages</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <a
            key={pkg.id}
            href="#"
            className="block rounded-lg p-4 shadow-lg border bg-white"
          >
            <img
              alt={pkg.name}
              src={pkg.image}
              className="h-56 w-full rounded-md object-cover"
            />

            <div className="mt-2">
              <h3 className="text-lg font-semibold">{pkg.name}</h3>

              <dl>
                <div>
                  <dt className="sr-only">Price</dt>
                  <dd className="text-sm text-gray-500 line-through">{pkg.price}</dd>
                  <dd className="text-sm font-bold text-green-600">
                    {pkg.discountedPrice}
                  </dd>
                </div>

                <div>
                  <dt className="sr-only">Lead Limit</dt>
                  <dd className="font-medium">Leads: {pkg.leadLimit}</dd>
                </div>

                <div>
                  <dt className="sr-only">Listing</dt>
                  <dd className="text-sm text-gray-500">Listing: {pkg.listing}</dd>
                </div>

                <div>
                  <dt className="sr-only">Validity</dt>
                  <dd className="text-sm text-gray-500">Validity: {pkg.validity}</dd>
                </div>
              </dl>
            </div>
          </a>
        ))}
      </div>

      <button
        onClick={addNewPackage}
        className="mt-6 w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        Add New Package
      </button>
    </div>
  );
};

export default Package;

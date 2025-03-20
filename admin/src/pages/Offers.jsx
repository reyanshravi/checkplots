import { useState } from "react";

const Offer = () => {
  // Dummy offer data
  const [offers, setOffers] = useState([
    {
      id: 1,
      name: "Summer Special",
      code: "SUMMER50",
      fromDate: "2025-06-01",
      toDate: "2025-06-30",
      description: "Get 50% off on all bookings this summer!",
      status: "Active",
      image:
        "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    },
    {
      id: 2,
      name: "New Year Bonanza",
      code: "NEWYEAR2025",
      fromDate: "2024-12-25",
      toDate: "2025-01-05",
      description: "Special discounts to welcome the new year!",
      status: "Pending",
      image:
        "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    },
  ]);

  // Function to add a new offer
  const addNewOffer = () => {
    const newOffer = {
      id: offers.length + 1,
      name: `Special Deal ${offers.length + 1}`,
      code: `OFFER${1000 + offers.length}`,
      fromDate: "2025-07-01",
      toDate: "2025-07-15",
      description: "Limited-time special discount for premium customers!",
      status: "Inactive",
      image:
        "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    };
    setOffers([...offers, newOffer]);
  };

  return (
    <div className="max-w-7xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Available Offers</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <a
            key={offer.id}
            href="#"
            className="block rounded-lg p-4 shadow-lg border bg-white"
          >
            <img
              alt={offer.name}
              src={offer.image}
              className="h-56 w-full rounded-md object-cover"
            />

            <div className="mt-2">
              <h3 className="text-lg font-semibold">{offer.name}</h3>

              <dl>
                <div>
                  <dt className="sr-only">Offer Code</dt>
                  <dd className="text-sm text-gray-500">Code: {offer.code}</dd>
                </div>

                <div>
                  <dt className="sr-only">Date Range</dt>
                  <dd className="text-sm text-gray-500">
                    {offer.fromDate} - {offer.toDate}
                  </dd>
                </div>

                <div>
                  <dt className="sr-only">Description</dt>
                  <dd className="text-sm text-gray-500">{offer.description}</dd>
                </div>

                <div>
                  <dt className="sr-only">Status</dt>
                  <dd
                    className={`text-sm font-semibold ${
                      offer.status === "Active"
                        ? "text-green-600"
                        : offer.status === "Pending"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {offer.status}
                  </dd>
                </div>
              </dl>
            </div>
          </a>
        ))}
      </div>

      <button
        onClick={addNewOffer}
        className="mt-6 w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        Add New Offer
      </button>
    </div>
  );
};

export default Offer;

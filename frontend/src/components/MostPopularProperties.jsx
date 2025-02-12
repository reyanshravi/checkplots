import React from "react";
import { FaStar } from "react-icons/fa"; // React icon for star

const MostPopularProperties = () => {
  const properties = [
    {
      id: 2970,
      name: "ECO SARSUNA VILLAGE",
      type: "Villa • 3 BHK • 2 Baths  4 Balcony",
      price: 1.2,
      emi: 14,
      avgPrice: 16,
      rating: 5,
      address:
        "Joka Metro Station, Diamond Harbour Road, Diamond Park, Joka, Kolkata, West Bengal, India • Kolkata, West Bengal - 700104",
      imageUrl:
        "https://checkplots.com/vendor/img/property_img_7141181726485.jpeg",
      constructionStatus: "under construction",
    },
    {
      id: 2968,
      name: "A M Pinnacle",
      type: "Flat/Apartment • 3 BHK • 3 Baths  3 Balcony",
      price: 60,
      emi: 69.67,
      avgPrice: 4,
      rating: 5,
      address:
        "Parsa Bazar, Punpun, Nathupur, Bihar, India • Patna, Bihar - 804453",
      imageUrl:
        "https://checkplots.com/vendor/img/property_img_3366003774439.png",
      constructionStatus: "under construction",
    },
    {
      id: 2967,
      name: "BHAWANI HEIGHTS",
      type: "Flat/Apartment • 3 BHK • 2 Baths  3 Balcony",
      price: 70,
      emi: 81.28,
      avgPrice: 4.7,
      rating: 5,
      address:
        "Bhawani Heights(Bhawani Infracon Pvt.Ltd, Ram Krishna Puram, Ashopur, Saguna More, Bihar, India • Patna, Bihar - 801503",
      imageUrl:
        "https://checkplots.com/vendor/img/property_img_5477141462315.jpeg",
      constructionStatus: "ready to move",
    },
    {
      id: 2966,
      name: "RD Height Saguna More, Patna",
      type: "Flat/Apartment • 3 BHK • 3 Baths  3 Balcony",
      price: 75,
      emi: 87.08,
      avgPrice: 4.7,
      rating: 5,
      address:
        "R.K. Puram, Balaji Nagar, New Tarachak, Danapur Nizamat, Danapur, Bihar, India • Patna, Bihar - 801503",
      imageUrl:
        "https://checkplots.com/vendor/img/property_img_5621898845824.jpg",
      constructionStatus: "ready to move",
    },
    // (additional properties...)
  ];

  const uniqueProperties = Array.from(new Set(properties.map((a) => a.id))).map(
    (id) => properties.find((a) => a.id === id)
  );

  return (
    <div className="px-8 pb-8 bg-gray-50">
      <h2 className="text-3xl font-bold text-left mb-12 inline">
        Most Popular Properties
      </h2>
      <h3 className=" font-bold text-right text-blue-400 mr-10  mb-4">
        View all {">>"}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {uniqueProperties.map((property) => (
          <div
            key={property.id}
            className="bg-white w-80 rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div className="relative">
              {property.constructionStatus && (
                <div className="absolute top-3 left-3 bg-black text-white text-xs px-2 py-1 rounded-full shadow-md">
                  {property.constructionStatus}
                </div>
              )}
              <a href={`property?id=${property.id}`} className="block">
                <img
                  src={property.imageUrl || "https://via.placeholder.com/300"}
                  alt={property.name}
                  className="w-full h-40 object-cover rounded-t-lg"
                />
              </a>
            </div>
            <div className="p-3">
              <h5 className="text-lg font-semibold text-gray-800 mb-2">
                <a
                  href={`property?id=${property.id}`}
                  className="hover:text-blue-600 transition-colors duration-200"
                >
                  {property.name}
                </a>
              </h5>
              <p className="text-sm text-gray-500 mb-2">{property.type}</p>
              <div className="flex justify-between mb-3">
                <div>
                  <h6 className="text-lg font-bold text-gray-800">
                    ₹ {property.price}K
                  </h6>
                  <p className="text-xs text-gray-500">
                    EMI starts at ₹ {property.emi}K
                  </p>
                </div>
                <div>
                  <h6 className="text-lg font-bold text-gray-800">
                    ₹ {property.avgPrice}K
                  </h6>
                  <p className="text-xs text-gray-500">Avg. Price/sq.ft</p>
                </div>
              </div>
              <div className="flex mb-2">
                {[...Array(Number(property.rating) || 0)].map((_, index) => (
                  <FaStar key={index} className="text-yellow-500 w-4 h-4" />
                ))}
              </div>
              <p className="text-xs text-gray-500">{property.address}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostPopularProperties;

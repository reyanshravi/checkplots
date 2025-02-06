import React, { useState } from "react";

const ProductPage = () => {

  const hotelData = {
    "id": 1,
    "name": "Royal Palace Hotel",
    "type": "Luxury Hotel",
    "details": "Deluxe Suite • 1 King Bed • City View",
    "price": "₹12,000 per night",
    "emi": "₹1,500 per month (for long-term stay)",
    "pricePerNight": "₹12K",
    "image": "https://checkplots.com/vendor/img/hotel_img_3366003774439.png",
    "address": "MG Road, Connaught Place, New Delhi, India - 110001",
    "verified": true,
    "underRenovation": false,
    "rating": 4.7,
    "reviews": 1280,
    "facilities": [
      "Free Wi-Fi", 
      "Swimming Pool", 
      "Spa and Wellness Center", 
      "Fitness Center", 
      "24/7 Room Service", 
      "Conference Rooms", 
      "On-Site Parking"
    ],
    "checkInTime": "2:00 PM",
    "checkOutTime": "12:00 PM",
    "availableRooms": 15,
    "nearbyAttractions": [
      "India Gate - 5 km",
      "Red Fort - 7 km",
      "Qutub Minar - 10 km"
    ],
    "cancellationPolicy": "Free cancellation up to 24 hours before check-in",
    "specialOffers": "20% discount on bookings for 3+ nights",
    "contactNumber": "+91 11 1234 5678",
    "website": "https://royalpalacehotel.in",
    "amenities": [
      "Air Conditioning",
      "Mini Bar",
      "Tea/Coffee Maker",
      "Hair Dryer",
      "Safety Deposit Box",
      "Television"
    ]
  };

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleDateChange = (e, type) => {
    if (type === "start") {
      setStartDate(e.target.value);
    } else {
      setEndDate(e.target.value);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-[#D9E3F0] to-[#F1F6F9] pt-20">
      {/* Left Section: Main Content */}
      <div className="flex-1 overflow-y-auto p-8 space-y-16 lg:space-y-8 max-w-7xl mx-auto">

        {/* Product Gallery */}
        <section>
          <div className="w-full h-96 bg-gradient-to-b from-[#6C7B8B] to-[#A9B9D3] rounded-xl overflow-hidden mb-8 shadow-xl hover:scale-105 transition-all duration-300">
            <img
              src={hotelData.image}
              alt={hotelData.name}
              className="w-full h-full object-cover transition-transform duration-500 transform"
            />
          </div>
        </section>

        {/* Overview Section */}
        <section className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all">
          <h2 className="text-4xl font-semibold text-[#2D3748] mb-6">{hotelData.name}</h2>
          <p className="text-[#4A5568] text-lg leading-relaxed">{hotelData.details}</p>
        </section>

        {/* About Section */}
        <section className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all">
          <h2 className="text-4xl font-semibold text-[#2D3748] mb-6">About This Property</h2>
          <p className="text-[#4A5568] text-lg leading-relaxed">
            {hotelData.details} Enjoy world-class amenities and personalized services.
          </p>
        </section>

        {/* Key Features Section */}
        <section className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all">
          <h2 className="text-4xl font-semibold text-[#2D3748] mb-6">Key Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotelData.facilities.map((feature, index) => (
              <div key={index} className="bg-[#EDF2F7] p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all">
                <h3 className="text-xl font-semibold text-[#2D3748]">{feature}</h3>
                <p className="text-[#4A5568] mt-4">Experience top-notch amenities for your comfort during your stay.</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all">
          <h2 className="text-4xl font-semibold text-[#2D3748] mb-6">Customer Testimonials</h2>
          {/* Assuming testimonials are not provided yet. */}
          <p className="text-[#4A5568] text-lg leading-relaxed">Check out reviews from our happy guests!</p>
        </section>

        {/* Location and Nearby Attractions Section */}
        <section className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all">
          <h2 className="text-4xl font-semibold text-[#2D3748] mb-6">Nearby Attractions</h2>
          <div className="space-y-4">
            {hotelData.nearbyAttractions.map((attraction, index) => (
              <p key={index} className="text-[#4A5568] text-lg">{attraction}</p>
            ))}
          </div>
        </section>

        {/* Cancellation Policy Section */}
        <section className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all">
          <h2 className="text-4xl font-semibold text-[#2D3748] mb-6">Cancellation Policy</h2>
          <p className="text-[#4A5568] text-lg">{hotelData.cancellationPolicy}</p>
        </section>

        {/* Price Breakdown Section */}
        <section className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all">
          <h2 className="text-4xl font-semibold text-[#2D3748] mb-6">Price Breakdown</h2>
          <div className="text-[#4A5568] text-lg">
            <p>Nightly Rate: <span className="font-semibold text-[#2D3748]">{hotelData.price}</span></p>
            <p>Service Fee: <span className="font-semibold text-[#2D3748]">₹500</span></p>
            <p className="font-semibold text-[#2D3748] mt-4 text-xl">Total: <span className="text-[#4A5568]">₹12,500</span></p>
          </div>
        </section>

        {/* Map Section */}
        <section className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all">
          <h2 className="text-4xl font-semibold text-[#2D3748] mb-6">Location on Map</h2>
          <div className="w-full h-64 bg-[#A9B9D3] rounded-lg overflow-hidden shadow-xl mb-8">
            <iframe
              className="w-full h-full"
              src="https://www.google.com/maps/embed?pb=..."
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </section>
      </div>

      {/* Right Section: Fixed Sidebar */}
      <div className="w-full lg:w-96 p-8 sticky top-0 h-full shadow-2xl rounded-l-lg rounded-t-none space-y-12 ">

        {/* Enquiry Form Section */}
        <section className="bg-gradient-to-br from-[#6C7B8B] to-[#A9B9D3] p-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-semibold text-white mb-6">Make an Enquiry</h2>
          <form>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-4 bg-[#EDF2F7] text-[#2D3748] rounded-2xl mb-4 focus:outline-none focus:ring-2 focus:ring-[#2D3748] transition-all"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-4 bg-[#EDF2F7] text-[#2D3748] rounded-2xl mb-4 focus:outline-none focus:ring-2 focus:ring-[#2D3748] transition-all"
            />
            <textarea
              placeholder="Your Message"
              className="w-full p-4 bg-[#EDF2F7] text-[#2D3748] rounded-2xl mb-6 focus:outline-none focus:ring-2 focus:ring-[#2D3748] transition-all"
              rows="4"
            />
            <button
              type="submit"
              className="w-full py-3 px-4 bg-[#2D3748] text-white font-semibold rounded-2xl hover:bg-[#4A5568] transition-all duration-200"
            >
              Submit Enquiry
            </button>
          </form>
        </section>

        {/* Special Offers Section */}
        <section className="bg-[#F7FAFC] p-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-semibold text-[#2D3748] mb-4">Special Offers</h2>
          <ul className="space-y-4">
            <li className="bg-[#EDF2F7] p-4 rounded-xl shadow-md hover:shadow-lg transition-all">
              <p className="text-[#2D3748] font-medium">{hotelData.specialOffers}</p>
            </li>
          </ul>
        </section>

        {/* Book Now Button */}
        <button
          className="w-full py-3 px-4 bg-[#2D3748] text-white font-semibold rounded-2xl hover:bg-[#4A5568] mt-6"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default ProductPage;

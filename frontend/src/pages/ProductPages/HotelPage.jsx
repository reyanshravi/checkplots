import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { FaLocationDot, FaEye, FaCalendarDays } from "react-icons/fa6";
import ReviewItem from "../../components/ReviewItem";
import { useLocation } from "react-router-dom";

const ProductPage = () => {
  const location = useLocation();
  const { hotelId } = location.state || {};
  const images = [
    { id: 1, src: "/images/images1.jpg", alt: "Backyard" },
    { id: 2, src: "/images/pool.jpg", alt: "Balcony View" },
    { id: 3, src: "/images/img1.jpg", alt: "Floor Plan" },
    { id: 4, src: "/images/img2.jpg", alt: "Floor Plan" },
  ];

  const [selectedImage, setSelectedImage] = useState(images[0]);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [enquiry, setEnquiry] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    scheduleDate: "",
    apartment: "Walnut Park Apartments", // Default option
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState(null);

  // Handle input change for form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEnquiry((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus(null);

    try {
      // POST request to the backend endpoint
      const response = await fetch("http://localhost:7002/api/vendor/enquire", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(enquiry),
      });

      if (!response.ok) {
        throw new Error("Failed to submit enquiry");
      }

      const result = await response.json();
      setFormStatus("Success! Your enquiry has been submitted.");
      setEnquiry({
        name: "",
        email: "",
        phone: "",
        message: "",
        scheduleDate: "",
        apartment: "Walnut Park Apartments",
      }); // Clear form after submission
    } catch (error) {
      setFormStatus("There was an error submitting your enquiry.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null); // Reset error state before each fetch

    try {
      const response = await axios.get(
        `http://localhost:7002/api/vendor/hotel/${hotelId}`
      );

      if (response?.data?.hotel) {
        setData(response.data.hotel);
      } else {
        throw new Error("No hotel data found");
      }
    } catch (err) {
      setError(err.message || "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  }, [hotelId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (data && data.image) {
      setSelectedImage({ id: 0, src: data.image, alt: "Hotel Image" });
    }
  }, [data]);

  // Destructure data early for better readability
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  if (!data) return null;

  const {
    name,
    type,
    details,
    price,
    pricePerNight,
    image,
    address,
    verified,
    underRenovation,
    facilities,
    checkInTime,
    checkOutTime,
    availableRooms,
    nearbyAttractions,
    cancellationPolicy,
    amenities,
    rating,
    reviews,
    specialOffers,
    contactNumber,
    website,
    videoId,
  } = data;

  const reviewsData = {
    totalUsers: 67,
    ratings: [
      { star: 5, count: 34 },
      { star: 4, count: 11 },
      { star: 3, count: 13 },
      { star: 2, count: 5 },
      { star: 1, count: 4 },
    ],
  };

  return (
    <div className=" min-h-screen bg-gradient-to-br from-[#e0e7f0] to-[#f6f6f6] pt-24">
      {/* Product Gallery */}
      <div className="w-full  mx-auto px-2">
        {/* Main Image Preview */}
        <div className="w-full h-[400px] md:h-[500px] overflow-hidden rounded-lg shadow-lg">
          <img
            src={selectedImage.src}
            alt={selectedImage.alt}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Thumbnail Gallery */}
        <div className="flex gap-2 mt-4 overflow-x-auto">
          {images.map((img) => (
            <img
              key={img.id}
              src={img.src}
              alt={img.alt}
              className={`w-24 h-20 md:w-32 md:h-24 rounded-lg cursor-pointer border-2 ${
                selectedImage.id === img.id
                  ? "border-blue-500"
                  : "border-gray-300"
              }`}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>

        {/* Property Details */}
        <div className="flex flex-col justify-between px-12 pt-8 shadow-sm">
          <h1 className="text-2xl font-bold">{name}</h1>
          <div className="flex items-center gap-2">
            <FaLocationDot /> {address} <FaEye />
            4,852 views <FaCalendarDays /> Aug 30, 2024
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-[#e0e7f0] to-[#f6f6f6] p-8 gap-8">
        {/* Left Section: Main Content */}
        <div className="flex-1 overflow-y-auto space-y-16 lg:space-y-8 mx-auto w-full">
          <div className="mx-auto p-8 bg-white shadow-lg rounded-lg ">
            {/* Overview Section */}
            <h2 className="text-3xl font-semibold text-gray-900 border-b-2 pb-3 mb-6 tracking-wide">
              Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
              <p className="flex items-center">
                <span className="font-semibold text-gray-800 mr-2">
                  Status:
                </span>
                <span
                  className={`bg-teal-500 text-white text-sm px-3 py-1 rounded-full font-medium`}
                >
                  {verified ? "Verified" : "Not Verified"}
                </span>
              </p>
              <p className="flex items-center">
                <span className="font-semibold text-gray-800 mr-2">
                  Check-In Time:
                </span>
                <span>{checkInTime}</span>
              </p>
              <p className="flex items-center">
                <span className="font-semibold text-gray-800 mr-2">
                  Category:
                </span>
                <span className="font-bold text-gray-900">{type}</span>
              </p>
              <p className="flex items-center">
                <span className="font-semibold text-gray-800 mr-2">
                  Price Per Night:
                </span>
                <span>{pricePerNight}</span>
              </p>
              <p className="flex items-center">
                <span className="font-semibold text-gray-800 mr-2">
                  Available Rooms:
                </span>
                <span className="font-bold text-gray-900">
                  {availableRooms}
                </span>
              </p>
              <p className="flex items-center">
                <span className="font-semibold text-gray-800 mr-2">
                  Check-Out Time:
                </span>
                <span>{checkOutTime}</span>
              </p>
              <p className="flex items-center">
                <span className="font-semibold text-gray-800 mr-2">
                  Investor:
                </span>
                <span className="font-bold text-gray-900">Temasek</span>
              </p>
              <p className="flex items-center">
                <span className="font-semibold text-gray-800 mr-2">Price:</span>
                <span className="text-green-600 font-bold text-lg">
                  ₹{price}
                </span>
              </p>
              <p className="flex items-center">
                <span className="font-semibold text-gray-800 mr-2">
                  Rating:
                </span>
                <span className="text-orange-500 font-bold text-lg">
                  {rating}
                </span>
              </p>
            </div>

            {/* Description Section */}
            <h2 className="text-3xl font-semibold text-gray-900 border-b-2 pb-3 mb-6 pt-8 tracking-wide">
              Description
            </h2>
            <p className="text-gray-700 leading-relaxed tracking-wide">
              {details}
              <br />
              <br />
              Qui sed laudantium inventore fugit porro. Sunt hic cupiditate
              doloremque facere vel a et. Minus nam sunt esse consequatur ullam.
              Similique iure sed blanditiis aliquam. Rerum qui quasi reiciendis
              aut dolor dolore et. Nobis numquam voluptatem et autem molestiae
              quidem officiis. At quam qui nemo facilis et corporis consequatur.
              Nescuint sunt rerum omnis qui fugit sed. Repellendus dolor
              distinctio doloremque adipisci facere ullam vero. Aliquam aliquid
              eos et rerum. Ut voluptatem quo non ipsa sit dolor nulla. Eum
              occaecati quo est voluptate aut voluptas. Quos mollitia quisquam
              beatae quo quam iure deserunt est.
            </p>
          </div>

          {/* Key Features Section */}
          <section className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all">
            <h2 className="text-3xl font-semibold text-gray-800 border-b-2 pb-3 mb-6">
              Key Features
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {facilities.map((feature, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all ease-in-out duration-300 transform hover:scale-105"
                >
                  <h3 className="text-xl font-medium text-gray-700 mb-3">
                    {feature}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Experience top-notch amenities for your comfort during your
                    stay.
                  </p>
                </div>
              ))}
            </div>

            <h1 className="text-3xl font-semibold text-gray-800 border-b-2 pb-3 my-6">
              Nearby Attractions
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {nearbyAttractions.map((element, index) => (
                <div key={index} className="flex flex-col gap-4">
                  <div className="bg-gray-50 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all ease-in-out duration-300 transform hover:scale-105">
                    <h3 className="text-xl font-medium text-gray-700">
                      {element}
                    </h3>
                  </div>
                </div>
              ))}
            </div>

            <h1 className="text-3xl font-semibold text-gray-800 border-b-2 pb-3 my-6">
              Amenities
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {amenities.map((amenity, index) => (
                <div key={index} className="flex flex-col gap-4">
                  <div className="bg-gray-50 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all ease-in-out duration-300 transform hover:scale-105">
                    <h3 className="text-xl font-medium text-gray-700">
                      {amenity}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Map Section */}
          <section className="bg-white p-7 rounded-sm  transition-all">
            <h2 className="text-4xl font-semibold text-[#2D3748] mb-6">
              Location on Map
            </h2>
            <div className="w-full h-80 bg-[#A9B9D3] rounded-sm overflow-hidden shadow-xl  mx-auto ">
              <iframe
                className="w-full h-full"
                src="https://www.google.com/maps/embed?pb=..."
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </section>

          {/* Video Section */}
          <div className="bg-white p-7 rounded-sm ">
            <h2 className="text-3xl font-semibold text-gray-900">
              Project Showcase
            </h2>
            <div className="mt-4 w-full aspect-w-16 aspect-h-9">
              <iframe
                title="Living Room Design Showcase"
                src={`https://www.youtube.com/embed/${videoId}`}
                width="100%"
                height="100%"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">
              Client Testimonials
            </h2>

            {/* Testimonials */}
            <div className="mt-6 space-y-8">
              {/* Sample Testimonial 1 */}
              <div className="flex items-start space-x-6 p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                {/* Avatar */}
                <div className="w-16 h-16 bg-teal-500 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  J
                </div>

                {/* Testimonial Text */}
                <div>
                  <p className="text-lg text-gray-700 italic">
                    "The design transformed our space completely. The minimalist
                    approach is exactly what we needed!"
                  </p>
                  <p className="text-md text-gray-600 mt-2">— John Doe</p>
                </div>
              </div>

              {/* Sample Testimonial 2 */}
              <div className="flex items-start space-x-6 p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                {/* Avatar */}
                <div className="w-16 h-16 bg-teal-500 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  A
                </div>

                {/* Testimonial Text */}
                <div>
                  <p className="text-lg text-gray-700 italic">
                    "Absolutely love the work done. The team is highly
                    professional, and the results speak for themselves."
                  </p>
                  <p className="text-md text-gray-600 mt-2">— Alice Smith</p>
                </div>
              </div>

              {/* Sample Testimonial 3 */}
              <div className="flex items-start space-x-6 p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                {/* Avatar */}
                <div className="w-16 h-16 bg-teal-500 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  M
                </div>

                {/* Testimonial Text */}
                <div>
                  <p className="text-lg text-gray-700 italic">
                    "We couldn't be happier with the results! The whole process
                    was smooth and efficient."
                  </p>
                  <p className="text-md text-gray-600 mt-2">— Mark Johnson</p>
                </div>
              </div>
            </div>
          </div>

          {/* Review section */}
          <div className="bg-white p-7 rounded-sm">
            <h2 className="text-3xl font-semibold text-gray-900">Reviews</h2>
            <ReviewItem reviews={reviewsData} />
          </div>
        </div>

        {/* Right Section: Fixed Sidebar */}
        <div className="w-full lg:w-96 top-0 h-full  space-y-12 ">
          {/* Enquiry Form Section */}
          <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-sm">
            <h2 className="text-xl font-semibold mb-4">Contact</h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Name Field */}
              <div>
                <label className="block text-gray-700 font-medium">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={enquiry.name}
                  onChange={handleInputChange}
                  placeholder="Johny Dane"
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-gray-700 font-medium">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={enquiry.phone}
                  onChange={handleInputChange}
                  placeholder="Ex 0123456789"
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-gray-700 font-medium">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={enquiry.email}
                  onChange={handleInputChange}
                  placeholder="email@example.com"
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Schedule a Tour */}
              <div>
                <label className="block text-gray-700 font-medium">
                  Schedule a Tour (optional)
                </label>
                <input
                  type="date"
                  name="scheduleDate"
                  value={enquiry.scheduleDate}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Apartment Selection */}
              <div>
                <select
                  name="apartment"
                  value={enquiry.apartment}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md bg-gray-100 cursor-pointer focus:ring-2 focus:ring-blue-500"
                >
                  <option>Walnut Park Apartments</option>
                </select>
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-gray-700 font-medium">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={enquiry.message}
                  onChange={handleInputChange}
                  placeholder="Enter your message..."
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  rows="4"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-teal-700 text-white p-3 rounded-md hover:bg-teal-800"
              >
                {isSubmitting ? "Submitting..." : "Send Message"}
              </button>

              {/* Form Status Message */}
              {formStatus && (
                <div className="mt-4 text-center text-green-500">
                  {formStatus}
                </div>
              )}
            </form>
          </div>

          {/* Special Offers Section */}
          <section className="text-gray-700 p-6 rounded-sm shadow-sm bg-white ">
            <h2 className="text-2xl font-semibold text-[#2D3748] mb-4">
              Special Offers
            </h2>
            <ul className="space-y-4">
              <li className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-all">
                <p className="text-[#2D3748] font-medium">{specialOffers}</p>
              </li>
            </ul>
            {/* Book Now Button */}
            <button className="w-full py-3 px-4 bg-teal-700 text-white font-semibold rounded-lg hover:bg-teal-800 mt-6">
              Book Now
            </button>
          </section>

          {/* cancellation policy */}
          <section className="text-gray-700 p-6 rounded-sm shadow-sm bg-white ">
            <h2 className="text-2xl font-semibold text-[#2D3748] mb-4">
              Cancellation Policy
            </h2>
            <ul className="space-y-4">
              <li className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-all">
                <p className="text-[#2D3748] font-medium">
                  {cancellationPolicy}
                </p>
              </li>
            </ul>
          </section>

          {/* contact details */}
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-[#2D3748] mb-6">
              Contact Details
            </h2>

            <div className="mb-4 flex items-center gap-2">
              <p className="text-lg text-gray-700 font-medium">📞 Phone:</p>
              <p className="text-gray-600">{contactNumber}</p>
            </div>

            <div className="mb-4  flex items-center gap-2">
              <p className="text-lg text-gray-700 font-medium">🌐 Website:</p>
              <p className="text-blue-600 hover:underline">
                <a href={website} target="_blank" rel="noopener noreferrer">
                  {website}
                </a>
              </p>
            </div>

            <div className="mb-4  flex items-center gap-2">
              <p className="text-lg text-gray-700 font-medium">💼 Portfolio:</p>
              <p className="text-blue-600 hover:underline">
                {/* <a
                  href={portfolioLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {portfolioLink}
                </a> */}
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { FaLocationDot, FaEye, FaCalendarDays } from "react-icons/fa6";
import ReviewItem from "../../components/reviewItem";
import { useLocation } from "react-router-dom";
import EnquiryForm from "../../components/enquiryForm";

const InteriorPage = () => {
  const location = useLocation();
  const { interiorId } = location.state || {};
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

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null); // Reset error state before each fetch

    try {
      const response = await axios.get(
        `http://localhost:7002/api/vendor/interior/${interiorId}`
      );

      if (response?.data?.interior) {
        setData(response.data.interior);
      } else {
        throw new Error("No interior data found");
      }
    } catch (err) {
      setError(err.message || "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  }, [interiorId]);

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
    priceRange,
    image,
    address,
    verified,
    rating,
    reviews,
    services,
    specialOffers,
    portfolioLink,
    contactNumber,
    website,
    projectTimeline,
    consultation,
    designStyle,
    pastClients,
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

  const Category = "Interior";
  const CategoryId = data._id;
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
          <div className=" mx-auto p-6 bg-white shadow-md rounded-sm">
            {/* Overview Section */}
            <h2 className="text-2xl font-semibold border-b pb-2 mb-4">
              Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800">
              <p>
                <span className="font-semibold">Status:</span>{" "}
                <span className="bg-teal-500 text-white text-sm px-2 py-1 rounded">
                  Selling
                </span>
              </p>
              <p>
                <span className="font-semibold">projectTimeline:</span>{" "}
                <span>{projectTimeline}</span>
              </p>
              <p>
                <span className="font-semibold">Category:</span>{" "}
                <span className="font-bold">{type}</span>
              </p>
              <p>
                <span className="font-semibold">designStyle:</span>{" "}
                <span>{designStyle}</span>
              </p>
              <p>
                <span className="font-semibold">Investor:</span>{" "}
                <span className="font-bold">Temasek</span>
              </p>
              <p>
                <span className="font-semibold">consultation:</span>{" "}
                <span>{consultation}</span>
              </p>
              <p>
                <span className="font-semibold">Price:</span>{" "}
                <span className="text-green-600 font-bold">{price}</span>
              </p>
              <p>
                <span className="font-semibold">Rating:</span>{" "}
                <span className="text-orange-500 font-bold">{rating}</span>
              </p>
            </div>

            {/* Description Section */}
            <h2 className="text-2xl font-semibold border-b pb-2 mb-4 pt-4">
              Description
            </h2>
            <p className="text-gray-700">
              {details}
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
          <section className="bg-white p-6 rounded-sm shadow-lg hover:shadow-2xl transition-all">
            <h2 className="text-2xl font-semibold border-b pb-2 mb-4">
              Key Features
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {services[0].split(",").map((feature, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all"
                >
                  <h3 className="text-xl font-semibold text-[#2D3748]">
                    {feature.trim()} {/* Removing any extra spaces */}
                  </h3>
                  <p className="text-[#4A5568] mt-4">
                    Experience top-notch amenities for your comfort during your
                    stay.
                  </p>
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
                src={`https://www.youtube.com/embed/${videoId}`} // Assuming the API includes videoId in the data.
                width="100%"
                height="100%"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="bg-white p-7 rounded-sm">
            <h2 className="text-3xl font-semibold text-gray-900">
              Client Testimonials
            </h2>
            <div className="mt-6 space-y-4">
              {pastClients?.map((client, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-white text-lg font-semibold">
                    {client[0]}
                  </div>
                  <div>
                    <p className="text-lg text-gray-600">
                      "The design transformed our space completely. The
                      minimalist approach is exactly what we needed!"
                    </p>
                    <p className="text-md text-gray-500">— {client}</p>
                  </div>
                </div>
              ))}
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
            <EnquiryForm category={Category} categoryId={CategoryId} />
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
                <a
                  href={portfolioLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {portfolioLink}
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default InteriorPage;

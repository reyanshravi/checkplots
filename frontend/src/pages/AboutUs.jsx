import React, { useEffect, useState } from "react";
import image from "../assets/aboutus.jpeg";
import image1 from "../assets/aboutus1.jpg";
import grid_image1 from "../assets/grid_image1.jpeg";
import grid_image2 from "../assets/grid_image2.jpg";
import grid_image3 from "../assets/grid_image3.jpg";
import person_1 from "../assets/person_1.jpg";
import person_2 from "../assets/person_2.jpg";
import person_3 from "../assets/person_3.jpg";
import { FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";

const AboutUs = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [image, image1];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Carousel Section */}
      <div className="relative w-full overflow-hidden">
        {/* Carousel container */}
        <div
          className="relative flex transition-transform duration-1000"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 bg-cover bg-center h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]"
              style={{
                backgroundImage: `url(${image})`,
              }}
            ></div>
          ))}
        </div>

        {/* About Us Heading */}
        <h1 className="absolute bottom-8 sm:bottom-16 left-4 sm:left-8 md:left-32 text-3xl sm:text-4xl md:text-6xl text-white z-10 font-semibold">
          About Us
        </h1>
        <div className="w-6 sm:w-10 h-1 bg-white absolute bottom-4 sm:bottom-12 left-4 sm:left-8 md:left-32"></div>
      </div>

      {/* Main Content Section */}
      <div className="w-full h-auto lg:h-screen flex justify-center items-center bg-gray-50 px-4 sm:px-6 md:px-12 py-10">
        <div className="w-full max-w-7xl p-6 md:p-12 flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0">
          {/* First Section: Image and Experience */}
          <div className="w-full md:w-1/2 flex flex-col md:flex-row items-center md:space-x-8 space-y-8 md:space-y-0">
            {/* Image Section */}
            <div className="w-full md:w-1/2">
              <img
                src={grid_image1}
                className="w-full h-72 sm:h-[300px] md:h-full object-cover rounded-xl shadow-lg transform transition duration-300"
                alt="Property Image 1"
              />
            </div>

            {/* Experience Section */}
            <div className="w-full md:w-1/2 flex flex-col items-center text-center space-y-6">
              <img
                src={grid_image2}
                className="w-full h-72 sm:h-[250px] md:h-[300px] object-cover rounded-lg shadow-lg"
                alt="Experience Image"
              />
              <div className="py-4 px-6 bg-gradient-to-r from-blue-100 to-blue-50 rounded-lg shadow-lg">
                <h1 className="text-3xl sm:text-4xl font-semibold text-gray-800">
                  25+
                </h1>
                <p className="text-lg text-gray-500">Years of Experience</p>
              </div>
            </div>
          </div>

          {/* Second Section: Property Info */}
          <div className="w-full md:w-1/2 flex flex-col items-start space-y-8 px-6 md:px-12">
            <h1 className="text-3xl sm:text-4xl font-semibold text-gray-800 leading-tight">
              Find Your Ideal Property with CheckPlots
            </h1>
            <p className="text-lg sm:text-xl text-gray-600">
              Rent or Buy Properties for Commercial and Private Use
            </p>
            <p className="text-base sm:text-lg text-gray-500">
              Explore a wide variety of properties listed for rental and
              purchase. Whether you're looking for a commercial space or a
              private residence, CheckPlots offers an extensive selection to
              suit your needs.
            </p>

            {/* Property Types List */}

            <div className="flex justify-between text-lg mt-6 w-full">
              <div className="flex flex-col gap-6">
                <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-4 rounded-xl text-center font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 hover:brightness-110">
                  Commercial Properties
                </button>
                <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-4 rounded-xl text-center font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 hover:brightness-110">
                  Residential Properties
                </button>
                <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-4 rounded-xl text-center font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 hover:brightness-110">
                  Office Space
                </button>
              </div>

              <div className="flex flex-col gap-6">
                <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-4 rounded-xl text-center font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 hover:brightness-110">
                  Land for Sale
                </button>
                <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-4 rounded-xl text-center font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 hover:brightness-110">
                  Industrial Properties
                </button>
                <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-4 rounded-xl text-center font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 hover:brightness-110">
                  Retail Spaces
                </button>
              </div>
            </div>

            {/* Explore Button */}
            <button className="bg-blue-600 text-white px-8 py-3 rounded-full shadow-lg transform transition duration-300 hover:bg-blue-700 hover:scale-105 mt-8">
              Explore Properties
            </button>
          </div>
        </div>
      </div>

      {/* Second Grid Section */}
      <div className="w-full h-auto lg:h-screen flex justify-center items-center py-10 px-4">
        <div className="w-full lg:w-4/5 flex flex-col lg:flex-row rounded-xl overflow-hidden">
          {/* Left Side */}
          <div className="w-full lg:w-1/2 p-8 space-y-10">
            {/* Vision Box */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <button className="px-8 py-3 bg-indigo-600 text-white rounded-full text-lg font-semibold hover:bg-indigo-700 transition duration-200 ease-in-out">
                Our Vision
              </button>
              <p className="mt-6 text-gray-800 text-lg leading-relaxed">
                Discover how we shape the future of business with innovative and
                visionary solutions that inspire growth.
              </p>
            </div>

            {/* Mission Box */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <button className="px-8 py-3 bg-indigo-600 text-white rounded-full text-lg font-semibold hover:bg-indigo-700 transition duration-200 ease-in-out">
                Our Mission
              </button>
              <p className="mt-6 text-gray-800 text-lg leading-relaxed">
                We are committed to delivering exceptional results with a focus
                on client satisfaction and sustainable growth.
              </p>
            </div>

            {/* Values Box */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <button className="px-8 py-3 bg-indigo-600 text-white rounded-full text-lg font-semibold hover:bg-indigo-700 transition duration-200 ease-in-out">
                Our Values
              </button>
              <p className="mt-6 text-gray-800 text-lg leading-relaxed">
                Our values are the foundation of everything we do. We focus on
                integrity, accountability, and innovation.
              </p>
            </div>
          </div>

          {/* Right Side with Background Image */}
          <div
            className="w-full lg:w-1/2 flex flex-col justify-between text-white px-10 py-20 text-right bg-cover bg-center"
            style={{
              backgroundImage: `url(${grid_image3})`,
            }}
          >
            <div className="space-y-8">
              <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-white drop-shadow-lg">
                Our Plan Makes You More Comfortable in Tax Management
              </h1>
              <p className="text-lg sm:text-xl text-white opacity-90">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut
                eligendi blanditiis eveniet. Discover how we simplify and
                optimize your financial strategy.
              </p>
            </div>

            <div>
              <button className="mt-8 px-10 py-4 bg-indigo-600 text-white rounded-full text-lg font-semibold hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Third Section: Team Section */}
      <section className="h-auto w-full bg-gray-50 flex flex-col justify-center items-center mt-20 p-10 md:p-20">
        <div className="w-full max-w-7xl flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
          <div className="flex flex-col items-center md:items-start space-y-4 md:w-1/2">
            <h1 className="text-4xl font-semibold text-gray-800">Our Team</h1>
            <h2 className="text-3xl font-semibold text-gray-600">
              Meet Our Professional Team
            </h2>
          </div>
          <div className="flex flex-col items-center md:items-start md:w-1/2 text-center md:text-left">
            <p className="text-lg text-gray-600 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit,
              similique.
            </p>
            <button className="px-6 py-3 bg-indigo-600 text-white rounded-full text-lg font-semibold hover:bg-indigo-700 transition duration-200 ease-in-out">
              Learn More
            </button>
          </div>
        </div>

        {/* Team Cards */}
        <div className="w-full max-w-7xl mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Team Member 1 */}
          <div className="relative bg-gray-200 rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
            <img
              src={person_1}
              alt="person 1"
              className="w-full h-full object-cover opacity-60 transition-opacity duration-300 ease-in-out hover:opacity-30"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-6 text-white space-y-4">
              <h3 className="text-xl font-semibold hover:text-teal-200 transition duration-300">
                Ramesh Chaurasia
              </h3>
              <p className="text-lg">Designer Expert</p>
              <div className="flex space-x-4 text-2xl">
                <FaFacebook className="hover:text-blue-600 cursor-pointer transition duration-300" />
                <FaLinkedin className="hover:text-blue-700 cursor-pointer transition duration-300" />
                <FaGithub className="hover:text-gray-800 cursor-pointer transition duration-300" />
              </div>
            </div>
          </div>

          {/* Team Member 2 */}
          <div className="relative bg-gray-200 rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
            <img
              src={person_2}
              alt="person 2"
              className="w-full h-full object-cover opacity-60 transition-opacity duration-300 ease-in-out hover:opacity-30"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-6 text-white space-y-4">
              <h3 className="text-xl font-semibold hover:text-teal-200 transition duration-300">
                Anjali Sharma
              </h3>
              <p className="text-lg">Web Developer</p>
              <div className="flex space-x-4 text-2xl">
                <FaFacebook className="hover:text-blue-600 cursor-pointer transition duration-300" />
                <FaLinkedin className="hover:text-blue-700 cursor-pointer transition duration-300" />
                <FaGithub className="hover:text-gray-800 cursor-pointer transition duration-300" />
              </div>
            </div>
          </div>

          {/* Team Member 3 */}
          <div className="relative bg-gray-200 rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
            <img
              src={person_3}
              alt="person 3"
              className="w-full h-full object-cover opacity-60 transition-opacity duration-300 ease-in-out hover:opacity-30"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-6 text-white space-y-4">
              <h3 className="text-xl font-semibold hover:text-teal-200 transition duration-300">
                Amit Verma
              </h3>
              <p className="text-lg">Project Manager</p>
              <div className="flex space-x-4 text-2xl">
                <FaFacebook className="hover:text-blue-600 cursor-pointer transition duration-300" />
                <FaLinkedin className="hover:text-blue-700 cursor-pointer transition duration-300" />
                <FaGithub className="hover:text-gray-800 cursor-pointer transition duration-300" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;

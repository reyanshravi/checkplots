import React, { useEffect, useState } from "react";
import {
  FaBuilding,
  FaHome,
  FaIndustry,
  FaMapSigns,
  FaStoreAlt,
  FaShoppingCart,
  FaBalanceScale,
} from "react-icons/fa";
import { IoEye, IoFlag } from "react-icons/io5"; // Importing Vision and Mission icons

import { FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";

const AboutUs = () => {
  const imageUrls = {
    // Carousel images
    carousel: {
      image1:
        "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      image2:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },

    // Grid images
    grid: {
      image1:
        "https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      image2:
        "https://images.unsplash.com/photo-1680878316616-8661d364d518?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      image3:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },

    // Person images
    team: {
      person1:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      person2:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      person3:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [imageUrls.carousel.image1, imageUrls.carousel.image2];
  const buttons = [
    "Commercial Properties",
    "Residential Properties",
    "Office Space",
    "Land for Sale",
    "Industrial Properties",
    "Retail Spaces",
  ];

  const PropertyButtonGrid = ({ buttons }) => {
    const getIcon = (label) => {
      switch (label) {
        case "Commercial Properties":
          return <FaBuilding className="text-xl" />;
        case "Residential Properties":
          return <FaHome className="text-xl" />;
        case "Office Space":
          return <FaStoreAlt className="text-xl" />;
        case "Land for Sale":
          return <FaMapSigns className="text-xl" />;
        case "Industrial Properties":
          return <FaIndustry className="text-xl" />;
        case "Retail Spaces":
          return <FaShoppingCart className="text-xl" />;
        default:
          return null;
      }
    };

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-4 w-full">
        {buttons.map((buttonLabel, index) => (
          <button
            key={index}
            className="bg-white text-gray-800 px-5 py-3 rounded-lg text-sm font-medium flex items-center gap-3 transform transition-all duration-300 ease-in-out hover:bg-gray-100 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-white border border-transparent active:scale-95"
          >
            {/* Uniform Icon Size & Scaling */}
            <div className="w-5 h-5 flex items-center justify-center transform transition-all duration-300 ease-in-out hover:scale-110">
              {getIcon(buttonLabel)}{" "}
              {/* Ensure this function returns properly sized icons */}
            </div>

            <span className="capitalize">{buttonLabel}</span>
          </button>
        ))}
      </div>
    );
  };

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
          className="relative flex transition-transform duration-1000 z-0"
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
        <div className="bg-black absolute w-full h-full z-10 top-0 opacity-40"></div>

        {/* About Us Heading */}
        <h1 className="absolute bottom-8 sm:bottom-16 left-4 sm:left-8 md:left-32 text-3xl sm:text-4xl md:text-6xl text-white z-10 font-semibold">
          About Us
        </h1>
        <div className="w-6 sm:w-10 h-1 bg-white absolute bottom-4 sm:bottom-12 left-4 sm:left-8 md:left-32 z-20"></div>
      </div>

      {/* Main Content Section */}
      <div className="w-full h-auto lg:h-screen flex justify-center items-center bg-gray-50 px-4 sm:px-6 md:px-12 py-10">
        <div className="w-full max-w-7xl p-6 md:p-12 flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0">
          {/* First Section: Image and Experience */}

          <div className="w-full md:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Image Section */}
            <div className="w-full md:w-full row-span-3 ">
              <img
                src={imageUrls.grid.image1}
                className="w-full h-72 sm:h-[300px] md:h-full object-cover rounded-xl shadow-lg "
                alt="Property Image 1"
              />
            </div>

            {/* Experience Section */}
            <div className="w-full md:w-full  text-center space-y-6 row-span-2">
              <img
                src={imageUrls.grid.image2}
                className="w-full h-full sm:h-[250px] md:h-[350px] object-cover rounded-lg shadow-lg "
                alt="Experience Image"
              />
            </div>
            <div className="py-6 px-8 bg-gradient-to-r from-gray-100 to-gray-50 rounded-lg shadow-xl w-full h-full flex justify-center items-center flex-col ">
              <h1 className="text-3xl sm:text-4xl font-semibold text-gray-800">
                25+
              </h1>
              <p className="text-lg text-gray-500">Years of Experience</p>
            </div>
          </div>

          {/* Second Section: Property Info */}
          <div className="w-full md:w-1/2 flex flex-col items-start space-y-4 px-6 md:px-12">
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
            <div className="container mx-auto px-4">
              {/* Use the PropertyButtonGrid component */}
              <PropertyButtonGrid buttons={buttons} />
            </div>

            {/* Explore Button */}
            <button className="bg-gray-600 text-white px-8 py-3 rounded-xl shadow-lg transform transition duration-300 hover:bg-gray-700  mt-8">
              Explore Properties
            </button>
          </div>
        </div>
      </div>

      {/* Second Grid Section */}
      <div className="w-full h-auto lg:h-[80vh] flex justify-center items-center py-6 px-4">
        <div className="w-full lg:w-4/5 flex flex-col lg:flex-row rounded-xl overflow-hidden ">
          {/* Left Side */}
          <div className="w-full lg:w-1/2 p-6 space-y-8">
            {/* Vision Box */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <button className="flex items-center gap-3 px-6 py-2 bg-gray-600 text-white rounded-full text-lg font-semibold hover:bg-gray-700 transition duration-200 ease-in-out">
                <IoEye /> {/* Vision Icon */}
                Our Vision
              </button>
              <p className="mt-4 text-gray-800 text-base leading-relaxed">
                Discover how we shape the future of business with innovative and
                visionary solutions that inspire growth.
              </p>
            </div>

            {/* Mission Box */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <button className="flex items-center gap-3 px-6 py-2 bg-gray-600 text-white rounded-full text-lg font-semibold hover:bg-gray-700 transition duration-200 ease-in-out">
                <IoFlag /> {/* Mission Icon */}
                Our Mission
              </button>
              <p className="mt-4 text-gray-800 text-base leading-relaxed">
                We are committed to delivering exceptional results with a focus
                on client satisfaction and sustainable growth.
              </p>
            </div>

            {/* Values Box */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <button className="flex items-center gap-3 px-6 py-2 bg-gray-600 text-white rounded-full text-lg font-semibold hover:bg-gray-700 transition duration-200 ease-in-out">
                <FaBalanceScale /> {/* Values Icon */}
                Our Values
              </button>
              <p className="mt-4 text-gray-800 text-base leading-relaxed">
                Our values are the foundation of everything we do. We focus on
                integrity, accountability, and innovation.
              </p>
            </div>
          </div>

          {/* Right Side with Background Image */}
          <div
            className="w-full lg:w-1/2 flex flex-col justify-between text-white px-8 py-12 text-right bg-cover bg-center rounded-xl"
            style={{
              backgroundImage: `url(${imageUrls.grid.image3})`,
            }}
          >
            <div className="space-y-6">
              <h1 className="text-3xl sm:text-4xl font-bold leading-tight text-white drop-shadow-lg">
                Our Plan Makes You More Comfortable in Tax Management
              </h1>
              <p className="text-base sm:text-lg text-white opacity-90">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut
                eligendi blanditiis eveniet. Discover how we simplify and
                optimize your financial strategy.
              </p>
            </div>

            <div>
              <button className="mt-6 px-8 py-3 bg-gray-600 text-white rounded-full text-lg font-semibold hover:bg-gray-700 transition duration-300 ease-in-out transform hover:scale-105">
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
            <button className="px-6 py-3 bg-gray-600 text-white rounded-full text-lg font-semibold hover:bg-gray-700 transition duration-200 ease-in-out">
              Learn More
            </button>
          </div>
        </div>

        {/* Team Cards */}
        <div className="w-full max-w-7xl mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {/* Team Member 1 */}
          <div className="relative bg-gray-200 rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:shadow-xl">
            <img
              src={imageUrls.team.person1}
              alt="person 1"
              className="w-full h-full object-cover transition-opacity duration-300 ease-in-out "
            />
            <div className="absolute inset-0 bg-white bg-opacity-20 hover:bg-opacity-0 flex flex-col justify-end p-6 text-white space-y-4">
              <h3 className="text-xl font-semibold hover:text-teal-200 transition duration-300">
                Ramesh Chaurasia
              </h3>
              <p className="text-lg">Designer Expert</p>
              <div className="flex space-x-4 text-2xl">
                <FaFacebook className="hover:text-gray-600 cursor-pointer transition duration-300" />
                <FaLinkedin className="hover:text-gray-700 cursor-pointer transition duration-300" />
                <FaGithub className="hover:text-gray-800 cursor-pointer transition duration-300" />
              </div>
            </div>
          </div>

          {/* Team Member 2 */}
          <div className="relative bg-gray-200 rounded-lg overflow-hidden shadow-lg transform transition-all duration-300  hover:shadow-xl">
            <img
              src={imageUrls.team.person2}
              alt="person 2"
              className="w-full h-full object-cover transition-opacity duration-300 ease-in-out "
            />
            <div className="absolute inset-0 bg-white bg-opacity-20 hover:bg-opacity-0 flex flex-col justify-end p-6 text-white space-y-4">
              <h3 className="text-xl font-semibold hover:text-teal-200 transition duration-300">
                Anjali Sharma
              </h3>
              <p className="text-lg">Web Developer</p>
              <div className="flex space-x-4 text-2xl">
                <FaFacebook className="hover:text-gray-600 cursor-pointer transition duration-300" />
                <FaLinkedin className="hover:text-gray-700 cursor-pointer transition duration-300" />
                <FaGithub className="hover:text-gray-800 cursor-pointer transition duration-300" />
              </div>
            </div>
          </div>

          {/* Team Member 3 */}
          <div className="relative bg-gray-200 rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:shadow-xl">
            <img
              src={imageUrls.team.person3}
              alt="person 3"
              className="w-full h-full  object-cover transition-opacity duration-300 ease-in-out "
            />
            <div className="absolute inset-0 bg-white bg-opacity-20 hover:bg-opacity-0 flex flex-col justify-end p-6 text-white space-y-4">
              <h3 className="text-xl font-semibold hover:text-teal-200 transition duration-300">
                Amit Verma
              </h3>
              <p className="text-lg">Project Manager</p>
              <div className="flex space-x-4 text-2xl">
                <FaFacebook className="hover:text-gray-600 cursor-pointer transition duration-300" />
                <FaLinkedin className="hover:text-gray-700 cursor-pointer transition duration-300" />
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

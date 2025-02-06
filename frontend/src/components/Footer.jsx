import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { Link } from "react-router-dom";


const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-16">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Logo and Description */}
          <div className="text-center sm:text-left space-y-6">
            <img
              src="./CheckPlots.png"
              alt="CheckPlots logo"
              className="h-20 mx-auto sm:mx-0"
            />
            <p className="text-lg sm:text-base text-gray-400 max-w-xs mx-auto sm:mx-0">
              Discover top-tier properties with CheckPlots. We connect you to
              the best land and real estate opportunities with ease.
            </p>

            {/* Social Media Links with React Icons */}
            <div className="flex justify-center sm:justify-start gap-5 mt-6">
              <a
                href="#"
                className="text-gray-400 hover:text-blue-500 transition duration-300"
              >
                <FaFacebookF className="h-8 w-8" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-pink-500 transition duration-300"
              >
                <FaInstagram className="h-8 w-8" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition duration-300"
              >
                <FaTwitter className="h-8 w-8" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-700 transition duration-300"
              >
                <FaLinkedinIn className="h-8 w-8" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-red-500 transition duration-300 "
              >
                <FaYoutube className="h-8 w-8" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-100">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-gray-100 transition duration-300"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-gray-100 transition duration-300"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-gray-100 transition duration-300"
                >
                  Press
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-gray-100 transition duration-300"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Services Section */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-100">
              Our Services
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-gray-100 transition duration-300"
                >
                  Property Search
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-gray-100 transition duration-300"
                >
                  Investment Advice
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-gray-100 transition duration-300"
                >
                  Land Acquisition
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-gray-100 transition duration-300"
                >
                  Property Valuation
                </a>
              </li>
            </ul>
          </div>

          {/* Vendor Engagement */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-100">
              Vendor Engagement
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/vendor/signup"
                  className="text-gray-400 hover:text-gray-100 transition duration-300"
                >
                  Sign Up as Vendor
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-gray-100 transition duration-300"
                >
                  Vendor Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-gray-100 transition duration-300"
                >
                  Vendor Dashboard
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-100">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-400">
                <HiOutlineMail className="mr-3 text-xl" />
                <span>support@checkplots.com</span>
              </li>
              <li className="text-gray-400">
                <span>+1 234 567 890</span>
              </li>
              <li className="text-gray-400">
                <span>Address: 123 Plot Street, City, Country</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 mt-12 pt-8 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} CheckPlots. All Rights Reserved.
            </p>
            <div className="mt-6 sm:mt-0 flex justify-center sm:justify-start gap-8">
              <a
                href="#"
                className="text-gray-400 hover:text-gray-100 transition duration-300"
              >
                Terms & Conditions
              </a>
              <span className="text-gray-400">|</span>
              <a
                href="#"
                className="text-gray-400 hover:text-gray-100 transition duration-300"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

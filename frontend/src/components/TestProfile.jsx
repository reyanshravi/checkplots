import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';

const Profile = () => {
  return (
    <div className="my-4 flex flex-col 2xl:flex-row space-y-6 2xl:space-y-0 2xl:space-x-6">
      
      {/* Left Column - Profile Info & Activity Log */}
      <div className="w-full flex flex-col 2xl:w-1/3">
        
        {/* Personal Information Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h4 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h4>
          
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex justify-center items-center text-blue-600 font-semibold text-2xl">
              A
            </div>
            <div className="ml-4">
              <p className="text-lg font-bold text-gray-800">Amanda S. Ross</p>
              <p className="text-gray-600 text-sm">UX/UI Designer</p>
            </div>
          </div>

          <ul className="space-y-3">
            <li className="flex items-center">
              <span className="font-semibold w-24">Birthday:</span>
              <span className="text-gray-700">24 Jul, 1991</span>
            </li>
            <li className="flex items-center">
              <span className="font-semibold w-24">Email:</span>
              <span className="text-gray-700">amandaross@example.com</span>
            </li>
            <li className="flex items-center">
              <span className="font-semibold w-24">Location:</span>
              <span className="text-gray-700">New York, US</span>
            </li>
            <li className="flex items-center">
              <span className="font-semibold w-24">Languages:</span>
              <span className="text-gray-700">English, Spanish</span>
            </li>
          </ul>

          {/* Status Indicator */}
          <div className="mt-6">
            <span className="text-xs font-semibold text-gray-500">Status:</span>
            <span className="text-sm text-green-500">Active</span>
          </div>
          
          <div className="mt-4">
            <span className="font-semibold text-gray-700">Social:</span>
            <div className="flex space-x-4 mt-2">
              <a href="#" className="text-blue-600 hover:text-blue-800">
                <FaFacebookF className="w-6 h-6" />
              </a>
              <a href="#" className="text-blue-400 hover:text-blue-600">
                <FaTwitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-blue-700 hover:text-blue-900">
                <FaLinkedinIn className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-800 hover:text-gray-900">
                <FaGithub className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Activity Log Section */}
        <div className="mt-6 bg-white shadow-lg rounded-lg p-6">
          <h4 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h4>
          <ul className="space-y-4">
            <li className="flex items-center">
              <IoIosArrowForward className="text-gray-400 w-5 h-5 mr-2" />
              <p className="text-sm">Profile information updated</p>
              <span className="text-xs text-gray-500 ml-2">5 minutes ago</span>
            </li>
            <li className="flex items-center">
              <IoIosArrowForward className="text-gray-400 w-5 h-5 mr-2" />
              <p className="text-sm">Connected with Colby Covington</p>
              <span className="text-xs text-gray-500 ml-2">30 minutes ago</span>
            </li>
            <li className="flex items-center">
              <IoIosArrowForward className="text-gray-400 w-5 h-5 mr-2" />
              <p className="text-sm">Invoice #4563 created</p>
              <span className="text-xs text-gray-500 ml-2">1 hour ago</span>
            </li>
            <li className="flex items-center">
              <IoIosArrowForward className="text-gray-400 w-5 h-5 mr-2" />
              <p className="text-sm">New message from Cecilia Hendric</p>
              <span className="text-xs text-gray-500 ml-2">2 hours ago</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Right Column - About & Statistics */}
      <div className="w-full flex flex-col 2xl:w-2/3">
        
        {/* About Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h4 className="text-xl font-semibold text-gray-900 mb-4">About</h4>
          <p className="text-gray-700">
            Passionate about crafting user-centric designs. With a strong background in both UI/UX, I have honed my ability to translate complex business requirements into intuitive and seamless user interfaces. Currently working with a team of amazing designers and developers to create cutting-edge digital experiences.
          </p>
        </div>

        {/* Statistics Section */}
        <div className="mt-6 bg-white shadow-lg rounded-lg p-6">
          <h4 className="text-xl font-semibold text-gray-900 mb-4">Statistics</h4>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition duration-200">
              <p className="text-sm font-semibold text-gray-600">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-800">$8,141</p>
              <p className="text-xs text-green-500">+3% from last month</p>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition duration-200">
              <p className="text-sm font-semibold text-gray-600">New Orders</p>
              <p className="text-3xl font-bold text-gray-800">217</p>
              <p className="text-xs text-green-500">+5% from last month</p>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition duration-200">
              <p className="text-sm font-semibold text-gray-600">New Connections</p>
              <p className="text-3xl font-bold text-gray-800">120</p>
              <p className="text-xs text-green-500">+4% from last month</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

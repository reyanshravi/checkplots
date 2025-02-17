// import React from "react";
// import {
//   FaFacebookF,
//   FaInstagram,
//   FaTwitter,
//   FaLinkedinIn,
//   FaYoutube,
// } from "react-icons/fa";
// import { HiOutlineMail } from "react-icons/hi";
// import { IoMdCall } from "react-icons/io";
// import { LiaAddressCard } from "react-icons/lia";

// import { Link } from "react-router-dom";

// const Footer = () => {
//   return (
//     <>
//       <section className="relative bg-[url(https://images.unsplash.com/photo-1581279813180-4dddc1008167?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center bg-no-repeat h-56 mx-20 rounded-2xl my-16">
//         <div className="absolute inset-0 bg-gray-900/75 sm:bg-transparent sm:from-gray-900/95 sm:to-gray-900/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>

//         <div className="relative flex items-center justify-start h-full mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
//           <div className=" max-w-xl">
//             <h1 className="text-3xl  text-white sm:text-4xl">
//               Vendor & Brokers
//               <span className="block text-lg">
//                 Establish a larger presence on an international playing field,
//                 earning more leads.
//               </span>
//             </h1>

//             <div className="mt-8">
//               <a
//                 href="#"
//                 className="w-full sm:w-auto rounded-sm bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow-sm hover:bg-rose-700 focus:ring-3 focus:outline-none"
//               >
//                 Create Account
//               </a>
//             </div>
//           </div>
//         </div>
//       </section>

//       <footer className=" text-white pb-8 px-20">
//         <div className="max-w-screen-2xl mx-auto px-6 sm:px-12">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 ">
//             {/* Logo and Description */}
//             <div className="text-center sm:text-left lg:col-span-2 ">
//               <img
//                 src="./CheckPlots.png"
//                 alt="CheckPlots logo"
//                 className="h-20 mx-auto sm:mx-0 "
//               />
//               <p className="text-lg sm:text-base text-gray-500 max-w-xs mx-auto sm:mx-0 mt-0">
//                 Discover top-tier properties with CheckPlots. We connect you to
//                 the best land and real estate opportunities with ease.
//               </p>

//               {/* Social Media Links with React Icons */}
//               <div className="flex justify-center sm:justify-start gap-5 mt-6">
//                 <a
//                   href="#"
//                   className="text-gray-500 hover:text-blue-500 transition duration-300"
//                 >
//                   <FaFacebookF className="h-8 w-8" />
//                 </a>
//                 <a
//                   href="#"
//                   className="text-gray-500 hover:text-pink-500 transition duration-300"
//                 >
//                   <FaInstagram className="h-8 w-8" />
//                 </a>
//                 <a
//                   href="#"
//                   className="text-gray-500 hover:text-blue-500 transition duration-300"
//                 >
//                   <FaTwitter className="h-8 w-8" />
//                 </a>
//                 <a
//                   href="#"
//                   className="text-gray-500 hover:text-blue-700 transition duration-300"
//                 >
//                   <FaLinkedinIn className="h-8 w-8" />
//                 </a>
//                 <a
//                   href="#"
//                   className="text-gray-500 hover:text-red-500 transition duration-300 "
//                 >
//                   <FaYoutube className="h-8 w-8" />
//                 </a>
//               </div>
//             </div>

//             {/* Quick Links */}
//             <div className="space-y-6">
//               <h3 className="text-xl font-semibold text-gray-800">
//                 Quick Links
//               </h3>
//               <ul className="space-y-3">
//                 <li>
//                   <a
//                     href="#"
//                     className="text-gray-500 hover:text-gray-800 transition duration-300"
//                   >
//                     About Us
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="text-gray-500 hover:text-gray-800 transition duration-300"
//                   >
//                     Careers
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="text-gray-500 hover:text-gray-800 transition duration-300"
//                   >
//                     Press
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="text-gray-500 hover:text-gray-800 transition duration-300"
//                   >
//                     Contact Us
//                   </a>
//                 </li>
//               </ul>
//             </div>

//             {/* Services Section */}
//             <div className="space-y-6">
//               <h3 className="text-xl font-semibold text-gray-800">
//                 Our Services
//               </h3>
//               <ul className="space-y-3">
//                 <li>
//                   <a
//                     href="#"
//                     className="text-gray-500 hover:text-gray-800 transition duration-300"
//                   >
//                     Property Search
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="text-gray-500 hover:text-gray-800 transition duration-300"
//                   >
//                     Investment Advice
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="text-gray-500 hover:text-gray-800 transition duration-300"
//                   >
//                     Land Acquisition
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="text-gray-500 hover:text-gray-800 transition duration-300"
//                   >
//                     Property Valuation
//                   </a>
//                 </li>
//               </ul>
//             </div>

//             {/* Vendor Engagement */}
//             {/* <div className="space-y-6">
//               <h3 className="text-xl font-semibold text-gray-800">
//                 Vendor Engagement
//               </h3>
//               <ul className="space-y-3">
//                 <li>
//                   <Link
//                     to="/vendor/signup"
//                     className="text-gray-500 hover:text-gray-800 transition duration-300"
//                   >
//                     Sign Up as Vendor
//                   </Link>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="text-gray-500 hover:text-gray-800 transition duration-300"
//                   >
//                     Vendor Terms & Conditions
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="text-gray-500 hover:text-gray-800 transition duration-300"
//                   >
//                     Vendor Dashboard
//                   </a>
//                 </li>
//               </ul>
//             </div> */}

//             {/* Contact Section */}
//             <div className="space-y-6">
//               <h3 className="text-xl font-semibold text-gray-800">
//                 Contact Us
//               </h3>
//               <ul className="space-y-3">
//                 <li className="flex items-center text-gray-500">
//                   <HiOutlineMail className="mr-3 text-xl" />
//                   <span>support@checkplots.com</span>
//                 </li>
//                 <li className="text-gray-500 flex items-center">
//                   <IoMdCall className="mr-3 text-xl" />
//                   <span>+1 234 567 890</span>
//                 </li>
//                 <li className="text-gray-500 flex items-center">
//                   <LiaAddressCard className="mr-3 text-xl" />
//                   <span> 123 Plot Street, City, Country</span>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           {/* Footer Bottom */}
//           <div className="border-t border-gray-700 mt-12 pt-8 text-center sm:text-left">
//             <div className="flex flex-col sm:flex-row items-center justify-between">
//               <p className="text-sm text-gray-500">
//                 &copy; {new Date().getFullYear()} CheckPlots. All Rights
//                 Reserved.
//               </p>
//               <div className="mt-6 sm:mt-0 flex justify-center sm:justify-start gap-8">
//                 <a
//                   href="#"
//                   className="text-gray-500 hover:text-gray-800 transition duration-300"
//                 >
//                   Terms & Conditions
//                 </a>
//                 <span className="text-gray-500">|</span>
//                 <a
//                   href="#"
//                   className="text-gray-500 hover:text-gray-800 transition duration-300"
//                 >
//                   Privacy Policy
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </>
//   );
// };

// export default Footer;

import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { IoMdCall } from "react-icons/io";
import { LiaAddressCard } from "react-icons/lia";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-[url(https://images.unsplash.com/photo-1581279813180-4dddc1008167?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center bg-no-repeat h-56 mx-6 sm:mx-20 rounded-2xl my-16">
        <div className="absolute inset-0 bg-gray-900/75 sm:bg-transparent sm:from-gray-900/95 sm:to-gray-900/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>
        <div className="relative flex items-center justify-start h-full mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <h1 className="text-3xl text-white sm:text-4xl">
              Vendor & Brokers
              <span className="block text-lg">
                Establish a larger presence on an international playing field,
                earning more leads.
              </span>
            </h1>

            <div className="mt-8">
              <a
                href="#"
                className="w-full sm:w-auto rounded-sm bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow-sm hover:bg-rose-700 focus:ring-3 focus:outline-none"
              >
                Create Account
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="text-white pb-8 px-6 sm:px-12 lg:px-20">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12">
            {/* Logo and Description */}
            <div className="text-center sm:text-left lg:col-span-2">
              <img
                src="./CheckPlots.png"
                alt="CheckPlots logo"
                className="h-20 mx-auto sm:mx-0"
              />
              <p className="text-lg sm:text-base text-gray-500 max-w-xs mx-auto sm:mx-0 mt-0">
                Discover top-tier properties with CheckPlots. We connect you to
                the best land and real estate opportunities with ease.
              </p>

              {/* Social Media Links with React Icons */}
              <div className="flex justify-center sm:justify-start gap-5 mt-6">
                <a
                  href="#"
                  className="text-gray-500 hover:text-blue-500 transition duration-300"
                >
                  <FaFacebookF className="h-8 w-8" />
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-pink-500 transition duration-300"
                >
                  <FaInstagram className="h-8 w-8" />
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-blue-500 transition duration-300"
                >
                  <FaTwitter className="h-8 w-8" />
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-blue-700 transition duration-300"
                >
                  <FaLinkedinIn className="h-8 w-8" />
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-red-500 transition duration-300"
                >
                  <FaYoutube className="h-8 w-8" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-800">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-gray-800 transition duration-300"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-gray-800 transition duration-300"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-gray-800 transition duration-300"
                  >
                    Press
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-gray-800 transition duration-300"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Services Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-800">Our Services</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-gray-800 transition duration-300"
                  >
                    Property Search
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-gray-800 transition duration-300"
                  >
                    Investment Advice
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-gray-800 transition duration-300"
                  >
                    Land Acquisition
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-gray-800 transition duration-300"
                  >
                    Property Valuation
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-800">Contact Us</h3>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-500">
                  <HiOutlineMail className="mr-3 text-xl" />
                  <span>support@checkplots.com</span>
                </li>
                <li className="text-gray-500 flex items-center">
                  <IoMdCall className="mr-3 text-xl" />
                  <span>+1 234 567 890</span>
                </li>
                <li className="text-gray-500 flex items-center">
                  <LiaAddressCard className="mr-3 text-xl" />
                  <span>123 Plot Street, City, Country</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-gray-700 mt-12 pt-8 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <p className="text-sm text-gray-500">
                &copy; {new Date().getFullYear()} CheckPlots. All Rights
                Reserved.
              </p>
              <div className="mt-6 sm:mt-0 flex justify-center sm:justify-start gap-8">
                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-800 transition duration-300"
                >
                  Terms & Conditions
                </a>
                <span className="text-gray-500">|</span>
                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-800 transition duration-300"
                >
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

import React from "react";
import image from "../assets/hero_image.jpeg";

export default function ContactUs() {
  return (
    <>
      {/* Hero Section */}
      <div
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "500px",
        }}
        className="relative flex justify-start items-center py-20 px-6 md:px-10 bg-black bg-opacity-50"
      >
        <div className="absolute inset-0 bg-black opacity-25 z-0"></div>
        <div className="w-full md:w-1/2 text-white font-semibold z-10">
          <h1 className="text-4xl md:text-6xl leading-tight mb-4">
            We’re Here To Help!
          </h1>
          <h2 className="text-4xl md:text-6xl leading-tight mb-6">
            Reach Out To Us Anytime
          </h2>
          <p className="mt-6 text-lg md:text-2xl">
            Get in touch with us for your specific queries. We're always happy
            to help!
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="mx-8 md:mx-20 my-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-4 md:px-10">
          {/* Left Section (Contact Info) */}
          <div className="text-lg">
            <h1 className="text-4xl font-semibold mb-6">Our Global Presence</h1>
            <div className="mb-6">
              <h2 className="font-semibold">Global HQ and Registered Office</h2>
              <p>Patna, Bihar, 801503</p>
              <p>India</p>
            </div>
            <div className="mb-6">
              <h2 className="font-semibold">Email</h2>
              <p>Example@gmail.com</p>
            </div>
            <div className="mb-6">
              <h2 className="font-semibold">Phone</h2>
              <p>+91-1234567890</p>
            </div>
          </div>

          {/* Right Section (Contact Form) */}
          <div className="shadow-xl p-6 bg-white rounded-md">
            <h1 className="text-4xl font-semibold mb-6">Let’s Get Started</h1>
            <h3 className="text-lg md:text-xl mb-8">
              Use the form below to get in touch with us. We’ll get back to you
              as soon as possible.
            </h3>
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <input
                  type="text"
                  placeholder="Full Name*"
                  className="p-3 border w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                  required
                />
                <input
                  type="email"
                  placeholder="Work Email*"
                  className="p-3 border w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="p-3 border w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                />
                <input
                  type="text"
                  placeholder="Organisation*"
                  className="p-3 border w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                  required
                />
              </div>
              <div className="mb-6">
                <textarea
                  placeholder="Message*"
                  rows="4"
                  className="p-3 border w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                  required
                ></textarea>
              </div>
              <div className="flex items-center mb-6">
                <input
                  type="checkbox"
                  id="robotCheck"
                  className="mr-2"
                  required
                />
                <label htmlFor="robotCheck" className="text-sm">
                  I am not a robot
                </label>
              </div>

              <button
                type="submit"
                className="bg-blue-600 text-white text-xl px-6 py-3 font-semibold w-full md:w-auto mt-4 hover:bg-blue-700 transition rounded-md"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

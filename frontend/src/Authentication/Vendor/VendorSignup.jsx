import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HomeButton from "../../components/HomeButton";
const VendorSignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    businessName: "",
    email: "",
    phone: "",
    password: "",
    businessType: "Wholesale",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "India",
    },
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address")) {
      setFormData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [name.split(".")[1]]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Form validation
  const validate = () => {
    let formErrors = {};
    if (!formData.fullName) formErrors.fullName = "Full name is required";
    if (!formData.businessName)
      formErrors.businessName = "Business name is required";
    if (!formData.email) formErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      formErrors.email = "Email is invalid";
    if (!formData.phone) formErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phone))
      formErrors.phone = "Phone number is invalid";
    if (!formData.password) formErrors.password = "Password is required";
    if (!formData.address.street)
      formErrors.street = "Street address is required";
    if (!formData.address.city) formErrors.city = "City is required";
    if (!formData.address.state) formErrors.state = "State is required";
    if (!formData.address.zipCode) formErrors.zipCode = "Zip code is required";
    if (!formData.address.country) formErrors.country = "Country is required";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "http://localhost:7002/api/vendor/signup",
        formData
      );
      alert("Vendor signed up successfully");
      setIsSubmitting(false);
      // Optionally, navigate after success
      navigate("/vendor/signin", 3000);
    } catch (error) {
      setIsSubmitting(false);
      alert("Error signing up. Please try again.");
      console.error(error);
    }
  };

  return (
    <section className="bg-white h-screen container">
      <HomeButton />
      <div className="flex flex-col lg:flex-row gap-8">
        <section className="relative flex h-64 items-end bg-gray-900 lg:h-screen">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />
          <div className="lg:relative z-10 lg:p-12 p-2">
            <h2 className="mt-6 text-xl font-bold text-white sm:text-3xl md:text-4xl">
              Welcome to CheckPlots 🦑
            </h2>
            <p className="mt-2 leading-relaxed text-white/90 text-xs md:text-lg">
              CheckPlots is a platform that allows you to check the plots of
              your property and get the best price for your property.
            </p>
          </div>
        </section>

        <main className="flex items-center justify-center px-8 sm:px-12 ">
          <div className="max-w-xl lg:max-w-3xl w-full">
            <form
              action="#"
              className="mt-8 grid grid-cols-6 gap-4"
              onSubmit={handleSubmit}
            >
              {/* Full Name */}
              <div className="form-group col-span-6">
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-md text-gray-700 shadow-xs border-2 px-4 py-2"
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                )}
              </div>

              {/* Email */}
              <div className="form-group col-span-6">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-md text-gray-700 shadow-xs border-2 px-4 py-2"
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div className="form-group col-span-6">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone
                </label>
                <input
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-md text-gray-700 shadow-xs border-2 px-4 py-2"
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Business Type & Name */}
              <div className="col-span-6 flex flex-col lg:flex-row gap-6">
                <div className="form-group w-full">
                  <label
                    htmlFor="businessName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Business Name
                  </label>
                  <input
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-md text-gray-700 shadow-xs border-2 px-4 py-2"
                    type="text"
                    id="businessName"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    required
                  />
                  {errors.businessName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.businessName}
                    </p>
                  )}
                </div>
                <div className="form-group w-full">
                  <label
                    htmlFor="businessType"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Business Type
                  </label>
                  <select
                    id="businessType"
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-md text-gray-700 shadow-xs border-2 px-4 py-2"
                  >
                    <option value="Wholesale">Wholesale</option>
                    <option value="Retail">Retail</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Services">Services</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Password */}
              <div className="form-group col-span-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-md text-gray-700 shadow-xs border-2 px-4 py-2"
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              {/* Address Fields */}
              <div className="col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="form-group w-full">
                  <label
                    htmlFor="address.street"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Street Address
                  </label>
                  <input
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-md text-gray-700 shadow-xs border-2 px-4 py-2"
                    type="text"
                    id="address.street"
                    name="address.street"
                    value={formData.address.street}
                    onChange={handleChange}
                    required
                  />
                  {errors.street && (
                    <p className="text-red-500 text-sm mt-1">{errors.street}</p>
                  )}
                </div>

                <div className="form-group w-full">
                  <label
                    htmlFor="address.city"
                    className="block text-sm font-medium text-gray-700"
                  >
                    City
                  </label>
                  <input
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-md text-gray-700 shadow-xs border-2 px-4 py-2"
                    type="text"
                    id="address.city"
                    name="address.city"
                    value={formData.address.city}
                    onChange={handleChange}
                    required
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                  )}
                </div>
              </div>

              <div className="col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="form-group w-full">
                  <label
                    htmlFor="address.state"
                    className="block text-sm font-medium text-gray-700"
                  >
                    State
                  </label>
                  <input
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-md text-gray-700 shadow-xs border-2 px-4 py-2"
                    type="text"
                    id="address.state"
                    name="address.state"
                    value={formData.address.state}
                    onChange={handleChange}
                    required
                  />
                  {errors.state && (
                    <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                  )}
                </div>

                <div className="form-group w-full">
                  <label
                    htmlFor="address.zipCode"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Zip Code
                  </label>
                  <input
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-md text-gray-700 shadow-xs border-2 px-4 py-2"
                    type="text"
                    id="address.zipCode"
                    name="address.zipCode"
                    value={formData.address.zipCode}
                    onChange={handleChange}
                    required
                  />
                  {errors.zipCode && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.zipCode}
                    </p>
                  )}
                </div>
              </div>

              <div className="form-group col-span-6">
                <label
                  htmlFor="address.country"
                  className="block text-sm font-medium text-gray-700"
                >
                  Country
                </label>
                <input
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-md text-gray-700 shadow-xs border-2 px-4 py-2"
                  type="text"
                  id="address.country"
                  name="address.country"
                  value={formData.address.country}
                  onChange={handleChange}
                  required
                />
                {errors.country && (
                  <p className="text-red-500 text-sm mt-1">{errors.country}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="col-span-6">
                <button
                  type="submit"
                  className={`w-full rounded-md bg-blue-600 py-2 text-white font-semibold ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Sign Up"}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
};

export default VendorSignUp;

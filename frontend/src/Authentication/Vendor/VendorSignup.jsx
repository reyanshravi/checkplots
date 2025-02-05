import React, { useState } from "react";
import axios from "axios";
import signup_bg from "../../assets/Signup/bg-signup.jpg";

const VendorSignUp = () => {
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
      console.log(response.data);
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      alert("Error signing up. Please try again.");
      console.error(error);
    }
  };

  return (
    <div
      className="h-screen bg-cover bg-center flex items-center justify-start "
      style={{
        backgroundImage: `url(${signup_bg})`,
      }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

      <div className="relative backdrop-blur-sm border sm:p-8 rounded-lg shadow-xl w-full sm:max-w-lg h-[85vh] overflow-auto ml-20 mt-36 mb-20 ">
        <div className="text-center text-white">
          <h2 className="text-3xl font-semibold mb-6">Vendor Signup</h2>
          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="form-group mb-4">
              <label
                htmlFor="fullName"
                className="block text-lg font-medium text-left"
              >
                Full Name
              </label>
              <input
                className="w-full px-6 py-4 bg-gray-800 text-white border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300 ease-in-out"
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
            <div className="form-group mb-4">
              <label htmlFor="email" className="block text-xl mb-1 text-left">
                Email
              </label>
              <input
                className="w-full px-6 py-4 bg-gray-800 text-white border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300 ease-in-out"
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
            <div className="form-group mb-4">
              <label htmlFor="phone" className="block text-xl text-left">
                Phone
              </label>
              <input
                className="w-full px-6 py-4 bg-gray-800 text-white border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300 ease-in-out"
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
            <div className="flex space-x-4 mb-4">
              <div className="form-group w-full">
                <label
                  htmlFor="businessType"
                  className="block text-xl mb-1 text-left"
                >
                  Business Type
                </label>
                <select
                  id="businessType"
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 bg-gray-800 text-white border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300 ease-in-out"
                >
                  <option value="Wholesale">Wholesale</option>
                  <option value="Retail">Retail</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Services">Services</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group w-full">
                <label
                  htmlFor="businessName"
                  className="block text-xl mb-1 text-left"
                >
                  Business Name
                </label>
                <input
                  className="w-full px-6 py-4 bg-gray-800 text-white border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300 ease-in-out"
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
            </div>

            {/* Password */}
            <div className="form-group mb-4">
              <label htmlFor="password" className="block text-xl mb-1 text-left">
                Password
              </label>
              <input
                className="w-full px-6 py-4 bg-gray-800 text-white border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300 ease-in-out"
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

            <h3 className="text-xl font-semibold text-white mt-6 mb-2 text-left">
              Address
            </h3>

            {/* Address Fields */}
            <div className="">
              <div className="form-group">
                <label
                  htmlFor="address.street"
                  className="block text-xl text-left"
                >
                  Street
                </label>
                <input
                  className="w-full px-6 py-4 bg-gray-800 text-white border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300 ease-in-out"
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

              <div className="flex space-x-4">
                <div className="form-group">
                  <label
                    htmlFor="address.city"
                    className="block text-xl mb-1 text-left"
                  >
                    City
                  </label>
                  <input
                    className="w-full px-6 py-4 bg-gray-800 text-white border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300 ease-in-out"
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

                <div className="form-group">
                  <label
                    htmlFor="address.state"
                    className="block text-xl mb-1 text-left"
                  >
                    State
                  </label>
                  <input
                    className="w-full px-6 py-4 bg-gray-800 text-white border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300 ease-in-out"
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
              </div>

              <div className="flex space-x-4">
                <div className="form-group">
                  <label
                    htmlFor="address.zipCode"
                    className="block text-xl mb-1 text-left"
                  >
                    Zip Code
                  </label>
                  <input
                    className="w-full px-6 py-4 bg-gray-800 text-white border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300 ease-in-out"
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

                <div className="form-group">
                  <label
                    htmlFor="address.country"
                    className="block text-xl mb-1 text-left"
                  >
                    Country
                  </label>
                  <input
                    className="w-full px-6 py-4 bg-gray-800 text-white border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300 ease-in-out"
                    type="text"
                    id="address.country"
                    name="address.country"
                    value={formData.address.country}
                    onChange={handleChange}
                    required
                  />
                  {errors.country && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.country}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-xl mt-6 hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 transition-all"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex justify-center">
                  <div className="spinner-border text-white" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VendorSignUp;

import React, { useState } from "react";
import axios from "axios";
import signup_bg from "../../assets/Signup/bg-signup.jpg";
import InputField from "../../components/InputField";

const VendorSignup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    businessName: "",
    businessType: "",
    password: "",
    confirmPassword: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("address")) {
      const [_, field] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [field]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      fullName,
      phone,
      email,
      password,
      confirmPassword,
      businessName,
      businessType,
      address,
    } = formData;

    // Validation
    if (!fullName || !phone || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (!businessName || !businessType) {
      setError("Business Name and Business Type are required for vendors.");
      return;
    }
    if (!businessType) {
      setError("Please select a Business Type.");
      return;
    }

    setError("");
    setLoading(true);

    const apiData = {
      fullName,
      businessName,
      email,
      phone,
      password,
      businessType,
      address: {
        street: address.street,
        city: address.city,
        state: address.state,
        zipCode: address.zipCode,
        country: address.country,
      },
    };
    console.log("Submitting with businessType:", formData.businessType);


    const apiUrl = "http://localhost:7002/api/vendor/signup";

    try {
      const response = await axios.post(apiUrl, apiData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    
      if (response.status !== 200) {
        throw new Error("Something went wrong.");
      } else {
        alert("Signup successful! Please check your email for verification.");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        console.error("API Error Response:", error.response.data);
        setError(error.response.data.message || "Something went wrong");
      } else if (error.request) {
        console.error("API Error Request:", error.request);
        setError("No response received from the server. Please try again.");
      } else {
        console.error("API Error Message:", error.message);
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="h-screen bg-cover bg-center flex items-center justify-start"
      style={{
        backgroundImage: `url(${signup_bg})`,
      }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

      <div className="bg-gray-transparent backdrop-blur-sm border sm:p-8 rounded-lg shadow-xl w-full sm:max-w-lg overflow-hidden max-h-[90vh] ml-20 mt-20">
        <div className="text-center text-white">
          <h1 className="text-3xl font-bold  mb-4">Vendor Sign up</h1>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-4 max-h-[70vh] overflow-y-auto"
          >
            <InputField
              label="Full Name"
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              name="fullName"
            />

            <InputField
              label="Phone"
              type="text"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              name="phone"
            />

            <InputField
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              name="email"
            />

            <div className="flex space-x-4">
              <InputField
                label="Business Name"
                type="text"
                placeholder="Enter your business name"
                value={formData.businessName}
                onChange={handleChange}
                name="businessName"
              />

              <div className="relative">
                <label className="text-white font-medium text-left block mb-2">
                  Business Type
                </label>
                <select
                  name="businessType"
                  className="w-full p-3 font-medium bg-gray-200 text-gray-800 border border-gray-600 placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:bg-gray-900"
                  value={formData.businessType}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select Business Type
                  </option>
                  <option value="Retail">Retail</option>
                  <option value="Wholesale">Wholesale</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Service">Service</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-4">
              <InputField
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                name="password"
              />
              <InputField
                label="Confirm Password"
                type="password"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                name="confirmPassword"
              />
            </div>

            <div>
              <InputField
                label="Street Address"
                type="text"
                placeholder="Enter your street address"
                value={formData.address.street}
                onChange={handleChange}
                name="address.street"
              />
              <div className="flex space-x-4">
                <InputField
                  label="City"
                  type="text"
                  placeholder="Enter your city"
                  value={formData.address.city}
                  onChange={handleChange}
                  name="address.city"
                />
                <InputField
                  label="State"
                  type="text"
                  placeholder="Enter your state"
                  value={formData.address.state}
                  onChange={handleChange}
                  name="address.state"
                />
              </div>
              <div className="flex space-x-4">
                <InputField
                  label="Zip Code"
                  type="text"
                  placeholder="Enter your zip code"
                  value={formData.address.zipCode}
                  onChange={handleChange}
                  name="address.zipCode"
                />
                <InputField
                  label="Country"
                  type="text"
                  placeholder="Enter your country"
                  value={formData.address.country}
                  onChange={handleChange}
                  name="address.country"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 w-full py-4 rounded-lg bg-gray-600 text-white font-semibold tracking-wide hover:bg-gray-700 transition-all duration-300 ease-in-out"
              disabled={loading}
            >
              {loading ? (
                <span className="flex justify-center items-center">
                  Signing Up...
                  <div className="ml-2 animate-spin">🔄</div>
                </span>
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

export default VendorSignup;

import { useState } from "react";

const InputField = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  required,
}) => (
  <input
    className="w-full px-6 py-4 rounded-lg font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white"
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    required={required}
  />
);

const SignupForm = () => {
  const [isVendor, setIsVendor] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    dob: "",
    country: "",
    state: "",
    city: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    businessType: "",
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
      const [key] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [key]: { ...prev[key], [name.split(".")[1]]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const {
      fullName,
      phone,
      email,
      password,
      confirmPassword,
      dob,
      country,
      state,
      city,
      businessName,
      businessType,
      address,
    } = formData;

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

    setError(""); // Clear previous errors
    setLoading(true);

    const apiData = isVendor
      ? {
          fullName,
          businessName,
          email,
          phone,
          password,
          businessType,
          address,
        }
      : {
          fullName,
          phone,
          email,
          dob,
          country,
          state,
          city,
          password,
        };

    const apiUrl = isVendor
      ? "http://localhost:7002/api/vendor/signup"
      : "http://localhost:7002/api/auth/signup";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(apiData),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(
          result.message || "Something went wrong. Please try again."
        );
      }

      alert("Signup successful! Please check your email for verification.");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-20 text-gray-900 flex justify-center items-center">
      <div className="max-w-screen-xl bg-white shadow-xl sm:rounded-lg flex justify-center flex-1 p-6 sm:p-12">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-3xl font-extrabold text-indigo-600 mb-6">
              Sign up for CheckPlots
            </h1>

            {/* Toggle Button */}
            <div className="flex space-x-4 mt-4 mb-8">
              <button
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ease-in-out ${
                  !isVendor
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
                onClick={() => setIsVendor(false)}
              >
                User Sign Up
              </button>
              <button
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ease-in-out ${
                  isVendor
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
                onClick={() => setIsVendor(true)}
              >
                Vendor Sign Up
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm">
                {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="mx-auto max-w-xs space-y-4"
            >
              <InputField
                type="text"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                name="fullName"
              />

              {isVendor ? (
                <>
                  <InputField
                    type="text"
                    placeholder="Business Name"
                    value={formData.businessName}
                    onChange={handleChange}
                    name="businessName"
                  />
                  <InputField
                    type="text"
                    placeholder="Business Type"
                    value={formData.businessType}
                    onChange={handleChange}
                    name="businessType"
                  />
                  <div className="space-y-4">
                    <InputField
                      type="text"
                      placeholder="Street Address"
                      value={formData.address.street}
                      onChange={handleChange}
                      name="address.street"
                    />
                    <div className="flex space-x-4">
                      <InputField
                        type="text"
                        placeholder="City"
                        value={formData.address.city}
                        onChange={handleChange}
                        name="address.city"
                      />
                      <InputField
                        type="text"
                        placeholder="State"
                        value={formData.address.state}
                        onChange={handleChange}
                        name="address.state"
                      />
                    </div>
                    <div className="flex space-x-4">
                      <InputField
                        type="text"
                        placeholder="Zip Code"
                        value={formData.address.zipCode}
                        onChange={handleChange}
                        name="address.zipCode"
                      />
                      <InputField
                        type="text"
                        placeholder="Country"
                        value={formData.address.country}
                        onChange={handleChange}
                        name="address.country"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex space-x-4">
                    <InputField
                      type="date"
                      placeholder="Date of Birth"
                      value={formData.dob}
                      onChange={handleChange}
                      name="dob"
                    />
                    <InputField
                      type="text"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={handleChange}
                      name="phone"
                    />
                  </div>
                  <div className="flex space-x-4">
                    <InputField
                      type="text"
                      placeholder="Country"
                      value={formData.country}
                      onChange={handleChange}
                      name="country"
                    />
                    <InputField
                      type="text"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleChange}
                      name="state"
                    />
                  </div>
                  <InputField
                    type="text"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    name="city"
                  />
                </>
              )}
              <InputField
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                name="email"
              />
              <InputField
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                name="password"
              />
              <InputField
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                name="confirmPassword"
              />
              <button
                type="submit"
                className="mt-6 tracking-wide font-semibold bg-indigo-600 text-white w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:outline-none"
              >
                {loading ? (
                  <span className="ml-3">Signing Up...</span>
                ) : (
                  <span className="ml-3">Sign Up</span>
                )}
              </button>
              <p className="mt-6 text-xs text-gray-600 text-center">
                By signing up, you agree to our{" "}
                <a href="#" className="border-b border-gray-500 border-dotted">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="border-b border-gray-500 border-dotted">
                  Privacy Policy
                </a>
                .
              </p>
            </form>
          </div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;

import { useState } from "react";
import InputField from "../../components/InputField"; // Assuming you have this in your components
import signin_bg from "../../assets/Signup/bg-signin.jpg"

const UserSignup = () => {
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
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const { fullName, phone, email, password, confirmPassword, dob, country, state, city } = formData;

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

    const apiData = {
      fullName,
      phone,
      email,
      dob,
      country,
      state,
      city,
      password,
    };

    const apiUrl = "http://localhost:7002/api/auth/signup";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(apiData),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Something went wrong. Please try again.");
      }

      alert("Signup successful! Please check your email for verification.");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-cover bg-center flex items-center justify-start" style={{ backgroundImage: `url(${signin_bg})` }}>
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

      <div className="bg-gray-transparent backdrop-blur-sm border sm:p-8 rounded-lg shadow-xl w-full sm:max-w-lg overflow-hidden max-h-[90vh] ml-20 mt-20">
        <div className="text-center text-white">
          <h1 className="text-3xl font-bold  mb-4">User Sign up </h1>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto">
            <InputField
              label="Full Name"
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              name="fullName"
            />

            <div className="flex space-x-4">
              <InputField
                label="Date of Birth"
                type="date"
                placeholder="Enter your date of birth"
                value={formData.dob}
                onChange={handleChange}
                name="dob"
              />
              <InputField
                label="Phone"
                type="text"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                name="phone"
              />
            </div>

            <div className="flex space-x-4">
              <InputField
                label="Country"
                type="text"
                placeholder="Enter your country"
                value={formData.country}
                onChange={handleChange}
                name="country"
              />
              <InputField
                label="State"
                type="text"
                placeholder="Enter your state"
                value={formData.state}
                onChange={handleChange}
                name="state"
              />
            </div>

            <InputField
              label="City"
              type="text"
              placeholder="Enter your city"
              value={formData.city}
              onChange={handleChange}
              name="city"
            />
            <InputField
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              name="email"
            />
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
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              name="confirmPassword"
            />

            <button
              type="submit"
              className="mt-6 w-full py-4 rounded-lg bg-gray-600 text-white font-semibold tracking-wide hover:bg-gray-700 transition-all duration-300 ease-in-out"
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>

            <p className="mt-6 text-xs text-gray-200 text-center">
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
    </div>
  );
};

export default UserSignup;

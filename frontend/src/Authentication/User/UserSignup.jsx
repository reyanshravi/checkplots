import { useState } from "react";
import InputField from "../../components/InputField"; // Assuming you have this in your components
import signin_bg from "../../assets/Signup/bg-signin.jpg";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

    setError("");
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
        throw new Error(
          result.message || "Something went wrong. Please try again."
        );
      }

      alert("Signup successful! Please check your email for verification.");
      navigate("/user/signin", 2);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="h-screen bg-cover bg-center flex items-center justify-start"
      style={{ backgroundImage: `url(${signin_bg})` }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>

      <div className=" flex w-full max-w-6xl mx-auto sm:flex-row flex-col-reverse items-center justify-between px-4 py-12 bg-opacity-40 bg-black rounded-lg backdrop-blur-lg shadow-xl">
        {/* Left Side: Join Us Message */}
        <div className="hidden sm:block sm:w-1/2 p-6 text-white">
          <h2 className="text-3xl font-extrabold mb-4">
            Join the Checkplot Community
          </h2>
          <p className="mb-4 text-lg opacity-80">
            Be a part of the next generation of analytics. Checkplot is here to
            help you unlock the full potential of your business.
          </p>
          <ul className="space-y-2 opacity-75">
            <li className="flex items-center">
              <span className="mr-2 text-green-500">✔</span> Easy sign-up
              process
            </li>
            <li className="flex items-center">
              <span className="mr-2 text-green-500">✔</span> Access to exclusive
              tools and insights
            </li>
            <li className="flex items-center">
              <span className="mr-2 text-green-500">✔</span> Real-time data
              analytics for growth
            </li>
          </ul>
        </div>

        {/* Right Side: Sign Up Form */}
        <div className="sm:w-1/2 w-full p-6 sm:p-8 text-center text-white rounded-lg shadow-md backdrop-blur-sm bg-opacity-40">
          <h1 className="text-2xl font-semibold mb-4 uppercase">Sign Up</h1>

          <form onSubmit={handleSubmit} className="space-y-4 ">
            {/* Error Message */}
            {error && (
              <div className=" text-red-600   rounded-lg  text-sm">{error}</div>
            )}
            <div className="flex space-x-4">
              {/* Full Name Input */}
              <InputField
                label="Full Name"
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                name="fullName"
              />

              {/* Date of Birth and Phone Number Inputs */}
              <InputField
                label="Date of Birth"
                type="date"
                placeholder="Enter your date of birth"
                value={formData.dob}
                onChange={handleChange}
                name="dob"
              />
            </div>

            <div className="flex space-x-4 ">
              <InputField
                label="Phone"
                type="text"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                name="phone"
              />
              {/* Email Input */}
              <InputField
                label="Email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                name="email"
              />
            </div>

            {/* Country and State Inputs */}
            <InputField
              label="Country"
              type="text"
              placeholder="Enter your country"
              value={formData.country}
              onChange={handleChange}
              name="country"
            />

            <div className="flex space-x-4">
              <InputField
                label="State"
                type="text"
                placeholder="Enter your state"
                value={formData.state}
                onChange={handleChange}
                name="state"
              />

              {/* City Input */}
              <InputField
                label="City"
                type="text"
                placeholder="Enter your city"
                value={formData.city}
                onChange={handleChange}
                name="city"
              />
            </div>

            <div className="flex space-x-4">
              {/* Password Input */}
              <InputField
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                name="password"
              />
              {/* Confirm Password Input */}
              <InputField
                label="Confirm Password"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                name="confirmPassword"
              />
            </div>

            <button
              type="submit"
              className="mt-6 w-full py-3 rounded-lg bg-indigo-600 text-white font-semibold tracking-wide hover:bg-indigo-700 transition-all duration-300 ease-in-out"
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

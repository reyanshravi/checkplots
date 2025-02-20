import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import signin_bg from "../../assets/Signin/bg_user.jpg";
import InputField from "../../components/InputField";

const UserSignin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setLoading(true);

    const formData = { email, password };

    try {
      const response = await axios.post(
        "http://localhost:7002/api/auth/signin",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.token && response.data.user) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        alert("Sign-in successful!");
        navigate("/"); // Redirect to home
      } else {
        setError("Sign-in failed. Please try again.");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center"
      style={{
        backgroundImage: `url(${signin_bg})`,
      }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>

      <div className="flex w-full max-w-6xl mx-auto sm:flex-row flex-col-reverse items-center justify-between px-8 py-16 bg-opacity-40 bg-black rounded-xl backdrop-blur-lg shadow-2xl">
        {/* Left Side: Welcome Message */}
        <div className="hidden sm:block sm:w-1/2 p-8 text-white">
          <h2 className="text-4xl font-extrabold mb-4">Welcome to Checkplot</h2>
          <p className="mb-6 text-lg opacity-80">
            Checkplot is your trusted platform for advanced analytics, visual
            representation, and powerful tools for your business growth.
          </p>
          <ul className="space-y-3 opacity-75">
            <li className="flex items-center">
              <span className="mr-2 text-green-500">✔</span> Track and visualize
              key metrics.
            </li>
            <li className="flex items-center">
              <span className="mr-2 text-green-500">✔</span> Powerful and easy
              to use.
            </li>
            <li className="flex items-center">
              <span className="mr-2 text-green-500">✔</span> Access insights and
              analytics in real-time.
            </li>
          </ul>
        </div>

        {/* Right Side: Sign In Form */}
        <div className="sm:w-1/2 w-full p-8 sm:p-10 text-center text-white rounded-lg shadow-lg backdrop-blur-md bg-opacity-40">
          <h1 className="text-3xl font-semibold mb-6 uppercase">Login</h1>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-6 max-h-[70vh] overflow-y-auto"
          >
            {/* Email Input Field */}
            <InputField
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {/* Password Input Field */}
            <InputField
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="flex justify-between items-center">
              <button
                type="submit"
                disabled={loading}
                className="py-3 px-6 rounded-md bg-indigo-600 text-white font-semibold tracking-wide hover:bg-indigo-700 transition-all duration-300 ease-in-out"
              >
                {loading ? (
                  <span className="flex justify-center items-center">
                    Signing In...
                    <div className="ml-2 animate-spin">🔄</div>
                  </span>
                ) : (
                  "Sign In"
                )}
              </button>
              <div>
                <span className="text-sm text-indigo-200">
                  Forgot password ?
                </span>
              </div>
            </div>

            <Link to="/user/signUp">
              <h3 className="text-indigo-600 text-lg font-medium hover:text-indigo-800 transition duration-200 ease-in-out">
                Create an account
              </h3>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserSignin;

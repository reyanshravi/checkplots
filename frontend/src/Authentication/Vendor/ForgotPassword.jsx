import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import HomeButton from "../../components/HomeButton";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    // Basic Email format validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true); // Set loading state to true
      setError(""); // Reset previous error message

      const response = await axios.post(
        "http://localhost:7002/api/vendor/forgot-password", // Adjust the endpoint if needed
        { email }
      );

      // Check if the response indicates success
      if (response.data.message) {
        setSuccessMessage(response.data.message);
        setError(""); // Clear any previous error
      } else {
        setSuccessMessage(""); // Clear success message in case of error
        setError("Unable to send reset link. Please try again.");
      }
    } catch (err) {
      console.error(
        "Forgot password failed:",
        err.response?.data || err.message
      );
      setError(
        err.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <>
      <section className="bg-white relative">
        <HomeButton />
        <div className="lg:grid lg:h-[calc(100vh)] lg:grid-cols-12">
          <section className="relative flex h-64 items-end bg-gray-900 lg:col-span-5 lg:h-screen xl:col-span-6">
            <img
              alt="Background Image"
              src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              className="absolute inset-0 h-full w-full object-cover opacity-80"
            />
            <div className="hidden lg:relative lg:block lg:p-12">
              <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                Forgot your password?
              </h2>
              <p className="mt-4 leading-relaxed text-white/90">
                Enter your email address, and we'll send you a link to reset
                your password.
              </p>
            </div>
          </section>

          <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="max-w-xl lg:max-w-3xl w-full">
              {/* Error Message */}
              {error && (
                <div className="bg-red-100 text-red-600 p-4 rounded-lg mb-4 text-sm">
                  {error}
                </div>
              )}
              {/* Success Message */}
              {successMessage && (
                <div className="bg-green-100 text-green-600 p-4 rounded-lg mb-4 text-sm">
                  {successMessage}
                </div>
              )}

              <h2 className="text-2xl font-bold text-center mb-6">Forgot Password</h2>
              <form onSubmit={handleForgotPassword}>
                {/* Email Input */}
                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Enter your email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Forgot Password Button */}
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex justify-center items-center">
                      <div className="spinner-border animate-spin border-2 border-t-2 border-white rounded-full h-6 w-6 mr-2"></div>
                      Sending request...
                    </div>
                  ) : (
                    "Send Reset Link"
                  )}
                </button>
              </form>

              {/* Link to login */}
              <div className="text-center mt-6">
                <Link to="/vendor/signin" className="text-sm text-blue-400 hover:underline">
                  Back to Login
                </Link>
              </div>
            </div>
          </main>
        </div>
      </section>
    </>
  );
};

export default ForgotPassword;

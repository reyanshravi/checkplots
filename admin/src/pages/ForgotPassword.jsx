import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      setLoading(true); // Set loading state to true

      const response = await axios.post(
        "http://localhost:7002/api/head/forgot-password", // Adjust the endpoint if needed
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
    <div className="flex items-center justify-center h-screen bg-gray-800 text-white">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Forgot Password</h2>
        <form onSubmit={handleForgotPassword}>
          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Enter your email address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Forgot Password Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
          >
            {loading ? "Sending request..." : "Send Reset Link"}
          </button>
        </form>

        {/* Success or Error Messages */}
        {successMessage && (
          <div className="text-green-500 text-sm mt-4 text-center">
            {successMessage}
          </div>
        )}
        {error && (
          <div className="text-red-500 text-sm mt-4 text-center">{error}</div>
        )}

        {/* Link to login */}
        <div className="text-center mt-4">
          <a href="/" className="text-sm text-blue-400 hover:underline">
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

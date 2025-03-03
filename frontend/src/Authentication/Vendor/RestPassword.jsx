import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import HomeButton from "../../components/HomeButton";

// A reusable component for displaying messages
const Message = ({ type, message }) => {
  return (
    <div
      className={`p-4 rounded-lg mb-4 text-sm ${
        type === "error"
          ? "bg-red-100 text-red-600"
          : type === "success"
          ? "bg-green-100 text-green-600"
          : ""
      }`}
    >
      {message}
    </div>
  );
};

// Password strength check function
const checkPasswordStrength = (password) => {
  const strongPasswordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  const weakPasswordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  if (strongPasswordPattern.test(password)) {
    return "Strong";
  } else if (weakPasswordPattern.test(password)) {
    return "Medium";
  } else {
    return "Weak";
  }
};

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams(); // Extract token from URL
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  useEffect(() => {
    if (!token) {
      setError("Invalid or expired reset link.");
    }
  }, [token]);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!token) {
      setError("Invalid reset link.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `http://localhost:7002/api/vendor/reset-password/${token}`,
        { newPassword }
      );

      if (response.data.message) {
        setSuccessMessage(response.data.message);
        setError("");
        setTimeout(() => navigate("/"), 3000); // Navigate after success
      } else {
        setSuccessMessage("");
        setError("Unable to reset password. Please try again.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
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
              {/* Error or Success Message */}
              {error && <Message type="error" message={error} />}
              {successMessage && <Message type="success" message={successMessage} />}

              <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>
              <form onSubmit={handleResetPassword}>
                <div className="mb-4">
                  <label htmlFor="newPassword" className="block text-sm font-medium mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      setPasswordStrength(checkPasswordStrength(e.target.value));
                    }}
                    className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                  <p className={`text-sm mt-2 ${passwordStrength === "Weak" ? "text-red-500" : passwordStrength === "Medium" ? "text-yellow-500" : "text-green-500"}`}>
                    Password Strength: {passwordStrength}
                  </p>
                </div>

                <div className="mb-4">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                  disabled={loading}
                >
                  {loading ? "Resetting..." : "Reset Password"}
                </button>
              </form>

              <div className="text-center mt-4">
                <a href="/" className="text-sm text-blue-400 hover:underline">
                  Back to Login
                </a>
              </div>
            </div>
          </main>
        </div>
      </section>
    </>
  );
};

export default ResetPassword;

import { useState } from "react";
import InputField from "../../components/InputField";
import signin_bg from "../../assets/Signin/bg_user.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
      const response = await axios.post("http://localhost:7002/api/auth/signin", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.token && response.data.user) {
        // Save user data to localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        alert("Sign-in successful!");
        navigate("/"); // Redirect to home
      } else {
        setError("Sign-in failed. Please try again.");
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex justify-center items-center"
      style={{
        backgroundImage: `url(${signin_bg})`,
      }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

      <div className="bg-gray-800 backdrop-blur-sm border sm:p-8 rounded-lg shadow-xl w-full sm:max-w-lg overflow-hidden max-h-[90vh] ml-20">
        <div className="text-center text-white">
          <h1 className="text-3xl font-bold mb-4">Sign in to CheckPlots</h1>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto">
           

            <hr className="w-full" />

            <div className="my-8 text-center">
              <div className="leading-none px-2 inline-block text-sm text-gray-400 tracking-wide font-medium transform translate-y-1/2">
                Or sign in with e-mail
              </div>
            </div>

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

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full py-4 rounded-lg bg-indigo-600 text-white font-semibold tracking-wide hover:bg-indigo-700 transition-all duration-300 ease-in-out"
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserSignin;

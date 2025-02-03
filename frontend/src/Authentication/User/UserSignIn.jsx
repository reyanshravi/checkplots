import { useState } from "react";
import InputField from "../../components/InputField";
import signin_bg from "../../assets/Signin/bg_user.jpg"

const UserSignin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

    setError(""); // Clear previous errors
    setLoading(true);

    const formData = { email, password };

    try {
      const response = await fetch("http://localhost:7002/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Sign-in failed.");
        }
        alert("Sign-in successful!");
      } else {
        throw new Error("Unexpected response format. The server did not return JSON.");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex justify-center items-center"
      style={{
        backgroundImage:`url(${signin_bg})`
      }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

      <div className="bg-gray-transparent backdrop-blur-sm border sm:p-8 rounded-lg shadow-xl w-full sm:max-w-lg overflow-hidden max-h-[90vh] ml-20">
        <div className="text-center text-white">
          <h1 className="text-3xl font-bold mb-4">Sign in to CheckPlots</h1>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto">
            {/* Google Sign-In Button */}
            <button className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center mb-6">
              <svg className="w-4" viewBox="0 0 533.5 544.3">
                {/* Google Icon SVG path here */}
              </svg>
              <span className="ml-4">Sign In with Google</span>
            </button>

            <hr className="w-full" />

            <div className="my-8 border-b text-center">
              <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
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

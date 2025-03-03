import React, { useState } from "react";
import { FaChevronRight, FaTrashAlt, FaMoon, FaSun } from "react-icons/fa";
import ResetPassword from "./ResetPassword";

export default function SettingsTab() {
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("English");

  const handleOtpSubmit = () => {
    if (otp === "1234") {
      setMessage("Password reset successful!");
    } else {
      setMessage("Invalid OTP. Please try again.");
    }
  };

  const goToPasswordReset = () => {
    setIsPasswordReset(true);
  };

  const cancelPasswordReset = () => {
    setIsPasswordReset(false);
  };

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
    document.body.classList.toggle("dark", e.target.value === "dark");
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const renderPasswordResetContent = () => {
    return (
      <div className="flex justify-center ">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            Password Reset
          </h2>
          <p className="text-sm text-center text-gray-400 mb-4">
            We have sent a code to your email. Please enter the code below:
          </p>

          <div className="flex justify-between gap-4 mb-6">
            {[...Array(4)].map((_, index) => (
              <input
                key={index}
                className="w-16 h-16 px-5 text-center text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                maxLength="1"
                value={otp[index] || ""}
                onChange={(e) => {
                  const updatedOtp = otp.split("");
                  updatedOtp[index] = e.target.value;
                  setOtp(updatedOtp.join(""));
                }}
              />
            ))}
          </div>

          {message && (
            <p
              className={`text-center text-sm mb-4 ${
                message.includes("successful") ? "text-green-500" : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}

          <div className="space-y-4">
            <button
              onClick={handleOtpSubmit}
              className="w-full py-2 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-500 transition-all"
            >
              Verify Account
            </button>

            <div className="text-center text-sm text-gray-500">
              <span>Didn't receive the code?</span>
              <a href="#" className="text-blue-600">Resend</a>
            </div>

            <button
              onClick={cancelPasswordReset}
              className="w-full py-2 border rounded-lg text-gray-700 border-gray-300 text-lg hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderSettingsContent = () => {
    return (
      <div className=" space-y-6  h-full overflow-y-auto">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Vendor Settings</h2>

        {/* Notification Settings */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Notification Settings</h3>
          <div className="mt-4 flex items-center">
            <input type="checkbox" className="mr-3" />
            <label className="text-sm text-gray-600">Email Notifications</label>
          </div>
          <div className="mt-4 flex items-center">
            <input type="checkbox" className="mr-3" />
            <label className="text-sm text-gray-600">SMS Alerts</label>
          </div>
        </div>

        {/* Theme Settings */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Theme Settings</h3>
          <div className="mt-4">
            <label className="text-sm text-gray-600">Select Theme</label>
            <div className="flex mt-2">
              <button
                value="light"
                onClick={handleThemeChange}
                className={`py-2 px-4 mr-4 rounded-lg ${theme === "light" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`}
              >
                <FaSun className="mr-2 inline" />
                Light
              </button>
              <button
                value="dark"
                onClick={handleThemeChange}
                className={`py-2 px-4 rounded-lg ${theme === "dark" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`}
              >
                <FaMoon className="mr-2 inline" />
                Dark
              </button>
            </div>
          </div>
        </div>

        {/* Language Settings */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Language Settings</h3>
          <div className="mt-4">
            <label className="text-sm text-gray-600">Select Language</label>
            <select
              value={language}
              onChange={handleLanguageChange}
              className="w-full mt-2 p-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
            </select>
          </div>
        </div>

        {/* Privacy Settings */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Privacy Settings</h3>
          <div className="mt-4 flex items-center">
            <input type="checkbox" className="mr-3" />
            <label className="text-sm text-gray-600">Make Profile Public</label>
          </div>
          <div className="mt-4 flex items-center">
            <input type="checkbox" className="mr-3" />
            <label className="text-sm text-gray-600">Share Data with Partners</label>
          </div>
        </div>

        {/* Backup and Restore */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Backup and Restore</h3>
          <div className="mt-4">
            <button className="w-full py-2 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-500 transition-all">
              Backup Settings
            </button>
          </div>
          <div className="mt-4">
            <button className="w-full py-2 border text-lg text-gray-700 border-gray-300 rounded-lg hover:bg-gray-50 transition-all">
              Restore Settings
            </button>
          </div>
        </div>

        {/* Account Deletion */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Account Deletion</h3>
          <div className="mt-4">
            <button className="w-full py-2 bg-red-600 text-white text-lg rounded-lg hover:bg-red-500 transition-all">
              <FaTrashAlt className="mr-2 inline" />
              Delete Account
            </button>
          </div>
        </div>

        {/* Reset Password Section */}
        <div
          onClick={goToPasswordReset}
          className="bg-blue-600 text-white py-2 rounded-lg text-center cursor-pointer hover:bg-blue-500 transition-all"
        >
          <h3 className="text-lg font-semibold">Reset Password</h3>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 p-6">
      {isPasswordReset ? <ResetPassword/> : renderSettingsContent()}
    </div>
  );
}

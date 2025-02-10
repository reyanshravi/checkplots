import React, { useState } from "react";
import { IoIosSave } from "react-icons/io";
import { FaRegBell, FaLock, FaUserShield } from "react-icons/fa";

const SettingsTab = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    inApp: true,
  });

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
  });

  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [showSaveMessage, setShowSaveMessage] = useState(false);

  const handleSaveSettings = () => {
    setShowSaveMessage(true);
    setTimeout(() => setShowSaveMessage(false), 3000); // Hide the success message after 3 seconds
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotifications((prev) => ({ ...prev, [name]: checked }));
  };

  const handlePrivacyChange = (e) => {
    const { name, checked } = e.target;
    setPrivacy((prev) => ({ ...prev, [name]: checked }));
  };

  const handle2FAChange = () => {
    setIs2FAEnabled((prev) => !prev);
  };

  return (
    <div className=" bg-gray-50  p-6 rounded-lg shadow-lg  mx-auto w-full h-full overflow-y-auto ">
      <h2 className="text-3xl font-semibold text-gray-900 mb-6">
        Account Settings
      </h2>

      {showSaveMessage && (
        <div className="bg-green-100 text-green-700 p-3 rounded-md mb-6 text-sm">
          <p>Settings updated successfully!</p>
        </div>
      )}

      {/* Notification Settings */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
          <FaRegBell />
          <span>Notification Preferences</span>
        </h3>
        {Object.entries(notifications).map(([key, value]) => (
          <div
            key={key}
            className="flex items-center justify-between mb-4 text-sm"
          >
            <label className="text-gray-700 capitalize">
              {key.replace(/([A-Z])/g, " $1")}
            </label>
            <input
              type="checkbox"
              name={key}
              checked={value}
              onChange={handleNotificationChange}
              className="rounded-lg h-4 w-4 border-gray-300"
            />
          </div>
        ))}
      </div>

      {/* Privacy Settings */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
          <FaUserShield />
          <span>Privacy Settings</span>
        </h3>
        <div className="flex items-center justify-between mb-4 text-sm">
          <label className="text-gray-700">Profile Visibility</label>
          <input
            type="checkbox"
            name="profileVisible"
            checked={privacy.profileVisible}
            onChange={handlePrivacyChange}
            className="rounded-lg h-4 w-4 border-gray-300"
          />
        </div>
      </div>

      {/* Security Settings */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
          <FaLock />
          <span>Security Settings</span>
        </h3>
        <div className="flex items-center justify-between mb-4 text-sm">
          <label className="text-gray-700">Enable 2FA</label>
          <input
            type="checkbox"
            checked={is2FAEnabled}
            onChange={handle2FAChange}
            className="rounded-lg h-4 w-4 border-gray-300"
          />
        </div>
        {is2FAEnabled && (
          <div className="text-sm text-gray-600 mt-2">
            <p>
              2FA is enabled for extra security. Please set up your
              authentication method.
            </p>
          </div>
        )}
      </div>

      {/* Referral Program */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
          <FaRegBell />
          <span>Referral Program</span>
        </h3>
        <div className="text-sm text-gray-600">
          <p>
            Invite your friends and earn rewards! Use the referral link below:
          </p>
          <input
            type="text"
            value="https://example.com/referral-code"
            readOnly
            className="w-full p-2 mt-2 border border-gray-300 rounded-md text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
        </div>
      </div>

      {/* Save Settings Button */}
      {/* <button
        onClick={handleSaveSettings}
        className="bg-gray-600 text-white px-5 py-2 rounded-md flex items-center justify-center space-x-2 hover:bg-gray-700 transition duration-200 text-sm"
      >
        <IoIosSave className="text-lg" />
        <span>Save Changes</span>
      </button> */}
    </div>
  );
};

export default SettingsTab;

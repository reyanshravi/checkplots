import React, { useState } from "react";
import { FiUser } from "react-icons/fi";
import { IoSaveOutline, IoPencilSharp } from "react-icons/io5";

const ProfileTab = () => {
  const dummyUser = {
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "1234567890",
    dob: "1990-05-14",
    country: "United States",
    state: "California",
    city: "Los Angeles",
    profilePicture: null, // New property to handle profile picture
    lastUpdated: "2025-02-09", // Timestamp for last update
  };

  const [user, setUser] = useState(dummyUser);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...dummyUser });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [imageError, setImageError] = useState(null);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setError(""); // Clear error when toggling edit mode
  };

  const handleSave = () => {
    if (validateForm()) {
      setIsSaving(true);
      setTimeout(() => {
        setUser({ ...editedUser, lastUpdated: new Date().toLocaleDateString() });
        setIsSaving(false);
        setIsEditing(false);
        console.log("Saved data:", editedUser);
      }, 1000); // Simulate a save delay
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        setImageError("Only JPEG and PNG images are allowed.");
        return;
      }
      setImageError(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Preview image
        setEditedUser((prevUser) => ({
          ...prevUser,
          profilePicture: reader.result, // Update profile picture data
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setImagePreview(null);
    setEditedUser((prevUser) => ({
      ...prevUser,
      profilePicture: null,
    }));
  };

  const validateForm = () => {
    // Simple validation: Ensure that all fields are filled
    for (const field in editedUser) {
      if (field !== "profilePicture" && field !== "lastUpdated" && !editedUser[field]) {
        setError("Please fill in all fields.");
        return false;
      }
    }
    return true;
  };

  return (
    <div className="bg-gray-50 h-full p-6 rounded-lg shadow-lg w-full mx-auto flex flex-col ">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Profile</h2>

      {/* Profile Picture */}
      <div className="flex justify-center mb-6">
        <div className="relative w-24 h-24 bg-gray-200 flex items-center justify-center rounded-full border-4 border-gray-600 overflow-hidden">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Profile"
              className="object-cover w-full h-full"
            />
          ) : user.profilePicture ? (
            <img
              src={user.profilePicture}
              alt="Profile"
              className="object-cover w-full h-full"
            />
          ) : (
            <FiUser className="text-4xl text-gray-600" />
          )}
          {isEditing && (
            <label className="absolute bottom-2 right-2 bg-gray-600 text-white p-1 rounded-full cursor-pointer hover:bg-gray-700 transition duration-200">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <FiUser className="text-lg" />
            </label>
          )}
          {isEditing && imagePreview && (
            <button
              onClick={handleImageRemove}
              className="absolute top-1 right-1 text-white text-xs bg-red-600 p-1 rounded-full"
            >
              Remove
            </button>
          )}
        </div>
      </div>
      
      {/* Image error message */}
      {imageError && <p className="text-red-500 text-sm mb-4">{imageError}</p>}

      {/* Error message */}
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {/* Scrollable Form Container */}
      <div className="flex-grow overflow-y-auto h-[300px]">
        <div className="space-y-4">
          {[ 
            { label: "Full Name", name: "fullName", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Phone", name: "phone", type: "tel" },
            { label: "Date of Birth", name: "dob", type: "date" },
            { label: "Country", name: "country", type: "text" },
            { label: "State", name: "state", type: "text" },
            { label: "City", name: "city", type: "text" },
          ].map(({ label, name, type }) => (
            <div key={name} className="flex items-center justify-between">
              <label
                htmlFor={name}
                className="text-sm font-medium text-gray-600 w-1/3"
              >
                {label}:
              </label>
              {isEditing ? (
                <input
                  id={name}
                  name={name}
                  type={type}
                  value={editedUser[name]}
                  onChange={handleInputChange}
                  className="w-2/3 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none text-sm"
                />
              ) : (
                <p className="text-gray-700 w-2/3 text-sm">{user[name]}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Last updated */}
      <div className="text-sm text-gray-500 mt-2">
        Last updated: {user.lastUpdated}
      </div>

      {/* Edit/Save Button */}
      <div className="flex justify-between items-center mt-6 w-full">
        {!isEditing && (
          <button
            onClick={handleEditToggle}
            className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition duration-200 text-sm flex items-center space-x-2"
          >
            <IoPencilSharp className="text-lg" />
            <span>Edit</span>
          </button>
        )}

        {isEditing && (
          <>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition duration-200 text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`bg-gray-600 text-white px-4 py-2 rounded-md flex items-center space-x-2 ${
                isSaving ? "cursor-not-allowed opacity-50" : "hover:bg-green-700"
              } transition duration-200 text-sm`}
            >
              {isSaving ? (
                <span>Saving...</span>
              ) : (
                <>
                  <IoSaveOutline className="text-lg" />
                  <span>Save</span>
                </>
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileTab;

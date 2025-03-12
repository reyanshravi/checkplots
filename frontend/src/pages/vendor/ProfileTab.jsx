import React, { useEffect, useState } from "react";
import userImage from "../../assets/user.png"; // Default image

// Reusable input component
const EditableField = ({
  label,
  value,
  name,
  isEditing,
  handleInputChange,
  type = "text",
}) => {
  return (
    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
      <dt className="font-medium text-gray-900">{label}</dt>
      <dd className="text-gray-700 sm:col-span-2">
        {isEditing ? (
          <input
            type={type}
            name={name}
            value={value}
            onChange={handleInputChange}
            className="w-full text-gray-700 p-2 rounded-md border border-gray-300"
          />
        ) : (
          value
        )}
      </dd>
    </div>
  );
};

// Reusable Profile Header Component
const ProfileHeader = ({ imageUrl, fullName, businessName }) => {
  return (
    <div className="flex items-center justify-between bg-gradient-to-r from-teal-600 to-indigo-600 h-70 p-8 rounded-3xl shadow-3xl w-full transform transition-all hover:scale-102 mb-4">
      {/* Left Section with Profile Image */}
      <div className="w-36 h-36 bg-white rounded-full overflow-hidden border-8 border-gradient-to-r from-teal-500 to-indigo-500 flex items-center justify-center shadow-2xl transition-all transform hover:scale-105">
        <img
          src={imageUrl}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Section with Name and Business */}
      <div className="ml-8 text-white">
        <h2 className="text-5xl font-extrabold tracking-tight mb-2 leading-tight hover:text-teal-200 transition-all">
          {fullName}
        </h2>
        <p className="text-2xl font-medium opacity-90 hover:text-teal-300 transition-all">
          {businessName}
        </p>
      </div>
    </div>
  );
};

const ProfileTab = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [vendorData, setVendorData] = useState({
    fullName: "",
    businessName: "",
    email: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
    businessType: "",
    profileImageUrl: userImage,
    documents: {
      businessLicense: "",
      taxId: "",
      otherDocs: [],
    },
  });

  const token = localStorage.getItem("token"); // Assuming token is saved in localStorage

  // Fetch vendor profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          "http://localhost:7002/api/vendor/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add token to request headers
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch vendor profile");
        }

        const data = await response.json();
        if (data.vendor) {
          setVendorData(data.vendor); // Store the vendor data in state
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfile();
  }, [token]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsEditing(false);
    console.log("Saving data:", vendorData);

    // Update the vendor profile
    try {
      const response = await fetch(
        "http://localhost:7002/api/vendor/profile/update",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add token to request headers
          },
          body: JSON.stringify(vendorData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update vendor profile");
      }

      const updatedData = await response.json();
      setVendorData(updatedData.vendor);
      console.log("Profile updated:", updatedData);
    } catch (error) {
      console.error("Error saving profile data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Handle nested address object changes
    if (name.includes("address.")) {
      const addressKey = name.split(".")[1];
      setVendorData((prevState) => ({
        ...prevState,
        address: {
          ...prevState.address,
          [addressKey]: value,
        },
      }));
    } else {
      setVendorData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  return (
    <div className="p-6 h-full flex flex-col bg-gray-50">
      {/* Profile Header */}
      <ProfileHeader
        imageUrl={vendorData.profileImageUrl}
        fullName={vendorData.fullName}
        businessName={vendorData.businessName}
      />

      {/* Profile Content Section (Scrollable) */}
      <div className="overflow-y-auto flex-1 ml-4">
        <div className="flow-root">
          <dl className="space-y-6 text-sm">
            {/* Editable fields */}
            <EditableField
              label="Business Name"
              value={vendorData.businessName}
              name="businessName"
              isEditing={isEditing}
              handleInputChange={handleInputChange}
            />
            <EditableField
              label="Business Type"
              value={vendorData.businessType}
              name="businessType"
              isEditing={isEditing}
              handleInputChange={handleInputChange}
            />
            <EditableField
              label="Email"
              value={vendorData.email}
              name="email"
              type="email"
              isEditing={isEditing}
              handleInputChange={handleInputChange}
            />
            <EditableField
              label="Phone"
              value={vendorData.phone}
              name="phone"
              type="tel"
              isEditing={isEditing}
              handleInputChange={handleInputChange}
            />
            <EditableField
              label="Address"
              value={`${vendorData.address.street}, ${vendorData.address.city}, ${vendorData.address.state} ${vendorData.address.zipCode}, ${vendorData.address.country}`}
              name="address"
              isEditing={isEditing}
              handleInputChange={handleInputChange}
            />

            {/* Documents Section */}
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Business License</dt>
                <dd className="text-gray-700 sm:col-span-2">
                  <a
                    href={vendorData.documents.businessLicense}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-600 hover:text-teal-700 hover:underline"
                  >
                    View Document
                  </a>
                </dd>
              </div>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Tax ID</dt>
                <dd className="text-gray-700 sm:col-span-2">
                  <a
                    href={vendorData.documents.taxId}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-600 hover:text-teal-700 hover:underline"
                  >
                    View Document
                  </a>
                </dd>
              </div>

              {/* Additional Documents */}
              {vendorData.documents.otherDocs.map((doc, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-4"
                >
                  <dt className="font-medium text-gray-900">
                    Other Document {index + 1}
                  </dt>
                  <dd className="text-gray-700 sm:col-span-2">
                    <a
                      href={doc}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-600 hover:text-teal-700 hover:underline"
                    >
                      View Document
                    </a>
                  </dd>
                </div>
              ))}
            </div>
          </dl>
        </div>
      </div>

      {/* Edit and Save buttons */}
      <div className="flex justify-end mt-4 space-x-4 sm:space-x-6">
        {!isEditing ? (
          <button
            onClick={handleEdit}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 text-sm sm:text-base"
          >
            Edit
          </button>
        ) : (
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm sm:text-base"
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileTab;
